import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { CircleAlert } from "lucide-react";
import { getUserBooking } from "@/lib/user/getUserBooking";
import { BookingTracking } from "@/components/admin";

const BookingStatus = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login?");
  }
  const userBookings = await getUserBooking();

  return (
    <section className="pb-10">
      {!userBookings?.length ? (
        <section className="text-center my-8">
          <h2 className="text-xl flex items-center justify-center font-semibold gap-2 mb-4">
            <CircleAlert className="text-destructive" />
            No booking history found
          </h2>
        </section>
      ) : (
        <>
          <h1 className="text-lg px-5 font-semibold ">
            All Bookings <span>({userBookings?.length})</span>
          </h1>

          <section className="my-12">
            <BookingTracking bookings={userBookings} />
          </section>
        </>
      )}
    </section>
  );
};

export default BookingStatus;
