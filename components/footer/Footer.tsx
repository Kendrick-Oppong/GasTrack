import { navlinks } from "@/constants/navlinks";

const Footer = () => {
  return (
    <footer className="bg-accent mt-36 px-5 py-6">
      <div className="grid sm:grid-cols-2 justify-between">
        <div>
         LOGO
          <p>
            At LOGO, we simplify your LPG management. <br/> Our
            convenient online platform lets you book refills, track your order
            status in real-time, and ensure a safe and reliable LPG delivery
            experience.
          </p>
        </div>
        <div className="mt-8 sm:mt-0 sm:text-center">
          <h2 className="text-primary font-semibold">Quick Links</h2>
          {navlinks.map((link) => (
            <li className="" key={link.name}>
              {link.name}
            </li>
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
