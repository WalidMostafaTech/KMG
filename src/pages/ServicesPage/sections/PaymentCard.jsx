import { Button } from "@/components/ui/button";

import ServicesPaymentCards from "@/components/commonSections/ServicesPaymentCards";

const PaymentCard = ({ currentOffer, location }) => {
  if (!currentOffer) return null;

  return (
    <div className="flex flex-col gap-4 card w-full md:max-w-xs h-fit">
      <div>
        <h3 className="text-lg font-bold mb-2">{currentOffer.title}</h3>

        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex justify-between">
            <p>المنطقة</p>
            <span>{location.region || "غير محدد"}</span>
          </li>
          <li className="flex justify-between">
            <p>المنصة</p>
            <span>{location.platform || "غير محدد"}</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">ملخص الطلب</h3>
        <ul className="flex flex-col divide-y-2 text-sm">
          <li className="flex justify-between gap-2 py-1 text-muted-foreground">
            <p>وقت التسليم</p> <span>5-1 دقائق</span>
          </li>
          <li className="flex justify-between gap-2 py-1 text-muted-foreground">
            <p>السعر الأصلى</p> <span>$24.99</span>
          </li>
          <li className="flex justify-between gap-2 py-1">
            <p>الاجمالى</p> <span>$66.99</span>
          </li>
        </ul>
      </div>

      <Button>اشتري الان</Button>

      <ServicesPaymentCards />
    </div>
  );
};

export default PaymentCard;
