import React from "react";
import { Film, Mail } from "lucide-react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="w-full bg-indigo-700 py-10 px-5 text-sm text-[#fafafa]">
      <div className="mx-auto flex flex-col justify-between gap-y-7 md:flex-row max-w-screen-xl">
        <div className="space-y-3">
          <Link className="flex items-center gap-x-2" href="/">
            <Film width={20} height={20} />
            <h4 className="italic font-bold">Magixx</h4>
          </Link>
          <p>© 2025 Magixx. All Rights Reserved.</p>
        </div>

        <div className="flex gap-x-12 lg:gap-x-24">
          <div className="space-y-3">
            <h4>Contact Information</h4>
            <div className="space-y-6">
              <div className="flex items-center gap-x-3">
                <Mail width={16} height={16} />
                <div>
                  <h5 className="font-medium">Email</h5>
                  <p>uujuu316@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h4>Follow us</h4>
            <div className="flex flex-col gap-3 lg:flex-row">
              <Link
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                className="font-medium">
                Youtube
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
