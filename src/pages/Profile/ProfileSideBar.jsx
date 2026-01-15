import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { NavLink } from "react-router";
import { FaRegBell, FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { Button } from "@/components/ui/button";
import logo from "@/assets/images/logo.png";
import logoutIcon from "@/assets/icons/logout-icon.png";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch, useSelector } from "react-redux";
import { Logs } from "lucide-react";
import { useState } from "react";
import { logoutAct } from "@/store/profile/profileSlice";

const ProfileSideBar = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { lang } = useSelector((state) => state.language);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAct());
  };

  const sideContent = (
    <div className="flex flex-col gap-2">
      <NavLink
        to={"/profile"}
        end
        className="sideBarLink"
        onClick={() => setOpenSideBar(false)}
      >
        <FaRegUser />
        الملف الشخصى
      </NavLink>

      <NavLink
        to={"/profile/orders"}
        end
        className="sideBarLink"
        onClick={() => setOpenSideBar(false)}
      >
        <FiShoppingCart />
        الطلبات
      </NavLink>

      <NavLink
        to={"/profile/notifications"}
        end
        className="sideBarLink"
        onClick={() => setOpenSideBar(false)}
      >
        <FaRegBell />
        الاشعارات
      </NavLink>

      <Dialog open={showLogout} onOpenChange={setShowLogout}>
        <DialogTrigger asChild>
          <button className="rounded-full sideBarLink">
            <IoIosLogOut />
            تسجيل الخروج
          </button>
        </DialogTrigger>

        <DialogContent showCloseButton={false} className="sm:max-w-md">
          <DialogHeader className="text-center">
            <DialogDescription>
              <img src={logoutIcon} alt="logout" className="mx-auto" />
            </DialogDescription>
            <DialogTitle className="text-center">
              هل أنت متأكد أنك تريد تسجيل الخروج؟
            </DialogTitle>
          </DialogHeader>

          <DialogFooter className="flex gap-3 pt-2">
            <Button type="submit" className="flex-1" onClick={handleLogout}>
              تسجيل الخروج
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-full"
              onClick={() => setShowLogout(false)}
            >
              تراجع
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block bg-card w-xs p-6 border-e">
        <div className="sticky top-28">{sideContent}</div>
      </aside>

      <Sheet open={openSideBar} onOpenChange={setOpenSideBar}>
        <SheetTrigger asChild className="lg:hidden w-fit mt-4 ms-4">
          <Button>
            <Logs />
            القائمة
          </Button>
        </SheetTrigger>

        <SheetContent side={lang === "ar" ? "right" : "left"}>
          {/* Accessible but hidden */}
          <SheetTitle className={`flex items-center justify-center`}>
            <img src={logo} alt="logo" className="w-20 h-20 object-contain" />
          </SheetTitle>
          <VisuallyHidden>
            <SheetDescription>روابط حساب المستخدم</SheetDescription>
          </VisuallyHidden>

          <div className="p-4">{sideContent}</div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSideBar;
