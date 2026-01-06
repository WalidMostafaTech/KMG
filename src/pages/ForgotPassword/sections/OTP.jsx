import AuthContainer from "@/components/form/AuthContainer";

import { Form, FormField } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Link } from "react-router";
import { z } from "zod";

const otpSchema = z.object({
  otp: z.string().length(6, "أدخل رمز مكوّن من 6 أرقام"),
});

const OTP = () => {
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data) => {
    console.log("OTP:", data.otp);
  };

  return (
    <AuthContainer
      title="تأكيد الرمز"
      description="أدخل رمز التحقق المرسل إلى بريدك الإلكتروني"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full flex flex-col items-center"
          dir="ltr"
        >
          {/* OTP INPUT */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <div className="space-y-2">
                <InputOTP
                  maxLength={6}
                  {...field}
                  containerClassName="justify-center"
                >
                  <InputOTPGroup>
                    {[0, 1, 2].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className={`text-2xl w-12 h-12 border bg-white text-black`}
                      />
                    ))}
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    {[3, 4, 5].map((i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className={`text-2xl w-12 h-12 border bg-white text-black`}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                <p className="text-sm text-red-400 text-center">
                  {form.formState.errors.otp?.message}
                </p>
              </div>
            )}
          />

          <Button type="submit" className="w-full">
            تأكيد الرمز
          </Button>

          <p className="text-sm text-center">
            لم يصلك الرمز؟
            <button
              type="button"
              className="text-purple-500 hover:underline ms-1"
              onClick={() => console.log("Resend OTP")}
            >
              إعادة الإرسال
            </button>
          </p>

          <Link
            to="/login"
            className="text-sm hover:underline text-muted-foreground"
          >
            الرجوع لتسجيل الدخول
          </Link>
        </form>
      </Form>
    </AuthContainer>
  );
};

export default OTP;
