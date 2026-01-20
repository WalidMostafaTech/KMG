import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Bell, MessageSquareText } from "lucide-react";
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
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/notificationsServices";
import { getUnreadCount } from "@/services/mainServices";
import { Skeleton } from "@/components/ui/skeleton";
import NotificationsSkeleton from "@/components/Loading/SkeletonLoading/NotificationsSkeleton";
import { useTranslation } from "react-i18next";
import { openModal } from "@/store/modals/modalsSlice";

const HeaderAction = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openNotifications, setOpenNotifications] = useState(false);
  const { lang } = useSelector((state) => state.language);
  const { profile, loading } = useSelector((state) => state.profile);

  const { data: notifications, isLoading } = useQuery({
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
    return new Date(dateString).toLocaleDateString("en-US", {
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

            <PopoverContent align="end" className="md:w-[500px]">
              {isLoading ? (
                <NotificationsSkeleton />
              ) : notifications?.items?.length ? (
                <div className="flex flex-col gap-2">
                  {notifications.items.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex gap-2 py-2 px-4 border-b last:border-b-0 rounded-lg bg-muted"
                    >
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-primary">
                        <Bell />
                      </div>

                      <div className="flex flex-col gap-1 flex-1">
                        <p className="font-bold text-xs">
                          {notification.title}
                        </p>
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
              ) : (
                <p className="text-center text-sm text-muted-foreground py-6">
                  {t("headerAction.noNotifications")}
                </p>
              )}

              <div className="block mt-4">
                <Link
                  to="/profile/notifications"
                  onClick={() => setOpenNotifications(false)}
                >
                  <Button className="w-full">
                    {t("headerAction.moreNotifications")}
                  </Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </>
      )}

      {/* Language Select */}
      <LanguageSwitcher />

      {loading ? (
        <Skeleton className="h-9 w-9 rounded-full" />
      ) : profile ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <UserAvatar
              name={profile?.name}
              image={profile?.image}
              className="cursor-pointer"
            />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            dir={lang === "ar" ? "rtl" : "ltr"}
            className={`w-52`}
          >
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
              {t("headerAction.profile")}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/profile/orders")}>
              <FiShoppingCart />
              {t("headerAction.orders")}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => {
                dispatch(openModal("logoutModal"));
              }}
              className="bg-red-800/50 hover:bg-red-800/30!"
            >
              <IoIosLogOut />
              {t("headerAction.logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/login">
          <Button>{t("headerAction.login")}</Button>
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
