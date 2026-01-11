import MainInput from "@/components/form/MainInput";
import ImageInput from "@/components/form/ImageInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// schema
const binancePaySchema = z.object({
  id: z.string().min(1, "معرّف Binance مطلوب"),
  image: z.any().refine((file) => file instanceof File, "الصورة مطلوبة"),
});

const BinancePayForm = ({ cancelPayment }) => {
  const form = useForm({
    resolver: zodResolver(binancePaySchema),
    defaultValues: {
      id: "",
      image: null,
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("image", data.image);

    console.log(formData);
    // جاهز للإرسال للسيرفر
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
          name="id"
          label="Binance Pay ID"
          placeholder="ادخل Binance Pay ID"
        />

        {/* Image Input */}
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

export default BinancePayForm;
