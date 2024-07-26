"use client";

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
import { Asterisk, Loader, SendHorizontal } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { bookingFormSchema } from "@/validators/formSchema";
import { useEffect } from "react";
import toast from "react-hot-toast";

const BookingForm = () => {
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

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid, errors, isSubmitSuccessful, isSubmitting },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  async function onSubmit(data: z.infer<typeof bookingFormSchema>) {
    console.log(data);
    // Handle form submission
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger
                        className={`${
                          errors.cylinderSize
                            ? "border-destructive focus-visible:ring-destructive"
                            : "border-primary w-full"
                        }`}
                      >
                        <SelectValue placeholder="Select cylinder size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Small - 5kg">Small - 5kg</SelectItem>
                        <SelectItem value="Medium - 12kg">
                          Medium - 12kg
                        </SelectItem>
                        <SelectItem value="Large - 25kg">
                          Large - 25kg
                        </SelectItem>
                        <SelectItem value="Extra Large - 45kg">
                          Extra Large - 45kg
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{errors.cylinderSize?.message}</FormMessage>
                </FormItem>
              )}
            />

            <ButtonLink
              disabled={isSubmitting}
              className="mt-4 w-full"
              type="submit"
              onClick={() => !isValid && toast.error("Please fill all fields")}
            >
              {isSubmitting ? (
                <>
                  Sending message
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
