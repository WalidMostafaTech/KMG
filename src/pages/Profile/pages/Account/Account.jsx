import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import UserAvatar from "@/components/common/UserAvatar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import MainInput from "@/components/form/MainInput";

import { BsChatLeftText } from "react-icons/bs";
import { User, Mail, SquarePen } from "lucide-react";
import PhoneInputField from "@/components/form/PhoneInputField";
import { isValidPhoneNumber } from "react-phone-number-input";
import ChangePasswordModal from "./sections/ChangePasswordModal";

/* ---------------- schema ---------------- */
const accountSchema = z.object({
  name: z.string().min(2, "الاسم يجب أن يكون حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || isValidPhoneNumber(val), "رقم الهاتف غير صالح"),
});

const Account = () => {
  /* ---------------- user data ---------------- */
  const user = {
    name: "walid mostafa",
    email: "2Ko2M@example.com",
    image: null,
    phone: "",
  };

  /* ---------------- form ---------------- */
  const form = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    },
    mode: "onChange",
  });

  const onSubmit = (values) => {
    console.log("Form Values:", values);
    // هنا تعمل API call
  };

  return (
    <div className="space-y-6">
      {/* ===== Header Card ===== */}
      <div className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <UserAvatar name={user.name} image={user.image} size={80} />

          <h2 className="text-2xl font-bold capitalize">{user.name}</h2>
        </div>

        <Button className="sm:w-[200px] gap-2">
          مراسلة
          <BsChatLeftText />
        </Button>
      </div>

      {/* ===== Form Card ===== */}
      <div className="card">
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="absolute bottom-0 start-0 w-8 h-8 bg-primary rounded-full z-10 cursor-pointer flex items-center justify-center">
              <SquarePen size={20} />
            </div>
            <UserAvatar name={user.name} image={user.image} size={100} />
          </div>
          <h3 className="text-2xl font-bold">البيانات الشخصية</h3>
        </div>

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

            <PhoneInputField
              control={form.control}
              name="phone"
              label="رقم الهاتف"
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <Button type="submit">حفظ التغييرات</Button>

              <ChangePasswordModal />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Account;
