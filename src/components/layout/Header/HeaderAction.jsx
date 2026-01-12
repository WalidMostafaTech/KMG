import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaRegUser } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import UserAvatar from "@/components/common/UserAvatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useSelector } from "react-redux";

const notifications = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  title:
    "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.",
  description: "4 minutes ago",
  is_read: index % 2 === 0 ? true : false,
}));

const HeaderAction = () => {
  const user = "walid mostafa";
  const navigate = useNavigate();
  const [openNotifications, setOpenNotifications] = useState(false);
  const { lang } = useSelector((state) => state.language);

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" className="rounded-full lg:hidden">
        <Search />
      </Button>

      <Popover open={openNotifications} onOpenChange={setOpenNotifications}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className={`md:w-[500px]`}>
          <div className="flex flex-col gap-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-center gap-2 py-1 px-2 border-b last:border-b-0 card bg-muted"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary">
                  <Bell />
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <p className="font-bold text-xs">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="block mt-4">
            <Link
              to="/profile/notifications"
              onClick={() => setOpenNotifications(false)}
            >
              <Button className={`w-full`}>المزيد من التنبيهات</Button>
            </Link>
          </div>
        </PopoverContent>
      </Popover>

      {/* Language Select */}
      <LanguageSwitcher />

      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar name={user} image={user} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" dir={lang === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuLabel className="flex items-center gap-2">
              <UserAvatar name={user} image={user} />
              <h3 className="font-semibold">{user}</h3>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate("/profile")}
              className="justify-start"
            >
              <FaRegUser />
              الملف الشخصي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/profile/orders")}>
              <FiShoppingCart />
              الطلبات
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="bg-red-500/10">
              <IoIosLogOut />
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button>تسجيل الدخول</Button>
        </Link>
      )}
    </div>
  );
};

export default HeaderAction;
