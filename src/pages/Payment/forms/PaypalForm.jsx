import MainInput from "@/components/form/MainInput";
import ImageInput from "@/components/form/ImageInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// تعريف schema للفورم
const paypalFormSchema = z.object({
  link: z.string().min(1, "رابط البايبال مطلوب"),
  user: z.string().min(1, "اسم المستخدم مطلوب"),
  image: z.any().refine((file) => file instanceof File, "الصورة مطلوبة"),
});

const PaypalForm = ({ cancelPayment }) => {
  const form = useForm({
    resolver: zodResolver(paypalFormSchema),
    defaultValues: {
      link: "",
      user: "",
      image: null,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("link", data.link);
    formData.append("user", data.user);
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
          name="link"
          label="رابط البايبال"
          placeholder="ادخل رابط البايبال"
        />

        <MainInput
          control={form.control}
          name="user"
          label="اسم المستخدم"
          placeholder="ادخل اسم المستخدم"
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

export default PaypalForm;
