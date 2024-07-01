import { navlinks } from "@/constants/navlinks";

const Navbar = () => {
  return (
    <header className="px-5 font-semibold py-4">
      <nav className="flex justify-between items-center">
        <div>LOGO</div>
        <div className="flex list-none gap-4">
          {navlinks.map((link) => (
            <li className="" key={link.name}>{link.name}</li>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
