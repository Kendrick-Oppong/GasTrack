import Link from "next/link";
import { NavLinks, ProfileIcon } from ".";

const Navbar = async () => {

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
       <NavLinks/>

       <div><ProfileIcon/></div>
       </div>
      </nav>
    </header>
  );
};

export default Navbar;
