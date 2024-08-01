"use client";
import Link from "next/link";
import { navLinks } from "@/constants/navlinks";
import { usePathname } from "next/navigation";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const MobileNavbar = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const { isAuthenticated: isLoggedIn } = useKindeBrowserClient();

  const handleLinkClick = (e: any, href: string) => {
    if (href.startsWith("/#")) {
      e.preventDefault();
      const sectionId = href.split("#")[1];
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <Sheet>
      <SheetTrigger>{children}</SheetTrigger>
      <SheetContent
        onCloseAutoFocus={(event) => event.preventDefault()}
        className="font-semibold text-left pl-3 z-[10000]"
      >
        <SheetHeader>
          <SheetTitle>
            <div className="text-2xl font-extrabold mb-3">
              <Link href="/">
                <h2 className="text-destructive">
                  Gas<span>Track</span>
                </h2>
              </Link>
            </div>
          </SheetTitle>
          {navLinks.map((link) =>
            link.name === "Sign In" ? (
              !isLoggedIn && (
                <SheetClose asChild key={link.name}>
                  <LoginLink
                    className={`text-left pl-3 ${
                      pathname === link.href
                        ? "p-1 w-fit px-1.5 text-white bg-primary rounded-sm"
                        : ""
                    }`}
                  >
                    Sign in
                  </LoginLink>
                </SheetClose>
              )
            ) : (
              <SheetClose asChild key={link.name}>
                <Link
                  href={link.href}
                  key={link.name}
                  className={`text-left pl-3 ${
                    pathname === link.href
                      ? "p-1 px-1.5 text-white bg-primary rounded-sm"
                      : ""
                  }`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  <li
                    className={`text-left cursor-pointer hover:text-primary ${
                      pathname === link.href ? " hover:!text-white" : ""
                    }`}
                  >
                    {link.name}
                  </li>
                </Link>
              </SheetClose>
            )
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
