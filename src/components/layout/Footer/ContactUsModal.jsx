import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import MainInput from "@/components/form/MainInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInputField from "@/components/form/PhoneInputField";

import { useMutation } from "@tanstack/react-query";
import { getContactUs } from "@/services/mainServices";
import { useState } from "react";
import FormSuccess from "@/components/form/FormSuccess";
import FormError from "@/components/form/FormError";

const FormSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z
    .string()
    .min(1, "رقم الهاتف مطلوب")
    .refine((val) => isValidPhoneNumber(val), "رقم الهاتف غير صالح"),
  message: z.string().min(10, "الرسالة يجب ان تكون على الاقل 10 حروف"),
});

const ContactUsModal = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: getContactUs,
    onSuccess: () => {
      form.reset();
      setSuccessMsg("تم الارسال بنجاح");
      setErrorMsg("");
    },
    onError: (error) => {
      console.error("حصل خطأ ❌", error);
      setErrorMsg(error?.response?.data?.message || "حصل خطاء");
      setSuccessMsg("");
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm underline hover:text-primary transition cursor-pointer">
          اتصل بنا
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">تواصل معنا</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full"
            dir="rtl"
          >
            <MainInput
              control={form.control}
              name="name"
              label="الاسم"
              placeholder="أدخل الاسم"
            />

            <MainInput
              control={form.control}
              name="email"
              label="البريد الإلكتروني"
              placeholder="example@email.com"
            />

            <PhoneInputField
              control={form.control}
              name="phone"
              label="رقم الهاتف"
            />

            <MainInput
              type="textarea"
              control={form.control}
              name="message"
              label="الرسالة"
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "جاري الإرسال..." : "إرسال"}
            </Button>

            {successMsg && <FormSuccess successMsg={successMsg} />}
            {errorMsg && <FormError errorMsg={errorMsg} />}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactUsModal;
