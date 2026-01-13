import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";

import MainInput from "@/components/form/MainInput";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Lock } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/authServices";
import { useState } from "react";
import FormError from "@/components/form/FormError";

const changePasswordSchema = z
  .object({
    current_password: z.string().min(6, "كلمة المرور قصيرة"),
    password: z.string().min(6, "كلمة المرور الجديدة قصيرة"),
    password_confirmation: z.string().min(6, "كلمة المرور قصيرة"),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["password_confirmation"],
  });

const ChangePasswordModal = ({ open, onClose }) => {
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      alert("تم تغيير كلمة المرور بنجاح");
      // toast.success("تم تغيير كلمة المرور بنجاح");
      form.reset();
      onClose(); // 🔴 يقفل المودال
      setErrorMsg("");
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.message);
      // toast.error(error?.response?.data?.message || "حدث خطأ");
    },
  });

  const onSubmit = (data) => {
    changePasswordMutation.mutate({
      current_password: data.current_password,
      password: data.password,
      password_confirmation: data.password_confirmation,
    });
    console.log("Change Password Data:", data);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md"
        style={{
          pointerEvents: changePasswordMutation.isPending ? "none" : "auto",
        }}
      >
        <DialogHeader className="text-center">
          <DialogDescription></DialogDescription>
          <DialogTitle className="text-xl text-center">
            تغيير كلمة المرور
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            dir="rtl"
          >
            <MainInput
              control={form.control}
              name="current_password"
              label="كلمة المرور الحالية"
              type="password"
              icon={<Lock size={18} />}
            />

            <MainInput
              control={form.control}
              name="password"
              label="كلمة المرور الجديدة"
              type="password"
              icon={<Lock size={18} />}
            />

            <MainInput
              control={form.control}
              name="password_confirmation"
              label="تأكيد كلمة المرور الجديدة"
              type="password"
              icon={<Lock size={18} />}
            />

            <DialogFooter className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={changePasswordMutation.isPending}
              >
                {changePasswordMutation.isPending
                  ? "جاري التغيير..."
                  : "تغيير كلمة المرور"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => {
                  form.reset();
                  onClose();
                }}
              >
                تراجع
              </Button>
            </DialogFooter>

            {errorMsg && <FormError errorMsg={errorMsg} />}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
