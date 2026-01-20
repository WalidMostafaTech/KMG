import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import NotificationsSkeleton from "@/components/Loading/SkeletonLoading/NotificationsSkeleton";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/services/notificationsServices";
import { getUnreadCount } from "@/services/mainServices";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import NotificationsBadge from "@/components/common/NotificationsBadge";
import { Link } from "react-router";

const NotificationsPopUp = () => {
  const [openNotifications, setOpenNotifications] = useState(false);
  const { profile } = useSelector((state) => state.profile);
  const { t } = useTranslation();

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <Popover open={openNotifications} onOpenChange={setOpenNotifications}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Bell />
          <NotificationsBadge count={unreadNotifications} />
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
        ) : (
          <p className="text-center text-sm text-muted-foreground py-6">
            {t("notificationsPopUp.noNotifications")}
          </p>
        )}

        <div className="block mt-4">
          <Link
            to="/profile/notifications"
            onClick={() => setOpenNotifications(false)}
          >
            <Button className="w-full">
              {t("notificationsPopUp.moreNotifications")}
            </Button>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopUp;
