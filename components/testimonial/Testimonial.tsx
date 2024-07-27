"use client";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import { carouselData } from "@/constants/testimonyData";

export default function TestimonyCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative w-full lg:max-w-[70%] xl:max-w-[50%] mx-auto rounded-lg shadow-2xl border border-primary"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {carouselData.map((data) => (
          <CarouselItem key={data.name} className="px-5 relative pb-20 pt-15">
            <div role="group " className="pl-4 text-left">
              <div className="my-4">
                <Quote
                  strokeWidth={1}
                  className="ml-auto h-10 w-10 text-green"
                />
              </div>
              <div>
                <p className="font-semibold">{data.quote}</p>
              </div>
              <div className="">
                <h3 className="text-primary font-bold my-2">{data.name}</h3>
                <p className="italic font-semibold">{data.position}</p>
              </div>
              <div className="absolute right-3 bottom-2 sm:bottom-10 p-2 rounded-full">
                <Image
                  height={112}
                  width={112}
                  src={data.imageSrc}
                  alt=""
                  priority
                  className="rounded-full w-20 h-20 border border-primary p-1  object-cover"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute w-3 h-3 -bottom-16 left-1/2 right-1.5 top-auto">
        <CarouselPrevious variant="outline" className="border-primary h-10 w-10" />
        <CarouselNext
          variant="outline"
          className="border border-primary h-10 w-10"
        />
      </div>
    </Carousel>
  );
}
