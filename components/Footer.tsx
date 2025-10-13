import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";


function Footer() {

    // set gmail link
    const emailAddress = "alihameed7121996programmer@gmail.com";
    const subject = encodeURIComponent('Subject Here');
    const body = encodeURIComponent('Body of the email goes hrer.');
    // gamil link format
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${subject}&body=${body}`;

    // set linkedin url
    const linkedinUrl = "https://www.linkedin.com/in/ali-hameed-225706318";

    // set Whatsapp url
    const phoneNumber = "+964 781 172 9815";
    const message = 'Hello! I would like to know more about your services.';
    // remove white spaces from the number
    const formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
    const whatsappLink = `https://wa.me/${formattedPhoneNumber}?text=${message}`;
  // bg-[#ffffff]
    return (
       <footer className=" bg-[#FFFFFF] dark:bg-[#080808] text-black dark:text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className=" grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 ml-10 gap-8  mb-8 ">
            <div>
                <Link href="/" className="text-xl lg:text-2xl flex flex-row items-center relative -ml-5">
                  <Image
                        src="/icons/nextjs-icon.svg"
                        alt="logo"
                        className="h-auto invert dark:invert-0 "
                        width={50}
                        height={50}
                      />
                  <h1 className="font-michroma left-10 z-20 absolute ">extWizard</h1>
                </Link>
                
              <p className="dark:text-slate-400 leading-relaxed mt-3">
                Building the future of development, one innovation at a time.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 dark:text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 dark:text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4 ">
                <Link href={gmailLink} target="_blank" rel="noopener noreferrer">
                    <Image src="/images/gmail.png" alt="gmail" className="gmail" width={30} height={30}/>
                </Link>

                <Link href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                    <Image src="/icons/linkedIn.svg" alt="gmail" className="gmail" width={30} height={30}/>
                </Link>

                <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Image src="/icons/whatsapp.svg" alt="gmail" className="gmail" width={30} height={30}/>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-row gap-5 justify-between items-center flex-wrap">
            <div className=" flex flex-col gap-5 justify-between items-center ">
                <p className="dark:text-slate-400 text-sm">
                © 2025 NextWizard. All rights reserved.
                </p>
                <div className="flex space-x-6 text-sm dark:text-slate-400 mt-4 sm:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
            <ThemeToggle/>
          </div>
        </div>
      </footer>
    )
}

export default Footer


