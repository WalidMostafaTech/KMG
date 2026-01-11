import MainInput from "@/components/form/MainInput";
import ImageInput from "@/components/form/ImageInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// تعريف schema للفورم
const InstaPaySchema = z.object({
  user: z.string().min(1, "اسم المستخدم مطلوب"),
  number: z.string().min(1, "رقم الهاتف مطلوب"),
  transfer_number: z.string().min(1, "رقم التحويل مطلوب"),
  image: z.any().refine((file) => file instanceof File, "الصورة مطلوبة"),
});

const InstaPayForm = ({ cancelPayment }) => {
  const form = useForm({
    resolver: zodResolver(InstaPaySchema),
    defaultValues: {
      user: "",
      number: "",
      transfer_number: "",
      image: null,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("user", data.user);
    formData.append("number", data.number);
    formData.append("transfer_number", data.transfer_number);
    formData.append("image", data.image);

    console.log(formData);
    // هنا ممكن تبعت البيانات للسيرفر
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
          name="user"
          label="اسم المستخدم"
          placeholder="ادخل اسم المستخدم"
        />

        <MainInput
          control={form.control}
          name="number"
          label="رقم الهاتف"
          placeholder="ادخل رقم الهاتف"
        />

        <MainInput
          control={form.control}
          name="transfer_number"
          label="رقم التحويل"
          placeholder="ادخل رقم التحويل"
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

export default InstaPayForm;
