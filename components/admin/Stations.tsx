"use client";
import { useState } from "react";
import type { Station } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteAction } from "../alert";

interface StationProps {
  stations: Station[];
}

export default function StationList({ stations }: Readonly<StationProps>) {
  const [filter, setFilter] = useState("");
  const filteredStations = stations.filter((station) =>
    station.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className="m-4">
        <Input
          className="w-full border-primary"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="space-y-6 sm:hidden">
        {filteredStations.map((station) => (
          <div
            key={station.id}
            className="border space-y-4 p-5 border-primary rounded-md  [&>div]:grid [&>div]:grid-cols-3 [&>div]:items-center [&>div]:gap-4"
          >
            <div>
              <p className="font-semibold">Name</p>
              <p className="col-span-2">{station?.name}</p>
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p className="col-span-2">{station?.location}</p>
            </div>
            <div>
              <p className="font-semibold">Contact</p>
              <p className="col-span-2">{station?.contact}</p>
            </div>
            <div>
              <p className="font-semibold">Working Days</p>
              <p className="col-span-2">{station?.workingDays}</p>
            </div>
            <div>
              <p className="font-semibold">Working Hours</p>
              <p className="col-span-2">{station?.workingHours}</p>
            </div>
            <div>
              <p className="font-semibold">Action </p>
              <DeleteAction
                onErrorMessage="Failed to delete station"
                onSuccessMessage="Station successfully deleted"
                deleteType="station"
                description="This will permanently delete your station"
                id={station?.id}
              />
            </div>
          </div>
        ))}
      </div>

      <Table className="hidden sm:inline-table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Working Days</TableHead>
            <TableHead>Working Hours</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredStations.map((station) => (
            <TableRow key={station?.id}>
              <TableCell>{station?.name}</TableCell>
              <TableCell>{station?.location}</TableCell>
              <TableCell>{station?.contact}</TableCell>
              <TableCell>{station?.workingDays}</TableCell>
              <TableCell>{station?.workingHours}</TableCell>
              <TableCell>
                <DeleteAction
                  onErrorMessage="Failed to delete station"
                  onSuccessMessage="Station successfully deleted"
                  deleteType="station"
                  description="This will permanently delete your station"
                  id={station?.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
