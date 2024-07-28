"use client";
import { useState } from "react";
import type { User } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface UserUsersTableProps {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
    phoneNumber: string;
    address: string | null;
  }[];
}

export default function CustomerNames({
  users,
}: Readonly<UserUsersTableProps>) {
  const [filter, setFilter] = useState("");
  const filteredUsers = users.filter((user) =>
    user.email.toString().includes(filter)
  );

  return (
    <>
      <div className="m-4">
        <Input
          className="w-full border-primary"
          placeholder="Filter by email address"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="space-y-6 ">
        {" "}
        {filteredUsers.map((user) => (
          <div
            key={user?.id}
            className="border space-y-4 py-2 border-primary rounded-md px-5 sm:hidden [&>div]:sm:grid [&>div]:grid-cols-3 [&>div]:items-center [&>div]:gap-4 "
          >
            <div>
              <p className="font-semibold">Name</p>
              <p className="col-span-2">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p className="col-span-2">{user?.email}</p>
            </div>
            <div>
              <p className="font-semibold">Phone Number </p>
              <p className="col-span-2">{user?.phoneNumber}</p>
            </div>
          </div>
        ))}
      </div>

      <Table className="hidden sm:inline-table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="">Phone Numbers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user?.id}>
              <TableCell>
                {user?.firstName} {user?.lastName}
              </TableCell>
              <TableCell>
                <p className=" ">{user?.email}</p>
              </TableCell>
              <TableCell>
                <p className=" ">{user?.phoneNumber}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
