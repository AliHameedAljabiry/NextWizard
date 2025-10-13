import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./database/drizzle";
import { users } from "./database/schema";
import { eq } from "drizzle-orm";
import { compare } from "bcryptjs";

type ProviderEnv = {
  clientId: string;
  clientSecret: string;
};

const readProviderEnv = (idKey: string, secretKey: string, provider: string): ProviderEnv => {
  // Support both the canonical env var names and the alternative AUTH_* names
  const altIdKey = `AUTH_${idKey}`;
  const altSecretKey = `AUTH_${secretKey}`;

  const clientId = process.env[idKey] ?? process.env[altIdKey];
  const clientSecret = process.env[secretKey] ?? process.env[altSecretKey];

  if (!clientId || !clientSecret) {
    console.warn(
      `[auth] ${provider} provider is disabled. Missing environment variables: ${
        !clientId && !clientSecret
          ? `${idKey}, ${secretKey}`
          : !clientId
          ? idKey
          : secretKey
      }`
    );
    return { clientId: "", clientSecret: "" };
  }

  return { clientId, clientSecret };
};

const google = readProviderEnv("AUTH_GOOGLE_ID", "AUTH_GOOGLE_SECRET", "Google");
const github = readProviderEnv("AUTH_GITHUB_ID", "AUTH_GITHUB_SECRET", "GitHub");


export const authOptions: NextAuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET,

  providers: [
    ...(google.clientId && google.clientSecret
      ? [
          GoogleProvider({
            clientId: google.clientId,
            clientSecret: google.clientSecret
          })
        ]
      : []),
    ...(github.clientId && github.clientSecret
      ? [
          GitHubProvider({
            clientId: github.clientId,
            clientSecret: github.clientSecret
          })
        ]
      : []),

      CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const userRow = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);

        if (userRow.length === 0) return null;

        const user = userRow[0];

        // OAuth-only placeholder password blocking credentials login
        if (!user.password || user.password === "-" || user.password === "OAUTH") {
          return null;
        }

        const isValid = await compare(credentials.password.toString(), user.password);
        if (!isValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
          role: user.role,
          status: user.status,
        } as any;
      },
    }),
  ],

  session: {
    strategy: "jwt"
  },

  pages: {
    signIn: "/"
  },

  callbacks: {
    // When user signs in with OAuth create DB user if missing
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider && account.type === "oauth") {
          const existing = await db
            .select()
            .from(users)
            .where(eq(users.email, user.email as string))
            .limit(1);

          if (existing.length === 0) {
            await db.insert(users).values({
              email: user.email!,
              fullName: user.name || "No Name",
              password: "OAUTH", // marker for OAuth user
              companyName: "Unknown",
              role: "USER",
              status: "PENDING",
              image: (user as any).image || null,
              username: (user as any).username || null,
            });
          }
        }
      } catch (err) {
        console.error("[auth][signIn] error:", err);
        // still allow sign in flow to continue
      }
      return true;
    },

    // populate token with DB values after initial sign in
    async jwt({ token, user }) {
      try {
        if (user && user.email) {
          // prefer DB record to ensure canonical fields (id, role, status, etc.)
          const dbUser = await db
            .select()
            .from(users)
            .where(eq(users.email, user.email as string))
            .limit(1);

          if (dbUser.length > 0) {
            const u = dbUser[0];
            token.id = u.id.toString();
            token.role = u.role;
            token.status = u.status;
            token.name = u.fullName;
            token.email = u.email;
            token.image = u.image;
            token.username = u.username;
          } else {
            // fallback to provider returned user
            token.id = (user as any).id ?? token.sub;
            token.role = (user as any).role ?? token.role;
          }
        }
      } catch (err) {
        console.error("[auth][jwt] error:", err);
      }
      return token;
    },

    // map token -> session for client
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = (token.name as string) ?? session.user.name;
        session.user.email = (token.email as string) ?? session.user.email;
        (session.user as any).role = (token.role as string) ?? (session.user as any).role;
        (session.user as any).status = (token.status as string) ?? (session.user as any).status;
        session.user.image = (token.image as string) ?? session.user.image;
      }
      return session;
    },
  },

  debug: process.env.NODE_ENV === "development",
};

// Initialize NextAuth and re-export handlers + auth helper which conform to v5 API
const nextAuthResult = NextAuth(authOptions);
export const { handlers, auth, signIn, signOut } = nextAuthResult;
export const { GET, POST } = handlers;

// Backwards-compatible alias used elsewhere in the repo
export const getServerAuthSession = auth;



