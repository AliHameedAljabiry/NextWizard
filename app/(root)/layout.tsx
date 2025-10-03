import { ReactNode } from "react";
import Header from "@/components/Header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import Footer from "@/components/Footer";
import { SWRConfig } from "swr";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  // Redirect if no session
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  // Track last activity (non-blocking with `after`)
  after(async () => {
    if (!session?.user?.id) return;

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, session.user.id))
      .limit(1);

    if (!user.length) {
      console.warn("User from session not found in DB");
      return;
    }

    if (user[0].lastActivityDate === new Date().toISOString().slice(0, 10)) return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date().toISOString().slice(0, 10) })
      .where(eq(users.id, session.user.id));
  });

  return (
    <SWRConfig
      value={{
        fallback: {
          // hydrate SWR with the current user so Header won’t flicker
          "/api/auth/authorized-user": {
            id: session.user.id,
            email: session.user.email,
            fullName: session.user.name,
            role: session.user.role,
            status: session.user.status,
            image: session.user.image
          },
        },
      }}
    >
      <main className="root-container">
        <Header />
        <div className="min-h-screen bg-light-300 dark:bg-[#0d1117]">{children}</div>
        <Footer />
      </main>
    </SWRConfig>
  );
};

export default Layout;
