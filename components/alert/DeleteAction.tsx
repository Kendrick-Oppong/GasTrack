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
import toast from "react-hot-toast";
import { ButtonLink } from "@/components/button";
import { useAction } from "next-safe-action/hooks";
import { Loader } from "lucide-react";
import { deleteBooking } from "@/lib/user/deleteBooking";
import {
  deleteCustomer,
  deleteStation,
  deleteWorker,
} from "@/lib/admin/deleteAction";

interface DeleteActionProps {
  id: string;
  deleteType: "booking" | "customer" | "worker" | "station";
  description: string;
  onSuccessMessage?: string;
  onErrorMessage?: string;
}

export default function DeleteAction({
  id,
  deleteType,
  description,
  onSuccessMessage = "Action successful",
  onErrorMessage = "Action failed",
}: Readonly<DeleteActionProps>) {
  let action;

  switch (deleteType) {
    case "booking":
      action = deleteBooking;
      break;
    case "customer":
      action = deleteCustomer;
      break;
    case "worker":
      action = deleteWorker;
      break;
    case "station":
      action = deleteStation;
      break;
    default:
      throw new Error(`Unsupported deleteType: ${deleteType}`);
  }

  const { execute, isExecuting } = useAction(action, {
    onSuccess({ data }) {
      if (data?.success) toast.success(data?.success || onSuccessMessage);
      if (data?.error) toast.error(data?.error || onErrorMessage);
    },
    onError({ error }) {
      if (error.serverError) {
        toast.error(error.serverError);
      }
      toast.error(onErrorMessage);
    },
    onExecute() {
      toast("Executing action", {
        icon: <Loader className="ml-1 h-5 w-5 animate-spin" />,
      });
    },
  });

  const handleDelete = async () => {
    execute({ id });
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
            This action cannot be undone. {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-accent cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
