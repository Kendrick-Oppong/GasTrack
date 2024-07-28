"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Asterisk, Loader, SendHorizontal } from "lucide-react";
import { ButtonLink } from "@/components/button";
import toast from "react-hot-toast";
import { useAction } from "next-safe-action/hooks";
import { profileFormSchema } from "@/validators/formSchema";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/user/updateProfile";
import type { User } from "@prisma/client";


const ProfileForm = ({userDetails}:{userDetails:User}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: userDetails?.firstName || "",
      lastName: userDetails?.lastName || "",
      email: userDetails?.email || "",
      phoneNumber: userDetails?.phoneNumber || "",
      address: userDetails?.address || "",
    },
  });

  const { execute, isExecuting, hasSucceeded, reset, hasErrored, result } =
    useAction(updateProfile, {
      onSuccess({ data }) {
        if (data?.success)
          toast.success(data.success || "Profile successfully updated");
      },
      onError({ error }) {
        if (error.serverError) {
          toast.error(error.serverError);
        }
        toast.error("Failed to update profile");
      },
      onSettled({ result }) {
        console.log("Profile update settled", result);
      },
      onExecute() {
        toast("Updating Profile", {
          icon: <Loader className="ml-1 h-5 w-5 animate-spin" />,
        });
      },
    });

  const {
    control,
    handleSubmit,
    formState: { isValid, errors },
  } = form;

  useEffect(() => {
    if (hasSucceeded && !hasErrored && result) {
      reset();
    }
  }, [hasErrored, hasSucceeded, reset, result, router]);

  async function onSubmit(data: z.infer<typeof profileFormSchema>) {
    execute(data);
  }

  return (
    <div className="text-lg py-6 lg:max-w-5xl lg:mx-auto">
      <div className="mx-auto mb-10 rounded-lg border border-primary px-3 pb-10 shadow-2xl">
        <Form {...form}>
          <form
            autoComplete="off"
            className="mt-4 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isExecuting}
                      placeholder="Enter your first name"
                      type="text"
                      className={`${
                        errors.firstName
                          ? "border-destructive focus-visible:ring-destructive"
                          : "border-primary"
                      }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.firstName?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isExecuting}
                      placeholder="Enter your last name"
                      type="text"
                      className={`${
                        errors.lastName
                          ? "border-destructive focus-visible:ring-destructive"
                          : "border-primary"
                      }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.lastName?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>
                    Email
                    <Asterisk className="mb-[3px] inline-flex h-4 w-4 text-destructive" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isExecuting}
                      placeholder="Enter your email"
                      type="email"
                      className={`${
                        errors.email
                          ? "border-destructive focus-visible:ring-destructive"
                          : "border-primary"
                      }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.email?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isExecuting}
                      placeholder="Enter your phone number"
                      type="tel"
                      className={`${
                        errors.phoneNumber
                          ? "border-destructive focus-visible:ring-destructive"
                          : "border-primary"
                      }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.phoneNumber?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isExecuting}
                      placeholder="Enter your address"
                      type="text"
                      className={`${
                        errors.address
                          ? "border-destructive focus-visible:ring-destructive"
                          : "border-primary"
                      }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.address?.message}</FormMessage>
                </FormItem>
              )}
            />

            <ButtonLink
              disabled={isExecuting}
              className="mt-4 w-full"
              type="submit"
              onClick={() => {
                if (!isValid) {
                  toast.error("Please fill required fields");
                }
              }}
            >
              {isExecuting ? (
                <>
                  Updating Profile
                  <Loader className="ml-1 h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Update Profile <SendHorizontal className="ml-2" />
                </>
              )}
            </ButtonLink>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileForm;
