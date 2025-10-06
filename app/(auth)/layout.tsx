import { ReactNode } from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) redirect('/docs')


  return (
    <main className="auth-container">
        <div className="auth-form">
            <div className="flex flex-row items-center justify-center mr-32">
              <Link href="/" className="text-2xl flex flex-row items-center relative ">
                <Image
                      src="icons/nextjs-icon.svg"
                      alt="logo"
                      className="h-auto invert dark:invert-0 "
                      width={50}
                      height={50}
                    />
                <h1 className="font-michroma left-10 z-20 absolute ">extWizard</h1>
            </Link>

            </div>
          <div className="">{children}</div>
        </div> 
    </main>
  );
};

export default AuthLayout;