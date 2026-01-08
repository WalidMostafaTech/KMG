import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";

import MainInput from "@/components/form/MainInput";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Lock } from "lucide-react";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6, "كلمة المرور قصيرة"),
    newPassword: z.string().min(6, "كلمة المرور الجديدة قصيرة"),
    confirmPassword: z.string().min(6, "كلمة المرور قصيرة"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

const ChangePasswordModal = () => {
  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Change Password Data:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full">
          تغيير كلمة المرور
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
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
              name="currentPassword"
              label="كلمة المرور"
              type="password"
              icon={<Lock size={18} />}
            />

            <MainInput
              control={form.control}
              name="newPassword"
              label="أدخل كلمة المرور الجديدة"
              type="password"
              icon={<Lock size={18} />}
            />

            <MainInput
              control={form.control}
              name="confirmPassword"
              label="تأكيد كلمة المرور الجديدة"
              type="password"
              icon={<Lock size={18} />}
            />

            <DialogFooter className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1">
                تغيير كلمة المرور
              </Button>

              <Button
                type="button"
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => form.reset()}
              >
                تراجع
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
