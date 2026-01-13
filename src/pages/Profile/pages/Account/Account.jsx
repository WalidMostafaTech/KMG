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
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "@/services/authServices";
import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import FormError from "@/components/form/FormError";
import { addProfile } from "@/store/profile/profileSlice";

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
  const { profile } = useSelector((state) => state.profile);
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [avatar, setAvatar] = useState(profile?.image || null);

  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

  /* ---------------- user data ---------------- */
  /* ---------------- form ---------------- */
  const form = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    },
    mode: "onChange",
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      dispatch(addProfile(data));

      alert("تم تحديث البيانات بنجاح");
      setErrorMsg("");
      // toast.success("تم تحديث البيانات بنجاح");
    },
    onError: (error) => {
      setErrorMsg(error?.response?.data?.message);
      // toast.error(error?.response?.data?.message || "حدث خطأ");
    },
  });

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);

    if (fileInputRef.current?.files?.[0]) {
      formData.append("image", fileInputRef.current.files[0]);
    }

    updateProfileMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      {/* ===== Header Card ===== */}
      <div className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-2">
          <UserAvatar name={profile?.name} image={profile?.image} size={80} />

          <h2 className="text-2xl font-bold capitalize">{profile?.name}</h2>
        </div>

        <Button className="sm:w-[200px] gap-2">
          مراسلة
          <BsChatLeftText />
        </Button>
      </div>

      {/* ===== Form Card ===== */}
      <div
        className="card"
        style={{
          pointerEvents: updateProfileMutation.isPending ? "none" : "auto",
        }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div
              className="absolute bottom-0 start-0 w-8 h-8 bg-primary rounded-full z-10 cursor-pointer flex items-center justify-center"
              onClick={() => fileInputRef.current?.click()}
            >
              <SquarePen size={20} />
            </div>
            <UserAvatar
              name={profile?.name}
              image={avatar} // هنا بدل profile?.image
              size={100}
            />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    setAvatar(reader.result); // هنعرض الصورة مباشرة
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
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
              <Button type="submit" disabled={updateProfileMutation.isPending}>
                {updateProfileMutation.isPending
                  ? "جاري الحفظ..."
                  : "حفظ التغييرات"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full"
                onClick={() => setOpenChangePassword(true)}
              >
                تغيير كلمة المرور
              </Button>
            </div>

            {errorMsg && <FormError errorMsg={errorMsg} />}
          </form>
        </Form>
      </div>

      <ChangePasswordModal
        open={openChangePassword}
        onClose={() => setOpenChangePassword(false)}
      />
    </div>
  );
};

export default Account;
