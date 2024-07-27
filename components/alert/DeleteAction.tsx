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
import { deleteBooking } from "@/lib/user/deleteBooking";
import toast from "react-hot-toast";
import { ButtonLink } from "@/components/button";
import { useAction } from "next-safe-action/hooks";
import { Loader, Trash2 } from "lucide-react";

export default function DeleteAction({ bookId }: { bookId: string }) {
  const { execute, isExecuting } = useAction(deleteBooking, {
    onSuccess({ data }) {
      if (data?.success) toast.success(data?.success);
      if (data?.error) toast.success(data?.error);
    },
    onError({ error }) {
      if (error.serverError) {
        toast.error(error.serverError);
      }
      toast.error("Failed to delete booking");
    },

    onExecute() {
      toast("Deleting Booking", {
        icon: <Trash2 />,
      });
    },
  });

  const handleDelete = async () => {
    execute({ bookingId: bookId });
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
              Deleting
              <Loader className="ml-1 h-5 w-5 animate-spin" />
            </>
          ) : (
            <>Delete</>
          )}
        </ButtonLink>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            booking
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-accent">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
