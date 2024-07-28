import { navLinks } from "@/constants/navlinks";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-accent pt-36 px-5 pb-6 mt-auto ">
      <div className="grid  sm:grid-cols-3 justify-between">
        <div className="col-span-2">
          <div className="text-2xl font-extrabold">
            <h2 className="text-destructive">
              Gas<span>Track</span>
            </h2>
          </div>
          <p>
            At GasTrack, we simplify your LPG management. <br /> Our convenient
            online platform lets you book refills, track your order status 
          </p>
        </div>
        <div className="mt-8 sm:mt-0">
          <h2 className="text-primary font-semibold">Quick Links</h2>
          {navLinks.map((link) => (
            <Link href={link.href} key={link.name}>
              <li className="cursor-pointer hover:text-primary">{link.name}</li>
            </Link>
          ))}
        </div>
      </div>
      <p className="text-center">
        &copy; All Rights Reserved - {new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
