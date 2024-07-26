"use client";

import Link from "next/link";
import { navLinks } from "@/constants/navlinks";
import { usePathname } from "next/navigation";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Menu } from "lucide-react";
import { MobileNavbar } from ".";
import { ModeToggle } from "@/components/theme";

const NavLinks = () => {
  const pathname = usePathname();

  const { isAuthenticated: isLoggedIn } = useKindeBrowserClient();
  return (
    <>
      {navLinks.map((link) =>
        link.name === "Sign In" ? (
          !isLoggedIn && (
            <LoginLink
              key={link.name}
              className={`hidden md:inline-flex ${
                pathname === link.href
                  ? "p-1 px-1.5 text-white bg-primary rounded-sm"
                  : ""
              }`}
            >
              Sign in
            </LoginLink>
          )
        ) : (
          <Link
            href={link.href}
            key={link.name}
            className={`hidden md:inline-flex ${
              pathname === link.href
                ? "p-1 px-1.5 text-white bg-primary rounded-sm"
                : ""
            }`}
          >
            <li
              className={`cursor-pointer hover:text-primary ${
                pathname === link.href ? " hover:!text-white" : ""
              }`}
            >
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
    </>
  );
};

export default NavLinks;
