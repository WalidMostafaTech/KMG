import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquareText } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
import LanguageSwitcher from "./LanguageSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { logoutAct } from "@/store/profile/profileSlice";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/notificationsServices";
import { getUnreadCount } from "@/services/mainServices";
import logoutIcon from "@/assets/icons/logout-icon.png";

const HeaderAction = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [openNotifications, setOpenNotifications] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { lang } = useSelector((state) => state.language);
  const { profile } = useSelector((state) => state.profile);

  const handleLogout = () => {
    dispatch(logoutAct());
  };

  const {
    data: notifications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    enabled: openNotifications,
  });

  const { data: unreadNotifications = 0 } = useQuery({
    queryKey: ["unread-count", "notification"],
    queryFn: () => getUnreadCount("notification"),
    enabled: !!profile,
  });

  const { data: unreadChats = 0 } = useQuery({
    queryKey: ["unread-count", "chat"],
    queryFn: () => getUnreadCount("chat"),
    enabled: !!profile,
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex items-center gap-2">
      {profile && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full relative"
            onClick={() => navigate("/chat")}
          >
            <MessageSquareText />
            <Badge count={unreadChats} />
          </Button>

          <Popover open={openNotifications} onOpenChange={setOpenNotifications}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full relative"
              >
                <Bell />
                <Badge count={unreadNotifications} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className={`md:w-[500px]`}>
              <div className="flex flex-col gap-2">
                {notifications?.items?.map((notification) => (
                  <div
                    key={notification.id}
                    className="flex gap-2 py-2 px-4 border-b last:border-b-0 rounded-lg bg-muted"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary">
                      <Bell />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                      <p className="font-bold text-xs">{notification.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(notification.notification_date)}
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
        </>
      )}

      {/* Language Select */}
      <LanguageSwitcher />

      {profile ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar name={profile?.name} image={profile?.image} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" dir={lang === "ar" ? "rtl" : "ltr"}>
            <DropdownMenuLabel className="flex items-center gap-2">
              <UserAvatar name={profile?.name} image={profile?.image} />
              <h3 className="font-semibold">{profile?.name}</h3>
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

            <Dialog open={showLogout} onOpenChange={setShowLogout}>
              <DialogTrigger asChild>
                <button className="bg-red-800/50 hover:bg-red-800/30 transition text-white py-1 px-2 w-full rounded flex items-center gap-2">
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
                  <Button
                    type="submit"
                    className="flex-1"
                    onClick={handleLogout}
                  >
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

const Badge = ({ count }) => {
  if (!count || count == 0) return null;

  return (
    <span
      className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1
      text-[10px] rounded-full bg-red-500 text-white flex items-center justify-center"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
};
