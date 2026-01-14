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

const DetailsModal = ({ order_id, open, onClose }) => {
  const {
    data: orderDetails,
    isLoading,
    isError,
  } = useQuery({
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
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 2,
          title: "المنصة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 3,
          title: "المنطقة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 4,
          title: "البريد الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 5,
          title: "كلمة مرور الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "البريد الالكترونى:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "كلمة المرور:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "ملاحظة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
      ],
    },
    {
      id: 2,
      service: "subscriptions",
      items: [
        {
          id: 1,
          title: "اسم الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 2,
          title: "المنصة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 3,
          title: "المنطقة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 4,
          title: "البريد الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 5,
          title: "كلمة مرور الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "البريد الالكترونى:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "كلمة المرور:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "ملاحظة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
      ],
    },
    {
      id: 3,
      service: "top_up",
      items: [
        {
          id: 1,
          title: "اسم الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 2,
          title: "المنصة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 3,
          title: "المنطقة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 4,
          title: "البريد الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 5,
          title: "كلمة مرور الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "البريد الالكترونى:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "كلمة المرور:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "ملاحظة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
      ],
    },
    {
      id: 4,
      service: "gift_cards",
      items: [
        {
          id: 1,
          title: "اسم الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 2,
          title: "المنصة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 3,
          title: "المنطقة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 4,
          title: "البريد الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 5,
          title: "كلمة مرور الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "البريد الالكترونى:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "كلمة المرور:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "ملاحظة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
      ],
    },
    {
      id: 5,
      service: "add_game_to_account",
      items: [
        {
          id: 1,
          title: "اسم الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 2,
          title: "المنصة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 3,
          title: "المنطقة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 4,
          title: "البريد الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 5,
          title: "كلمة مرور الحساب:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "البريد الالكترونى:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "كلمة المرور:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
        {
          id: 6,
          title: "ملاحظة:",
          content:
            "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
        },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="md:max-w-3xl">
        <ScrollArea className="h-[90vh] px-2">
          <DialogHeader className={`mb-4`}>
            <DialogTitle className={`text-center`}>تفاصيل الطلب</DialogTitle>
            <DialogDescription className={`mt-2`}>
              <img
                src={orderDetails?.product?.offer_image}
                alt="order"
                className="w-full h-[200px] md:h-[300px] object-cover rounded-xl"
              />
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-2">
            {Array.from({ length: 10 }).map(() => (
              <div className="flex flex-col gap-1 card">
                <p className="text-muted-foreground text-sm">اسم الحساب:</p>
                <h3 className="font-bold">FIFA Ultimate Team Pro</h3>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsModal;
