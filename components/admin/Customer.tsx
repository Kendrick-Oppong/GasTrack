"use client";
import { useState } from "react";
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

interface UserUsersTableProps {
  users: {
    id: string;
    firstName: string;
    lastName: string;

    email: string;
    profileImage: string | null;
    phoneNumber: string;
    address: string | null;
  }[];
  type: "worker" | "customer";
}

export default function CustomerNames({
  type,
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
            <div>
              <p className="font-semibold">Action </p>
              <DeleteAction
                onErrorMessage="Failed to delete customer"
                onSuccessMessage={
                  type === "customer"
                    ? "Customer successfully deleted"
                    : "Worker successfully deleted"
                }
                deleteType={type === "customer" ? "customer" : "worker"}
                description={
                  type === "customer"
                    ? "This will permanently delete your customer"
                    : "This will permanently delete your worker"
                }
                id={user?.id}
              />
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
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user?.id}>
              <TableCell>
                <p>
                  {user?.firstName} {user?.lastName}
                </p>
              </TableCell>
              <TableCell>
                <p>{user?.email}</p>
              </TableCell>
              <TableCell>
                <p>{user?.phoneNumber}</p>
              </TableCell>
              <TableCell>
                <DeleteAction
                  onErrorMessage="Failed to delete customer"
                  onSuccessMessage="Customer successfully deleted"
                  deleteType={type === "customer" ? "customer" : "worker"}
                  description={
                    type === "customer"
                      ? "This will permanently delete your customer"
                      : "This will permanently delete your worker"
                  }
                  id={user?.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
