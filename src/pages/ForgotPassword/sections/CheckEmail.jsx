import AuthContainer from "@/components/form/AuthContainer";
import MainInput from "@/components/form/MainInput";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail } from "lucide-react";
import { Link } from "react-router";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
});

const CheckEmail = ({ goNext, setParentData }) => {
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    setParentData(data);
    goNext();
  };

  return (
    <AuthContainer
      title="نسيت كلمة المرور"
      description="أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
          dir="rtl"
        >
          <MainInput
            control={form.control}
            name="email"
            label="البريد الإلكتروني"
            placeholder="example@email.com"
            icon={<Mail size={18} />}
          />

          <Button type="submit" className="w-full">
            إرسال رابط إعادة التعيين
          </Button>

          <p className="text-sm text-center">
            تذكرت كلمة المرور؟
            <Link
              to="/login"
              className="text-purple-500 cursor-pointer hover:underline"
            >
              {" "}
              تسجيل الدخول
            </Link>
          </p>
        </form>
      </Form>
    </AuthContainer>
  );
};

export default CheckEmail;
