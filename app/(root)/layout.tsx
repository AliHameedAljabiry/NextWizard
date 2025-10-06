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

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  

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
    
      <main className="root-container">
        <Header session={session?.user ?? null} />
        <div className="min-h-screen bg-light-300 dark:bg-[#0d1117]">{children}</div>
        <Footer />
      </main>
   
  );
};

export default RootLayout;
