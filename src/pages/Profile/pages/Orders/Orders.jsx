import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";

import { getOrders } from "@/services/paymentsServices";
import { useQuery } from "@tanstack/react-query";
import MyOrdersCard from "@/pages/Profile/pages/Orders/sections/MyOrdersCard";

const Orders = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my_orders"],
    queryFn: getOrders,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">الطلبات المشتراة</h2>
        <p className="text-muted-foreground text-sm">
          تتبع طلباتك وتفاصيل مشترياتك
        </p>
      </div>

      <div className="card flex flex-col gap-4">
        <div className="flex items-center gap-2 sm:w-fit">
          <div className="flex items-center gap-2 min-w-fit text-sm">
            <SlidersHorizontal size={20} />
            تصفية حسب:
          </div>

          <Select defaultValue="all">
            <SelectTrigger className="rounded-full bg-input w-full">
              <SelectValue placeholder="اختر الحالة" />
            </SelectTrigger>
            <SelectContent className="bg-input rounded-xl">
              <SelectItem value="all">كل الحالات</SelectItem>
              <SelectItem value="all2">كل الحالات2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ul className="flex flex-wrap items-center gap-4 text-sm">
          <li className="flex items-center gap-1">
            <p className="text-muted-foreground">إجمالى الطلبات:</p>
            <span>8</span>
          </li>
          <li className="flex items-center gap-1">
            <p className="text-muted-foreground">إجمالى الطلبات:</p>
            <span>8</span>
          </li>
          <li className="flex items-center gap-1">
            <p className="text-muted-foreground">إجمالى الطلبات:</p>
            <span>8</span>
          </li>
          <li className="flex items-center gap-1">
            <p className="text-muted-foreground">إجمالى الطلبات:</p>
            <span>8</span>
          </li>
          <li className="flex items-center gap-1">
            <p className="text-muted-foreground">إجمالى الطلبات:</p>
            <span>8</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        {orders?.items?.map((order) => (
          <MyOrdersCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default Orders;
