"use client";
import React, { useState, useEffect } from "react";
import { Film, Search, Sun, Moon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useTheme } from "next-themes";

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = ()=>{

  }
  return (
    <header className="fixed top-0 inset-x-0 z-20 h-[59px] flex items-center justify-center bg-background">
      <div className="flex items-center justify-between w-full max-w-screen-xl px-5 lg:px-0">
        <Link className="flex items-center gap-x-2 text-indigo-700" href="/">
          <Film width={20} height={20} />
          <h4 className="italic font-bold">Movie Z</h4>
        </Link>
        <div className="relative hidden lg:flex items-center gap-x-3">
          <Button className="h-9 " variant="outline">
            <ChevronDown />
            Genre
          </Button>

          <div className="relative text-muted-foreground w-[379px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2"
              width={16}
              height={16}
            />
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
              placeholder="Search..."
              value=""></input>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="sm:hidden"> </div>
          <Button variant="outline" className="h-9 w-9">
            <Moon />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
