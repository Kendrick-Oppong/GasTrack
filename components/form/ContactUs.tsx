"use client";
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
import { contactUsSchema } from "@/validators/formSchema";
import { Asterisk, Loader, Mail, } from "lucide-react";
import { ButtonLink } from "@/components/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { isError } from "@/lib/isFormFieldError";
import toast from "react-hot-toast";
import { sendContactUsMessage } from "@/lib/sendContactUsMessage";


  // Define the fields array with correct types
  const fields: Array<{
    name: "name" | "email" | "subject" | "message";
    label: string;
    type: string;
    placeholder: string;
    gridClass: string;
  }> = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter your name",
      gridClass: "sm:col-span-1",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter your email",
      gridClass: "sm:col-span-1",
    },
    {
      name: "subject",
      label: "Subject",
      type: "text",
      placeholder: "Title of message",
      gridClass: "sm:col-span-2",
    },
  ];

const ContactUsForm = () => {
  const form = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
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

  async function onSubmit(data: z.infer<typeof contactUsSchema>) {
    await sendContactUsMessage(data)
    console.log(data)
  }



  return (
    <div className="mx-auto max-w-6xl text-lg">
      <div className="mx-auto mb-10 rounded-lg border border-primary px-3 pb-10 shadow-2xl">
        <Form {...form}>
          <form
            autoComplete="fff"
            className="mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mb-6 grid sm:grid-cols-2 sm:gap-4">
              {fields
                .slice(0, 2)
                .map(({ name, label, type, placeholder, gridClass }) => (
                  <FormField
                    key={name}
                    control={control}
                    name={name}
                    render={({ field }) => (
                      <FormItem className={gridClass}>
                        <FormLabel>
                          {label}
                          <Asterisk className="mb-[3px] inline-flex h-4 w-4 text-destructive" />
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isSubmitting}
                            placeholder={placeholder}
                            type={type}
                            className={`${
                              isError(field.name, errors, form)
                                ? "border-destructive focus-visible:ring-destructive"
                                : "border-primary"
                            }`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
            </div>
            <div>
              <FormField
                control={control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>
                      Subject
                      <Asterisk className="mb-[3px] inline-flex h-4 w-4 text-destructive" />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Title of message"
                        type="text"
                        className={`${
                          isError(field.name, errors, form)
                            ? "border-destructive focus-visible:ring-destructive"
                            : "border-primary"
                        }`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="mt-6">
              <FormField
                control={control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Message
                      <Asterisk className="mb-[3px] inline-flex h-4 w-4 text-destructive" />
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isSubmitting}
                        placeholder="Write to us..."
                        rows={5}
                        maxLength={200}
                        className={`w-full resize-none ${
                          isError(field.name, errors, form)
                            ? "border-destructive focus-visible:ring-destructive"
                            : "border-primary"
                        }`}
                      />
                    </FormControl>
                    {field.value.length > 0 && (
                      <small
                        className={`${
                          field.value.length === 200
                            ? "text-destructive dark:text-destructive"
                            : ""
                        }`}
                      >
                        {field.value.length === 200
                          ? "Maximum characters exceeded"
                          : `${Math.round(
                              (field.value.length / 200) * 100,
                            )}% of maximum length (${field.value.length}/${200})`}
                      </small>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  Send message <Mail className="ml-2" />
                </>
              )}
            </ButtonLink>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ContactUsForm;
