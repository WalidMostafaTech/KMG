import MainInput from "@/components/form/MainInput";
import ImageInput from "@/components/form/ImageInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const vodafoneCashSchema = z.object({
  transfer_number: z.string().min(1, "رقم التحويل مطلوب"),
  transfer_from: z.string().min(1, "رقم المحول منه مطلوب"),
  image: z.any().refine((file) => file instanceof File, "الصورة مطلوبة"),
});

const VodafoneCashForm = ({ cancelPayment }) => {
  const form = useForm({
    resolver: zodResolver(vodafoneCashSchema),
    defaultValues: {
      transfer_number: "",
      transfer_from: "",
      image: null,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("transfer_number", data.transfer_number);
    formData.append("transfer_from", data.transfer_from);
    formData.append("image", data.image);
    console.log(formData);
    // data.image هتكون ملف الصورة
    // ممكن تعمل إرسال البيانات للسيرفر
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full"
        dir="rtl"
      >
        <MainInput
          control={form.control}
          name="transfer_number"
          label="رقم التحويل"
          placeholder="ادخل رقم التحويل"
        />

        <MainInput
          control={form.control}
          name="transfer_from"
          label="رقم المحول منه"
          placeholder="ادخل رقم المحول منه"
        />

        {/* ImageInput */}
        <ImageInput control={form.control} name="image" />

        <div className="flex items-center gap-2">
          <Button type="submit" className="flex-1">
            تأكيد الدفع
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
      </form>
    </Form>
  );
};

export default VodafoneCashForm;
