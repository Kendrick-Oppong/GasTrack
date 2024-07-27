import emailjs, { EmailJSResponseStatus } from "@emailjs/browser";
import { contactUsSchema } from "@/validators/formSchema";
import toast from "react-hot-toast";
import { z } from "zod";

type SendContactUsMessage = z.infer<typeof contactUsSchema>;

export const sendContactUsMessage = async (values: SendContactUsMessage) => {
  const templateParams = {
    name: values.name,
    email: values.email,
    subject: values.subject,
    message: values.message,
  };
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!,
      templateParams,
      {
        publicKey: process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!,
      }
    );
    console.log("Message successfully delivered");
    toast.success("Message delivered");
  } catch (err) {
    if (err instanceof EmailJSResponseStatus) {
      console.log("EMAILJS FAILED...", err);
      toast.error(err.text);
      return;
    }
    toast.error("Failed to deliver message");
    console.log("ERROR", err);
  }
};
