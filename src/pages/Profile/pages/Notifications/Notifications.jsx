import { Bell } from "lucide-react";
import React from "react";

const Notifications = () => {
  const notifications = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    title:
      "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة.",
    description: "4 minutes ago",
    is_read: index % 2 === 0 ? true : false,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">الاشعارات</h2>
        <p className="text-muted-foreground text-sm">
          اطلع على الاشعارات الخاصة بك
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center gap-2 py-2 px-4 border-b last:border-b-0 card bg-muted"
          >
            <div className="flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white text-primary">
              <Bell />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <p className="font-bold text-xs lg:text-sm">{notification.title}</p>
              <p className="text-xs lg:text-sm text-muted-foreground">
                {notification.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
