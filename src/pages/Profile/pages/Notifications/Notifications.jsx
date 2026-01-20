import NotificationCard from "@/components/cards/NotificationCard";
import EmptyDataSection from "@/components/commonSections/EmptyDataSection";
import NotificationsSkeleton from "@/components/Loading/SkeletonLoading/NotificationsSkeleton";

import { getNotifications } from "@/services/notificationsServices";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

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
            <NotificationCard
              key={notification.id}
              notification={notification}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
