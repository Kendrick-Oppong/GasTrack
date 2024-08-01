import { QRCodeCanvas } from "qrcode.react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ButtonLink } from "@/components/button";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Booking } from "@prisma/client";
import { extractPrice, extractText } from "@/lib/extractPrice";
import { formatDateTime } from "@/lib/dateTimeFormater";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { BookingTicketPDF } from "@/components/pdf";

interface UserBookingHistoryProps {
  booking: Booking;
  children: React.ReactNode;
}

export default function UserBookingHistory({
  children,
  booking,
}: Readonly<UserBookingHistoryProps>) {
  const cylinderPrice = extractPrice(booking.cylinderSize);
  const cylinderSize = extractText(booking.cylinderSize);
  const getFormatedDate = formatDateTime(booking.createdAt);

 
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full max-w-full py-8">
        <ScrollArea className="h-[30rem]  rounded-md border p-4">
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 150,
              width: "100%",
              backgroundColor: "#FFFFFF",
            }}
          >
            <QRCodeCanvas
              size={256}
              style={{
                height: "auto",
                maxWidth: "100%",
                width: "100%",
                backgroundColor: "#FFFFFF",
              }}
              value={`Booking ID - ${booking.id}`}
            />
          </div>
          <div>
            <PDFDownloadLink
              document={
                <BookingTicketPDF
                  booking={booking}
                  cylinderSize={cylinderSize}
                  cylinderPrice={cylinderPrice as number}
                />
              }
              fileName={`bookingOrder-${booking.id}.pdf`}
            >
              {({ loading }) =>
                loading ? (
                  <p className="text-center my-4"> Loading booking...</p>
                ) : (
                  <div className="text-center my-4">
                    <p className="p-1 rounded-sm bg-accent w-fit mx-auto">
                      Download Booking
                    </p>
                  </div>
                )
              }
            </PDFDownloadLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-6">
            <div className="space-y-2">
              <h2 className="font-bold">Dispatcher</h2>
              <p>Kofi Mensah</p>
              <p>kofi.mensah3@gmail.com</p>
              <p>0542282292</p>
            </div>
            <div className="space-y-2 mt-6 md:mt-0">
              <h2 className="font-bold">Customer (You)</h2>
              <p>{booking.fullName}</p>
              <p>{booking.email}</p>
              <p>{booking.phoneNumber}</p>
            </div>
          </div>
          <div className="mt-5">
            <div className="space-y-2">
              <h2 className="font-bold">Booking Information</h2>
              <div className="flex items-center gap-5">
                <p className="font-medium">Status</p>
                <p className="p-1 px-2 rounded-md border-2 border-orange-500">
                  {booking.status}
                </p>
              </div>
              <div className="flex items-center gap-5">
                <p className="font-medium">Weight</p>
                <p>{cylinderSize}</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="font-medium">Price</p>
                <p>{cylinderPrice} Cedis</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="font-medium">Booking Date</p>
                <p>{getFormatedDate}</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="font-medium">Payment Mode</p>
                <p>Cash - Pay on Delivery</p>
              </div>
              <div className="flex items-center gap-5">
                <p className="font-medium">Expected Delivery Date</p>
                <p>Same day</p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <ButtonLink type="button" className="w-full">
              Close
            </ButtonLink>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
