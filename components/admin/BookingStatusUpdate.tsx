"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { updateBookingStatus } from "@/lib/admin/updateBookingStatus";
import { Loader } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { ButtonLink } from "../button";
import { useState } from "react";

type Status = "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED";

interface BookingStatusUpdateProps {
  defaultStatus: string;
  bookingId: string;
}

export default function BookingStatusUpdate({
  defaultStatus,
  bookingId,
}: Readonly<BookingStatusUpdateProps>) {
  const [newStatus, setNewStatus] = useState<Status>("PENDING");

  const { execute, isExecuting } = useAction(updateBookingStatus, {
    onSuccess({ data }) {
      if (data?.success) toast.success(data?.success);
      if (data?.error) toast.error(data?.error);
    },
    onError({ error }) {
      if (error.serverError) {
        toast.error(error.serverError);
      }
      toast.error("Failed to update booking status");
    },
    onExecute() {
      toast("Executing action", {
        icon: <Loader className="ml-1 h-5 w-5 animate-spin" />,
      });
    },
  });

  const handleStatusUpdate = async () => {
    execute({ bookingId, newStatus });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <ButtonLink
          disabled={isExecuting}
          type="button"
          className="bg-destructive"
        >
          {isExecuting ? (
            <>
              Updating
              <Loader className="ml-1 h-5 w-5 animate-spin" />
            </>
          ) : (
            <>Update</>
          )}
        </ButtonLink>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Status</AlertDialogTitle>
          <RadioGroup
            defaultValue={defaultStatus || "PENDING"}
            className="space-y-2 mt-3"
            onValueChange={(value) => setNewStatus(value as Status)}
          >
            <div className="flex items-center space-x-2 text-lg">
              <RadioGroupItem value="PENDING" id="PENDING" />
              <Label className="text-base" htmlFor="PENDING">
                PENDING
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="CONFIRMED" id="CONFIRMED" />
              <Label className="text-base" htmlFor="CONFIRMED">
                CONFIRMED
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="DELIVERED" id="DELIVERED" />
              <Label className="text-base" htmlFor="DELIVERED">
                DELIVERED
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="CANCELLED" id="CANCELLED" />
              <Label className="text-base" htmlFor="CANCELLED">
                CANCELLED
              </Label>
            </div>
          </RadioGroup>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-accent cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive cursor-pointer"
            onClick={handleStatusUpdate}
          >
            Update
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
