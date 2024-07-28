"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Asterisk, Loader, SendHorizontal, PackagePlus } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { bookingFormSchema } from "@/validators/formSchema";
import { useAction } from "next-safe-action/hooks";
import toast from "react-hot-toast";
import { createBooking } from "@/lib/user/createBooking";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import useGetUserLocation from "@/hooks/useGetUserLocation";
import { useRouter } from "next/navigation";

const BookingForm = () => {
  const { user } = useKindeBrowserClient();
  const router = useRouter();
  const { getPosition, coords } = useGetUserLocation();

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      cylinderSize: "",
    },
  });

  const { execute, isExecuting, hasSucceeded, reset, hasErrored, result } =
    useAction(createBooking, {
      onSuccess({ data }) {
        console.log("HELLO FROM ONSUCCESS", data);
        if (data?.success)
          toast.success(data?.success || "Booking successfully created");
      },
      onError({ error }) {
        if (error.serverError) {
          toast.error(error.serverError);
        }
        toast.error("Failed to create booking");
      },
      onSettled({ result }) {
        console.log("HELLO FROM ONSETTLED", result);
      },
      onExecute() {
        toast("Creating Booking", {
          icon: <Loader className="ml-1 h-5 w-5 animate-spin" />,
        });
      },
    });

  const {
    control,
    handleSubmit,
    reset: refetch,
    formState: { isValid, errors },
  } = form;

  useEffect(() => {
    if (user) {
      refetch((prevValues) => ({
        ...prevValues,
        fullName: `${user?.given_name} ${user?.family_name}` || "",
        email: user?.email ?? "",
      }));
    }
  }, [user, refetch]);

  useEffect(() => {
    if (hasSucceeded && !hasErrored && result) {
      reset();
      setTimeout(() => {
        router.push("/track");
      }, 1000);
    }
  }, [hasErrored, hasSucceeded, reset, result, router]);

  async function onSubmit(data: z.infer<typeof bookingFormSchema>) {
    if (coords) {
      const { latitude, longitude } = coords;
      execute({ ...data, latitude, longitude });
    } else {
      execute(data);
    }
  }

  return (
    <div className="text-lg">
      <div className="mx-auto mb-10 rounded-lg border border-primary px-3 pb-10 shadow-2xl">
        <Form {...form}>
          <form
            autoComplete="off"
            className="mt-4 space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>
                    Full Name
                    <Asterisk className="mb-[3px] inline-flex h-4 w-4 text-destructive" />
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isExecuting}
                      placeholder="Enter your name"
                      type="text"
                      className={`${
                        errors.fullName
                          ? "border-destructive focus-visible:ring-destructive"
                          : "border-primary"
                      }`}
                    />
                  </FormControl>
                  <FormMessage>{errors.fullName?.message}</FormMessage>
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
                  <FormLabel>
                    Phone Number
                    <Asterisk className="mb-[3px] inline-flex h-4 w-4 text-destructive" />
                  </FormLabel>
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
                  <FormLabel>
                    Address
                    <Asterisk className="mb-[3px] inline-flex h-4 w-4 text-destructive" />
                  </FormLabel>
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

            <FormField
              control={control}
              name="cylinderSize"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>
                    Cylinder Size
                    <Asterisk className="mb-[3px] inline-flex h-4 w-4 text-destructive" />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${
                          errors.cylinderSize
                            ? "border-destructive focus-visible:ring-destructive"
                            : "border-primary"
                        }`}
                      >
                        <SelectValue placeholder="Select cylinder size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6kg">6kg</SelectItem>
                      <SelectItem value="14kg">14kg</SelectItem>
                      <SelectItem value="25kg">25kg</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage>{errors.cylinderSize?.message}</FormMessage>
                </FormItem>
              )}
            />

            <ButtonLink
              disabled={isExecuting}
              className="mt-4 w-full"
              type="submit"
              onClick={() => {
                if (!isValid) {
                  toast.error("Please fill all fields");
                  return;
                }

                getPosition();
              }}
            >
              {isExecuting ? (
                <>
                  Creating Booking
                  <Loader className="ml-1 h-5 w-5 animate-spin" />
                </>
              ) : (
                <>
                  Book Now <SendHorizontal className="ml-2" />
                </>
              )}
            </ButtonLink>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default BookingForm;
