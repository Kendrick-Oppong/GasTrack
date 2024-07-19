import { navlinks } from "@/constants/navlinks";
import Link from "next/link";
import { ModeToggle } from "@/components/theme";

const Navbar = () => {
  return (
    <header className="px-5 font-semibold py-4">
      <nav className="flex justify-between items-center">
        <div className="text-2xl font-extrabold">
          <h2>
            Gas<span>Track</span>
          </h2>
        </div>
        <div className="flex items-center list-none gap-4">
          {navlinks.map((link) => (
            <Link href={link.href} key={link.name}>
              <li className="cursor-pointer hover:text-primary">{link.name}</li>
            </Link>
          ))}
          <div>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
