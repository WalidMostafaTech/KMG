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
import { useState } from "react";
import MyOrdersCardSkeleton from "@/components/Loading/SkeletonLoading/MyOrdersCardSkeleton";
import EmptyDataSection from "@/components/commonSections/EmptyDataSection";
import MainPagination from "@/components/common/MainPagination";
import { useSearchParams } from "react-router";

const Orders = () => {
  const [status, setStatus] = useState("all");

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const { data: orders, isLoading } = useQuery({
    queryKey: ["my_orders", status, currentPage],
    queryFn: getOrders,
  });

  const applyPage = (page) => {
    setSearchParams({ page });
  };

  const list = [
    {
      id: 1,
      label: "إجمالى الطلبات:",
      value: orders?.extra?.total_count,
    },
    {
      id: 2,
      label: "قيد المراجعة:",
      value: orders?.extra?.status_counts?.pending,
    },
    {
      id: 3,
      label: "قيد التنفيذ:",
      value: orders?.extra?.status_counts?.processing,
    },
    {
      id: 4,
      label: "تم التوصيل:",
      value: orders?.extra?.status_counts?.completed,
    },
    {
      id: 5,
      label: "ملغاه:",
      value: orders?.extra?.status_counts?.cancelled,
    },
  ];

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

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="rounded-full bg-input w-full">
              <SelectValue placeholder="اختر الحالة" />
            </SelectTrigger>

            <SelectContent className="bg-input rounded-xl">
              <SelectItem value="all">كل الحالات</SelectItem>
              <SelectItem value="pending">قيد المراجعة</SelectItem>
              <SelectItem value="processing">قيد التنفيذ</SelectItem>
              <SelectItem value="completed">تم التوصيل</SelectItem>
              <SelectItem value="cancelled">ملغاة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ul className="flex flex-wrap items-center gap-4 text-sm">
          {list.map((item) => (
            <li key={item.id} className="flex items-center gap-1">
              <p className="text-muted-foreground">{item.label}</p>
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <MyOrdersCardSkeleton key={idx} />
          ))
        ) : orders?.items?.length === 0 ? (
          <EmptyDataSection msg="لا يوجد طلبات" />
        ) : (
          orders?.items?.map((order) => (
            <MyOrdersCard key={order.id} order={order} />
          ))
        )}
      </div>

      <MainPagination
        totalPages={orders?.meta?.last_page || 1}
        currentPage={currentPage}
        onPageChange={applyPage}
      />
    </div>
  );
};

export default Orders;
