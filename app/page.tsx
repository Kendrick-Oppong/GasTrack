import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { TestimonyCarousel } from "@/components/testimonial";
import { ContactUsForm } from "@/components/form";
import { ButtonLink } from "@/components/button";

export default function Home() {
  return (
    <>
      {/* hero section */}
      <section className="grid md:grid-cols-2 px-10 pt-8 lg:pt-0  bg-secondary ">
        <div className="self-center">
          <h1 className="text-4xl  md:text-5xl font-bold">
            Effortless <span className="text-primary">LPG Management</span>{" "}
          </h1>
          <p className="font-semibold text-xl my-8">
            Get convenient and reliable LPG delivery with our online platform
            <br />
            Book refills, track your order, and manage your LPG needs
            effortlessly
          </p>
          <ButtonLink>Book Now</ButtonLink>
        </div>
        <div className="relative">
          <Image
            src="/hero-image1.svg"
            alt={""}
            width={550}
            height={550}
            priority
            className="w-full h-[550px]"
          />
        </div>
      </section>
      {/* Specialization */}
      <section className="grid grid-cols-1 md:grid-cols-4 border border-primary py-8 items-center justify-center text-center rounded-lg  px-5 md:px-10 m-3 md:m-10 shadow-lg gap-4">
        <div className="border-gray shadow-lg px-3 py-8 rounded-lg">
          <Image
            src="/delivery-transport-svgrepo-com.svg"
            width={100}
            height={100}
            alt=""
            priority
            className="mx-auto"
          />
          <h2 className="font-semibold mt-2">Fast Delivery</h2>
        </div>
        <div className="border-gray shadow-lg px-3 py-8 rounded-lg">
          <Image
            src="/quality-svgrepo-com.svg"
            width={100}
            height={100}
            alt=""
            priority
            className="mx-auto"
          />
          <h2 className="font-semibold mt-2">Perfect Quality</h2>
        </div>
        <div className="border-gray shadow-lg px-3 py-8 rounded-lg">
          <Image
            src="/location-global-svgrepo-com.svg"
            width={100}
            height={100}
            alt=""
            priority
            className="mx-auto"
          />
          <h2 className="font-semibold mt-2">Tracking System</h2>
        </div>
        <div className="border-gray shadow-lg px-3 py-8 rounded-lg">
          <Image
            src="/customer-service-help-svgrepo-com.svg"
            width={100}
            height={100}
            alt=""
            priority
            className="mx-auto"
          />
          <h2 className="font-semibold mt-2">24 / 7 Support</h2>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="grid lg:grid-cols-2 px-10 my-16">
        <div className="relative">
          <Image
            src="/about_us.svg"
            alt={""}
            width={700}
            height={700}
            priority
          />
        </div>
        <div className="mt-8 lg:mt-0 self-center">
          <Badge variant="destructive" className="mb-4">
            About Us
          </Badge>

          <h1 className="text-5xl font-bold">
            Why <span className="text-primary">Choose Us</span>{" "}
          </h1>

          <ul className="mt-6 space-y-4">
            <li>
              <span className="font-bold">Effortless Booking:</span> Book your
              LPG refills quickly and easily through our user-friendly online
              platform. No more waiting on hold or inconvenient phone calls.
            </li>
            <li>
              <span className="font-bold">Real-Time Tracking:</span> Track your
              LPG order status in real-time, so you always know when to expect
              your delivery. Stay informed and avoid any unnecessary waiting.
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
      {/* How it works */}
      <section className="mt-8 px-5 mb-10">
        <h1 className="text-center">
          How It <span>Works</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="flex items-center justify-center p-8 bg-secondary rounded-lg shadow-lg border border-primary">
            <div>
              <Image
                src="/advanced-study-application-svgrepo-com.svg"
                width={100}
                height={100}
                alt=""
                priority
                className="mx-auto"
              />
              <h2 className="font-bold mt-4 text-center">
                Fill Out a Quick Form
              </h2>
              <p className="text-center">
                Enter your delivery address, preferred date and time, and
                cylinder details. It&apos;s fast and convenient.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-8 bg-secondary rounded-lg shadow-lg border border-primary">
            <div>
              <Image
                src="/track-svgrepo-com.svg"
                width={100}
                height={100}
                alt=""
                priority
                className="mx-auto"
              />
              <h2 className="font-bold mt-4 text-center">Track Your Order</h2>
              <p className="text-center">
                Monitor your order status in real-time. See when your LPG is
                being filled, dispatched, and estimated arrival time.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center p-8 bg-secondary rounded-lg shadow-lg border border-primary">
            <div>
              <Image
                src="/delivery-man-svgrepo-com.svg"
                width={100}
                height={100}
                alt=""
                priority
                className="mx-auto"
              />
              <h2 className="font-bold mt-4 text-center">Receive Your LPG</h2>
              <p className="text-center">
                Relax and receive your LPG refill at your doorstep. Our
                experienced delivery partners ensure a safe and smooth process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 px-5 mb-10">
        <h1 className="text-center mb-8">Testimonial</h1>
        <TestimonyCarousel />
      </section>
     {/* contact us */}
      <section id="contact-us" className="mt-[8rem]">
        <h1 className="text-center">Got Any <span> Questions?</span></h1>
        <p className="my-4 text-center">
          Use this form below to get in touch with our team
        </p>
        <ContactUsForm />
      </section>
    </>
  );
}
