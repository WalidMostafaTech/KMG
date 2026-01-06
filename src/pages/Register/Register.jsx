import AuthContainer from "@/components/form/AuthContainer";
import MainInput from "@/components/form/MainInput";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { User, Mail, Lock } from "lucide-react";

import { z } from "zod";
import { Link } from "react-router";

const registerSchema = z
  .object({
    name: z.string().min(3, "الاسم قصير"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    password: z.string().min(6, "كلمة المرور قصيرة"),
    confirm_password: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirm_password"],
  });

const Register = () => {
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AuthContainer title="إنشاء حساب" description="قم بإنشاء حساب جديد الآن">
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
            icon={<User size={18} />}
          />

          <MainInput
            control={form.control}
            name="email"
            label="البريد الإلكتروني"
            placeholder="example@email.com"
            icon={<Mail size={18} />}
          />

          <MainInput
            control={form.control}
            name="password"
            label="كلمة المرور"
            type="password"
            icon={<Lock size={18} />}
          />

          <MainInput
            control={form.control}
            name="confirm_password"
            label="تأكيد كلمة المرور"
            type="password"
            icon={<Lock size={18} />}
          />

          <Button type="submit" className="w-full">
            إنشاء حساب
          </Button>

          <p className="text-sm text-center">
            لديك حساب؟
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

export default Register;
