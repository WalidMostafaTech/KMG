import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Form } from "@/components/ui/form";
import MainInput from "@/components/form/MainInput";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";

const Schema = z.object({
  login_data: z.string().min(6, "بيانات الدخول قصيرة"),
  password: z.string().min(6, "كلمة المرور قصيرة"),
  gift_code: z.string().optional(),
});

const PaymentModal = ({
  open,
  onClose,
  product_id,
  product_price,
  gift_code = false,
}) => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(Schema),
    defaultValues: {
      login_data: "",
      password: "",
      gift_code: "",
    },
  });

  const onSubmit = (data) => {
    navigate("/payment", {
      state: {
        product_id,
        product_price,
        login_data: data.login_data,
        password: data.password,
        ...(gift_code && { gift_code: data.gift_code }),
      },
    });

    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">بيانات الحساب</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            dir="rtl"
          >
            <MainInput
              control={form.control}
              name="login_data"
              label="بيانات الدخول"
            />

            <MainInput
              control={form.control}
              name="password"
              label="كلمة المرور"
              type="password"
            />

            {/* 👇 يظهر بس لو gift_code === true */}
            {gift_code && (
              <MainInput
                control={form.control}
                name="gift_code"
                label="كود الهدية"
              />
            )}

            <DialogFooter className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1">
                حفظ
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
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
