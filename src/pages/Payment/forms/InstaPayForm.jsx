import MainInput from "@/components/form/MainInput";
import ImageInput from "@/components/form/ImageInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/services/paymentsServices";
import { useState } from "react";
import FormError from "@/components/form/FormError";

// schema
const InstaPaySchema = z.object({
  sender_number: z.string().min(1, "الرقم مطلوب"),
  transfer_image: z.any().refine((file) => file instanceof File, "الصورة مطلوبة"),
});

const InstaPayForm = ({ cancelPayment, currentPayment, state }) => {
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm({
    resolver: zodResolver(InstaPaySchema),
    defaultValues: {
      sender_number: "",
      transfer_image: null,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      console.log("تم تأكيد الطلب", data);
      alert("تم تأكيد الدفع");
      setErrorMsg("");
      form.reset();
    },
    onError: (error) => {
      console.error(error);
      setErrorMsg(error?.response?.data?.message || "حصل خطأ");
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();

    // بيانات الفورم
    formData.append("sender_number", data.sender_number);
    formData.append("transfer_image", data.transfer_image);

    // بيانات الدفع
    formData.append("payment_method", currentPayment.paymentMethod);

    // كل اللي جاي من state
    formData.append("product_id", state.product_id);
    formData.append("login_data", state.login_data);
    formData.append("gift_code", state.gift_code);
    formData.append("password", state.password);

    mutate(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
        dir="rtl"
      >
        {currentPayment.transfer_number && (
          <div className="flex flex-col gap-2">
            <p className="font-bold">رقم التحويل</p>
            <span className="bg-muted p-2 rounded-lg">
              {currentPayment.transfer_number}
            </span>
          </div>
        )}

        {currentPayment.username && (
          <div className="flex flex-col gap-2">
            <p className="font-bold">اسم المستخدم</p>
            <span className="bg-muted p-2 rounded-lg">
              {currentPayment.username}
            </span>
          </div>
        )}

        <MainInput
          control={form.control}
          name="sender_number"
          label="رقم InstaPay"
          placeholder="ادخل رقم InstaPay"
        />

        <ImageInput control={form.control} name="transfer_image" />

        <div className="flex items-center gap-2">
          <Button type="submit" className="flex-1" disabled={isPending}>
            {isPending ? "جاري التأكيد..." : "تأكيد الدفع"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="rounded-full flex-1"
            onClick={cancelPayment}
          >
            تراجع
          </Button>
        </div>

        {errorMsg && <FormError errorMsg={errorMsg} />}
      </form>
    </Form>
  );
};

export default InstaPayForm;
