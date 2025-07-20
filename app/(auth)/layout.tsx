import { ReactNode } from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="auth-container">
        <div className="auth-form">
            <Link href="/" className='text-2xl flex flex-row items-center justify-center'>
              <Image src="icons/nextjs-icon.svg" alt='logo' className='h-auto' width={50} height={50}/>
              <h1 className='-ml-2 font-michroma '>extWizard</h1>
          </Link>
          <div>{children}</div>
        </div> 
    </main>
  );
};

export default Layout;