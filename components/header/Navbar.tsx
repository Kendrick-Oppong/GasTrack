import { Menu } from "lucide-react";
import {MobileNavbar} from "."
import { ModeToggle } from "@/components/theme";
import Link from "next/link";
import { navLinks } from "@/constants/navLinks";

const Navbar = () => {
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
          {navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.name}
              className="hidden md:inline-flex"
            >
              <li className="cursor-pointer hover:text-primary">{link.name}</li>
            </Link>
          ))}
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
