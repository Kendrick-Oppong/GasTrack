import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* hero section */}
      <section className="grid grid-cols-2 px-10  bg-secondary ">
        <div className="self-center">
          <h1 className="text-5xl font-bold">
            Effortless <span className="text-primary">LPG Management</span>{" "}
          </h1>
          <p className="font-semibold text-xl my-8">
            Get convenient and reliable LPG delivery with our online platform
            <br />
            Book refills, track your order, and manage your LPG needs
            effortlessly
          </p>
          <Button size="lg">Book Now</Button>
        </div>
        <div className="relative">
          <Image
            src="/hero-image.svg"
            alt={""}
            width={500}
            height={500}
            priority
          />
        </div>
      </section>
      {/* Specialization */}
      <section className="grid grid-cols-4 border border-primary py-8 items-center justify-center text-center rounded-lg divide-x-2 px-10 m-10">
        <div>
          <Image
            src="/delivery-transport-svgrepo-com.svg"
            width={100}
            height={100}
            alt=""
            priority
            className="mx-auto"
          />
          <h1 className="font-semibold mt-2">Fast Delivery</h1>
        </div>
        <div>
          <Image
            src="/quality-svgrepo-com.svg"
            width={100}
            height={100}
            alt=""
            priority
            className="mx-auto"
          />
          <h1 className="font-semibold mt-2">Perfect Quality</h1>
        </div>
        <div>
          <Image
            src="/location-global-svgrepo-com.svg"
            width={100}
            height={100}
            alt=""
            priority
            className="mx-auto"
          />
          <h1 className="font-semibold mt-2">Tracking System</h1>
        </div>
        <div>
          <Image
            src="/customer-service-help-svgrepo-com.svg"
            width={100}
            height={100}
            alt=""
            priority
            className="mx-auto"
          />
          <h1 className="font-semibold mt-2">24 / 7 Support</h1>
        </div>
      </section>

      <section className="grid grid-cols-2 px-10 ">
        <div className="relative">
          <Image
            src="/about_us.svg"
            alt={""}
            width={700}
            height={700}
            priority
          />
        </div>
        <div className="self-center">
          <Badge variant="destructive" className="mb-4">
            About Us
          </Badge>

          <h1 className="text-5xl font-bold">
            Why <span className="text-primary">Choose Us</span>{" "}
          </h1>
         
          <ul className="mt-6 space-y-4">
            <li>
              <span className="font-bold">Effortless Booking:</span> Book your LPG
              refills quickly and easily through our user-friendly online
              platform. No more waiting on hold or inconvenient phone calls.
            </li>
            <li>
              <span className="font-bold">Real-Time Tracking:</span> Track your LPG
              order status in real-time, so you always know when to expect your
              delivery. Stay informed and avoid any unnecessary waiting.
            </li>
            <li>
              <span className="font-bold">Safe and Reliable Delivery:</span> Our
              experienced delivery partners ensure your LPG arrives safely and
              securely at your doorstep. We prioritize safety and compliance
              with all regulations.
            </li>
            <li>
              <span className="font-bold">
                Competitive Prices and Transparency:
              </span>{" "}
              Get transparent pricing with no hidden fees. We offer competitive
              rates to keep your LPG costs manageable.
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
