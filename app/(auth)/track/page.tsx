// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { redirect } from "next/navigation";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Link from "next/link";
// import { ButtonLink } from "@/components/button";
// import { CircleAlert } from "lucide-react";
// import { UserBookingTrackTable } from "@/components/shared";
// import { getUserBooking } from "@/lib/user/getUserBooking";

// const TrackPage = async () => {
//   const { isAuthenticated } = getKindeServerSession();
//   const isLoggedIn = await isAuthenticated();

//   if (!isLoggedIn) {
//     redirect("/api/auth/login?");
//   }
//   const userBookings = await getUserBooking();

//   return (
//     <>
//       <section className="bg-[url('https://images.pexels.com/photos/18982333/pexels-photo-18982333/free-photo-of-golden-renault-trucks-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-center bg-cover h-96 w-full">
//         <h1 className="flex items-center justify-center w-full h-full text-primary bg-black/90 dark:bg-black/70">
//           Tracking
//         </h1>
//       </section>
//       {!userBookings?.length ? (
//         <section className="text-center my-8">
//           <h2 className="text-xl flex items-center justify-center font-semibold gap-2 mb-4">
//             <CircleAlert className="text-destructive" />
//             No Tracking history found
//           </h2>
//           <Link href="/book-now">
//             {" "}
//             <ButtonLink className="">Book Now</ButtonLink>
//           </Link>
//         </section>
//       ) : (
//         <section className="my-12">
//           <Tabs defaultValue="Booking History">
//             <div className="text-center">
//               <TabsList className="w-fit font-semibold">
//                 <TabsTrigger value="Booking History" className="flex-1">
//                   Booking History
//                 </TabsTrigger>
//                 <TabsTrigger value="Track" className="flex-1">
//                   Track Order
//                 </TabsTrigger>
//               </TabsList>
//             </div>

//             <TabsContent
//               value="Booking History"
//               className="mx-3 sm:mx-5 border border-gray-400 rounded-md mt-8"
//             >
//               <UserBookingTrackTable bookings={userBookings} />
//             </TabsContent>
//             <TabsContent value="Track">Tracking</TabsContent>
//           </Tabs>
//         </section>
//       )}
//     </>
//   );
// };

// export default TrackPage;



import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { CircleAlert } from "lucide-react";
import { UserBookingTrackTable,BookingProgressTracker } from "@/components/shared";
import { getUserBooking } from "@/lib/user/getUserBooking";

const TrackPage = async () => {
  const { isAuthenticated } = getKindeServerSession();
  const isLoggedIn = await isAuthenticated();

  if (!isLoggedIn) {
    redirect("/api/auth/login?");
  }
  const userBookings = await getUserBooking();

  return (
    <>
      <section className="bg-[url('https://images.pexels.com/photos/18982333/pexels-photo-18982333/free-photo-of-golden-renault-trucks-t.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-no-repeat bg-center bg-cover h-80 w-full">
        <h1 className="flex items-center justify-center w-full h-full text-primary bg-black/90 dark:bg-black/70">
          Tracking
        </h1>
      </section>
      {!userBookings?.length ? (
        <section className="text-center my-8">
          <h2 className="text-xl flex items-center justify-center font-semibold gap-2 mb-4">
            <CircleAlert className="text-destructive" />
            No Tracking history found
          </h2>
          <Link href="/book-now">
            {" "}
            <ButtonLink className="">Book Now</ButtonLink>
          </Link>
        </section>
      ) : (
        <section className="my-12">
          <Tabs defaultValue="Booking History">
            <div className="text-center">
              <TabsList className="w-fit font-semibold">
                <TabsTrigger value="Booking History" className="flex-1">
                  Booking History
                </TabsTrigger>
                <TabsTrigger value="Track" className="flex-1">
                  Booking Status
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent
              value="Booking History"
              className="mx-3 sm:mx-5 border border-gray-400 rounded-md mt-8"
            >
              <UserBookingTrackTable bookings={userBookings} />
            </TabsContent>
            <TabsContent value="Track" className="mx-3 sm:mx-5 mt-8 space-y-6">
              {userBookings.map((booking) => (
                <div key={booking.id} className="border p-4 rounded-md">
                  <h3 className="text-lg font-semibold mb-2">
                    Booking ID: {booking.id}
                  </h3>
                  <BookingProgressTracker status={booking.status} />
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </section>
      )}
    </>
  );
};

export default TrackPage;
