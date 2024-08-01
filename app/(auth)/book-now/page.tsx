import React from "react";
import Image from "next/image";
import { BookingForm } from "@/components/form";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const BookNowPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login?");
  }

  return (
    <>
      <section className="bg-[url('https://images.pexels.com/photos/261621/pexels-photo-261621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-center bg-cover h-96 w-full">
        <h1 className="flex items-center justify-center w-full h-full text-primary bg-black/80">
          Booking
        </h1>
      </section>
      <header className="text-center my-8 space-y-6">
        <h1>
          Easy <span>Online Booking</span>
        </h1>
        <p className="mb-6 font-semibold px-4">
          Quickly and securely book your LPG refills online. Enjoy reliable
          delivery service at your convenience <br />
          Follow our straightforward steps to place your booking
        </p>
        <div className="px-4">
   <p className="mb-6 font-medium max-w-5xl mx-auto border border-destructive p-3 rounded-lg">
          For a seamless delivery experience, we kindly request access to your
          location. This helps us ensure timely and accurate delivery of your
          LPG refills. If you prefer not to share your location, you can still
          proceed with the booking.
        </p>  
        </div>
     
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 px-5 my-12">
        <div>
          <BookingForm />
        </div>
        <div className="relative order-first md:order-last">
          <Image
            src="/book.svg"
            alt={""}
            width={500}
            height={500}
            priority
            className="w-full h-full"
          />
        </div>
      </section>
    </>
  );
};

export default BookNowPage;
