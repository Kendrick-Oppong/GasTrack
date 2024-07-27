import { contactUsSchema,bookingFormSchema } from "@/validators/formSchema";
import { FieldError, FieldErrors, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormFields = z.infer<typeof contactUsSchema> | z.infer<typeof bookingFormSchema>;

export const isError = <T extends FormFields>(
  fieldName: string,
  errors: FieldErrors<T>,
  form: UseFormReturn<T>
) => {
  const error = errors[
    fieldName as keyof typeof form.formState.defaultValues
  ] as FieldError | undefined;
  return error?.message;
};
