import AuthContainer from "@/components/form/AuthContainer";
import MainInput from "@/components/form/MainInput";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail, Lock } from "lucide-react";
import { Link } from "react-router";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  password: z.string().min(6, "كلمة المرور قصيرة"),
});

const Login = () => {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <AuthContainer
      title="تسجيل الدخول"
      description="قم بتسجيل الدخول إلى حسابك"
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

          <MainInput
            control={form.control}
            name="password"
            label="كلمة المرور"
            type="password"
            icon={<Lock size={18} />}
          />

          <Link
            to="/forgot-password"
            className="text-sm hover:underline block w-fit ms-auto"
          >
            نسيت كلمة المرور؟
          </Link>

          <Button type="submit" className="w-full">
            تسجيل الدخول
          </Button>

          <p className="text-sm text-center">
            ليس لديك حساب؟
            <Link
              to="/register"
              className="text-purple-500 cursor-pointer hover:underline"
            >
              {" "}
              إنشاء حساب جديد
            </Link>
          </p>
        </form>
      </Form>
    </AuthContainer>
  );
};

export default Login;
