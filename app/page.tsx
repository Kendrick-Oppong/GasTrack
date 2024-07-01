import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* hero section */}
      <section className="grid grid-cols-2 px-10  bg-secondary">
        <div className="self-center">
          <h1 className="text-5xl font-bold">Effortless LPG Management</h1>
          <p className="font-semibold text-xl my-8">
            Get convenient and reliable LPG delivery with our online platform
            <br />
            Book refills, track your order, and manage your LPG needs
            effortlessly
          </p>
          <Button size="lg">Book Now</Button>
        </div>
        <div className="relative">
          <Image src="/hero-image.svg" alt={""} width={500} height={500} />
        </div>
      </section>
    </>
  );
}
