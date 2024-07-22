"use client"
import { Menu } from "lucide-react";
import { MobileNavbar } from ".";
import { ModeToggle } from "@/components/theme";
import Link from "next/link";
import { navLinks } from "@/constants/navlinks";
import {usePathname} from "next/navigation"
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {useKindeBrowserClient} from "@kinde-oss/kinde-auth-nextjs";


const Navbar = () => {
  const pathname = usePathname()
  
const {isAuthenticated : isLoggedIn} = useKindeBrowserClient();
console.log(isLoggedIn)
  return (
    <header className="px-5 font-semibold py-4">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-extrabold">
          <Link href="/">
            <h2 className="text-destructive">
              Gas<span>Track</span>
            </h2>
          </Link>
        </div>
        <div className="flex items-center list-none gap-4">
          {navLinks.map((link) =>
           ( link.name === "Sign In" ) ? (
              !isLoggedIn && <LoginLink 
               key={link.name}  
               className={`hidden md:inline-flex ${pathname === link.href ? "p-1 px-1.5 text-white bg-primary rounded-sm" : ""}`}>
                Sign in
              </LoginLink>
            ) : (
              <Link
                href={link.href}
                key={link.name}
                className={`hidden md:inline-flex ${pathname === link.href ? "p-1 px-1.5 text-white bg-primary rounded-sm" : ""}`}
              >
                <li className={`cursor-pointer hover:text-primary ${pathname === link.href ? " hover:!text-white" : ""}`}>
                  {link.name}
                </li>
              </Link>
            )
          )}

          <div>
            <ModeToggle />
          </div>
          <div className="md:hidden cursor-pointer flex flex-col items-center">
            <MobileNavbar>
              <Menu size={25} className="shadow-lg" />
            </MobileNavbar>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
