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
import { ButtonLink } from "@/components/button";
import { DeleteAction } from "@/components/alert";

interface UserBookingsTableProps {
  bookings: Booking[];
}

export default function UserBookingTrackTable({
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Booking Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="">Details</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBookings.map((booking) => (
            <TableRow key={booking?.id}>
              <TableCell>{booking?.id}</TableCell>
              <TableCell>
                <p className="w-fit p-1 px-2 rounded-md border   border-primary">
                  {booking.status.charAt(0) +
                    booking.status.slice(1).toLowerCase()}
                </p>
              </TableCell>
              <TableCell>
                <ButtonLink className="">View Details</ButtonLink>
              </TableCell>
              <TableCell>
                <DeleteAction bookId={booking.id}>
                  <ButtonLink type="button" className="bg-destructive">
                    Delete
                  </ButtonLink>
                </DeleteAction>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
