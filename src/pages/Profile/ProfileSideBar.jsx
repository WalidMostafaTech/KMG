import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "react-router";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";

const ProfileSideBar = () => {
  const sideContent = (
    <div className="flex flex-col gap-2">
      <NavLink to={"/profile"} className="sideBarLink">
        <FaRegUser />
        الملف الشخصى
      </NavLink>

      <NavLink to={"/cart"} className="sideBarLink">
        <FiShoppingCart />
        الطلبات
      </NavLink>
    </div>
  );

  return (
    <>
      <aside>{sideContent}</aside>

      <Sheet>
        <SheetTrigger className={``}>Open</SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileSideBar;
