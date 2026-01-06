import AuthContainer from "@/components/form/AuthContainer";
import MainInput from "@/components/form/MainInput";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Lock } from "lucide-react";
import { useMemo } from "react";
import { getPasswordStrength, strengthLabel } from "@/utils/PasswordStrength";

import { z } from "zod";

const resetPasswordSchema = z
  .object({
    password: z.string().min(6, "كلمة المرور قصيرة"),
    confirm_password: z.string().min(6, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirm_password"],
  });

const ResetPassword = () => {
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const password = form.watch("password");
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  const onSubmit = (data) => {
    console.log(data);
  };

  const progressColor =
    strength <= 1
      ? "#ef4444"
      : strength === 2
      ? "#fbbf24"
      : strength === 3
      ? "#84cc16"
      : "#22c55e";

  return (
    <AuthContainer
      title="إعادة تعيين كلمة المرور"
      description="أدخل كلمة مرور جديدة لحسابك"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
          dir="rtl"
        >
          <MainInput
            control={form.control}
            name="password"
            label="كلمة المرور الجديدة"
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

          {/* Password Strength */}
          <div className="space-y-1">
            <Progress
              value={(strength / 4) * 100}
              indicatorColor={progressColor}
              className={"bg-accent"}
            />

            {strength > 0 && (
              <p className="text-sm text-muted-foreground">
                قوة كلمة المرور:
                <span
                  className="font-semibold ms-1"
                  style={{ color: progressColor }}
                >
                  {strengthLabel(strength)}
                </span>
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            حفظ كلمة المرور الجديدة
          </Button>
        </form>
      </Form>
    </AuthContainer>
  );
};

export default ResetPassword;
