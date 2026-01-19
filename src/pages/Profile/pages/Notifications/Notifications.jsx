import EmptyDataSection from "@/components/commonSections/EmptyDataSection";
import NotificationsSkeleton from "@/components/Loading/SkeletonLoading/NotificationsSkeleton";

import {
  getNotifications,
  readNotification,
} from "@/services/notificationsServices";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell } from "lucide-react";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const { mutate: markAsRead } = useMutation({
    mutationFn: readNotification,
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
    },
  });

  const handleRead = (notification) => {
    if (!notification.read_at) {
      markAsRead(notification.id);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">{t("notifications.title")}</h2>
        <p className="text-muted-foreground text-sm">
          {t("notifications.subtitle")}
        </p>
      </div>

      {isLoading ? (
        <NotificationsSkeleton />
      ) : notifications?.items?.length === 0 ? (
        <EmptyDataSection msg={t("notifications.empty")} />
      ) : (
        <div className="flex flex-col gap-4">
          {notifications?.items?.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleRead(notification)}
              className={`flex gap-2 py-2 px-4 card cursor-pointer transition
              ${
                notification.read_at
                  ? "bg-muted/30 opacity-70"
                  : "bg-primary/10 border border-primary/30"
              }
            `}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full
                ${
                  notification.read_at
                    ? "bg-white text-muted-foreground"
                    : "bg-primary text-white"
                }
              `}
              >
                <Bell />
              </div>

              <div className="flex flex-col gap-1 flex-1">
                <p className="font-bold text-xs lg:text-sm">
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
      )}
    </div>
  );
};

export default Notifications;
