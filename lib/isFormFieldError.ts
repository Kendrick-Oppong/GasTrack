import { contactUsSchema } from "@/validators/formSchema";
import { FieldError, FieldErrors, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type SendContactUsMessage = z.infer<typeof contactUsSchema>;

export const isError = <T extends SendContactUsMessage>(
  fieldName: string,
  errors: FieldErrors<T>,
  form: UseFormReturn<T>
) => {
  const error = errors[
    fieldName as keyof typeof form.formState.defaultValues
  ] as FieldError | undefined;
  return error?.message;
};
