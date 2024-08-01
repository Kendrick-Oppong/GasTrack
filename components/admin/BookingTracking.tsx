"use client";
import { useState } from "react";
import type { Booking } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookingStatusUpdate from "./BookingStatusUpdate";
import { extractPrice, extractText } from "@/lib/extractPrice";

interface UserBookingsTableProps {
  bookings: Booking[];
}

export default function BookingTracking({
  bookings,
}: Readonly<UserBookingsTableProps>) {
  const [filter, setFilter] = useState("");
  const filteredBookings = bookings.filter((booking) =>
    booking.id.toString().includes(filter)
  );

  return (
    <>
      <div className="m-4">
        <Input
          className="w-full border-primary"
          placeholder="Filter by booking id"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div
            key={booking?.id}
            className={`
            space-y-4 py-5 border border-primary rounded-md px-5 sm:hidden [&>div]:sm:grid [&>div]:grid-cols-3 [&>div]:items-center [&>div]:gap-4`}
          >
            <div>
              <p className="font-semibold">Booking ID</p>
              <p className="col-span-2">{booking?.id}</p>
            </div>
            <div>
              <p className="font-semibold">Customer</p>
              <p className="col-span-2">{booking?.fullName}</p>
            </div>
            <div>
              <p className="font-semibold">Status</p>
              <p
                className={`col-span-2 w-fit p-1 px-2 rounded-md border-2 border-orange-500`}
              >
                {booking?.status.charAt(0) +
                  booking?.status.slice(1).toLowerCase()}
              </p>
            </div>
            <div>
              <p className="font-semibold">Size</p>
              <p className="col-span-2">{extractText(booking?.cylinderSize)}</p>
            </div>
            <div>
              <p className="font-semibold">Price</p>
              <p className="col-span-2">
                {extractPrice(booking?.cylinderSize)}
              </p>
            </div>
            <div>
              <p className="font-semibold">Action</p>
              <BookingStatusUpdate
                bookingId={booking?.id}
                defaultStatus={booking.status}
              />
            </div>
          </div>
        ))}
      </div>
      <Table className="hidden sm:inline-table">
        <TableHeader>
          <TableRow>
            <TableHead>Booking ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings.map((booking) => (
            <TableRow key={booking?.id}>
              <TableCell>{booking?.id}</TableCell>
              <TableCell>{booking?.fullName}</TableCell>
              <TableCell>
                <p
                  className={`col-span-2 w-fit p-1 px-2 rounded-md border-2 border-orange-500`}
                >
                  {booking.status.charAt(0) +
                    booking.status.slice(1).toLowerCase()}
                </p>
              </TableCell>
              <TableCell>
                <p>{extractText(booking?.cylinderSize)}</p>
              </TableCell>
              <TableCell>
                <p> {extractPrice(booking?.cylinderSize)}</p>
              </TableCell>
              <TableCell>
                <BookingStatusUpdate
                  bookingId={booking?.id}
                  defaultStatus={booking.status}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
