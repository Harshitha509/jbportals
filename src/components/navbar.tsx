"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const pathname = usePathname();
    return(   
    <nav className="h-14">
    <div className="flex w-full h-14 pt-4 justify-between fixed border-b  border-b-slate-300  p-6 ">
    <h1 className="text-xl font-bold ">TASKY</h1>
            <div className=" flex gap-5 ">
            <Link href={"/"} >
          <span
            className={
              pathname === "/" ? "underline underline-offset-4" : "no-underline"
            }
          >
            Home
          </span>
        </Link>
        <Link href={"/features"} >
          <span
            className={
              pathname === "/features"
                ? "underline underline-offset-4"
                : "no-underline"
            }
          >
            Features
          </span>
        </Link>
       
        <Link href={"/about"} >
          <span
            className={
              pathname === "/about"
                ? "underline underline-offset-4"
                : "no-underline"
            }
          >
            About
          </span>
        </Link>
        <Link href={"/dashboard"} >
          <span
            className={
              pathname === "/dashboard"
                ? "underline underline-offset-4"
                : "no-underline"
            }          >
            <AlignJustify />
          </span>
        </Link>
        <div className="w-10 flex rounded-lg"><ModeToggle  /></div>
            </div>
            </div>
            
        </nav>
        
       
    )
}