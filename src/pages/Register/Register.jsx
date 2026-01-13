import AuthContainer from "@/components/form/AuthContainer";
import MainInput from "@/components/form/MainInput";
import FormError from "@/components/form/FormError";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { User, Mail, Lock } from "lucide-react";
import { z } from "zod";
import { Link, useNavigate } from "react-router";

import { registerUser } from "@/services/authServices";

const registerSchema = z
  .object({
    name: z.string().min(3, "الاسم قصير"),
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    password: z.string().min(6, "كلمة المرور قصيرة"),
    password_confirmation: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["password_confirmation"],
  });

const Register = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const {
    mutate: register,
    isPending,
    error,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/verify-email", { replace: true });
    },
  });

  const onSubmit = (data) => {
    register({
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
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
            name="password_confirmation"
            label="تأكيد كلمة المرور"
            type="password"
            icon={<Lock size={18} />}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
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

          {error && (
            <FormError
              errorMsg={error.response?.data?.message || "حدث خطأ ما"}
            />
          )}
        </form>
      </Form>
    </AuthContainer>
  );
};

export default Register;
