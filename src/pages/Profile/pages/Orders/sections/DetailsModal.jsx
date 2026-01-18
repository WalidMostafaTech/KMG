import DetailsModalSkeleton from "@/components/Loading/SkeletonLoading/DetailsModalSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getSingleOrder } from "@/services/paymentsServices";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const DetailsModal = ({ order_id, open, onClose }) => {
  const { lang } = useSelector((state) => state.language);

  const { data: orderDetails, isLoading } = useQuery({
    queryKey: ["order-details" + order_id],
    queryFn: () => getSingleOrder(order_id),
    enabled: open,
  });

  const list = [
    {
      id: 1,
      service: "accounts",
      items: [
        {
          id: 1,
          title: "اسم الحساب:",
          content: orderDetails?.product?.title,
        },
        {
          id: 2,
          title: "المنصة:",
          content: orderDetails?.product?.platforms
            .map((item) => item.name)
            .join(", "),
        },
        {
          id: 3,
          title: "المنطقة:",
          content: orderDetails?.product?.country_name,
        },
        {
          id: 4,
          title: "البريد الحساب:",
          content: orderDetails?.account_email,
        },
        {
          id: 5,
          title: "كلمة مرور الحساب:",
          content: orderDetails?.account_password,
        },
        {
          id: 6,
          title: "البريد الالكترونى:",
          content: orderDetails?.email,
        },
        {
          id: 7,
          title: "كلمة المرور:",
          content: orderDetails?.password,
        },
        {
          id: 8,
          title: "ملاحظة:",
          content: orderDetails?.note,
        },
      ],
    },
    {
      id: 2,
      service: "subscriptions",
      items: [
        {
          id: 1,
          title: "اسم الاشتراك:",
          content: orderDetails?.product?.title,
        },
        {
          id: 2,
          title: "بيانات الدخول:",
          content: orderDetails?.login_data,
        },
        {
          id: 3,
          title: "كلمة المرور:",
          content: orderDetails?.password,
        },
        {
          id: 4,
          title: "ملاحظة:",
          content: orderDetails?.note,
        },
      ],
    },
    {
      id: 3,
      service: "top_up",
      items: [
        {
          id: 1,
          title: "عدد العملات:",
          content: orderDetails?.product?.price,
        },
        {
          id: 2,
          title: "بيانات الدخول:",
          content: orderDetails?.login_data,
        },
        {
          id: 3,
          title: "كلمة المرور:",
          content: orderDetails?.password,
        },
        {
          id: 4,
          title: "ملاحظة:",
          content: orderDetails?.note,
        },
      ],
    },
    {
      id: 4,
      service: "gift_cards",
      items: [
        {
          id: 1,
          title: "قيمة الكارت:",
          content: orderDetails?.product?.price,
        },
        {
          id: 2,
          title: "الكود:",
          content: orderDetails?.gift_code,
        },
        {
          id: 3,
          title: "ملاحظة:",
          content: orderDetails?.note,
        },
      ],
    },
    {
      id: 5,
      service: "add_game_to_account",
      items: [
        {
          id: 1,
          title: "اسم اللعبة:",
          content: orderDetails?.product?.title,
        },
        {
          id: 2,
          title: "بيانات الدخول:",
          content: orderDetails?.login_data,
        },
        {
          id: 3,
          title: "كلمة المرور:",
          content: orderDetails?.password,
        },
        {
          id: 4,
          title: "ملاحظة:",
          content: orderDetails?.note,
        },
      ],
    },
  ];

  const order = list.find((order) => order.service === orderDetails?.service);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-3xl">
        <ScrollArea
          className="max-h-[90vh] px-2"
          dir={lang === "ar" ? "rtl" : "ltr"}
        >
          {isLoading ? (
            <DetailsModalSkeleton />
          ) : (
            <>
              <DialogHeader className={`mb-4`}>
                <DialogTitle className={`text-center`}>
                  تفاصيل الطلب
                </DialogTitle>
                <DialogDescription className={`mt-2`}>
                  <img
                    src={orderDetails?.product?.offer_image}
                    alt="order"
                    className="w-full h-[200px] md:h-[300px] object-cover rounded-xl"
                  />
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-col gap-3">
                {order?.items?.length ? (
                  order.items
                    .filter((item) => item.content)
                    .map((item) => (
                      <div>
                        <h3 className="text-muted-foreground font-bold mb-1">
                          {item.title}
                        </h3>

                        <div
                          className="card"
                          dangerouslySetInnerHTML={{ __html: item?.content }}
                        />
                      </div>
                    ))
                ) : (
                  <p className="text-center text-muted-foreground">
                    لا توجد تفاصيل متاحة
                  </p>
                )}
              </div>
            </>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
