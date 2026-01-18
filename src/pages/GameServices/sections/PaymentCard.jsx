import { Button } from "@/components/ui/button";
import ServicesPaymentCards from "@/components/commonSections/ServicesPaymentCards";
import PaymentModal from "@/components/commonSections/PaymentModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import RequiredLoginModal from "@/components/modals/RequiredLoginModal";

const PaymentCard = ({ currentOffer }) => {
  const [open, setOpen] = useState({
    paymentModal: false,
    loginModal: false,
  });

  const { profile } = useSelector((state) => state.profile);

  const handlePayment = () => {
    if (profile) {
      setOpen({ ...open, paymentModal: true });
    } else {
      setOpen({ ...open, loginModal: true });
    }
  };

  if (!currentOffer) return null;

  return (
    <div className="flex flex-col gap-4 card w-full md:max-w-xs h-fit">
      <div>
        <h3 className="text-lg font-bold mb-2">{currentOffer.name}</h3>

        <ul className="flex flex-col gap-2 text-sm">
          <li className="flex justify-between">
            <p>المنطقة</p>
            <span>{currentOffer.country_name || "غير محدد"}</span>
          </li>
          <li className="flex justify-between">
            <p>المنصة</p>
            <span>
              {currentOffer.platforms.map((item) => item.name).join(", ") ||
                "غير محدد"}
            </span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-2">ملخص الطلب</h3>
        <ul className="flex flex-col divide-y-2 text-sm">
          <li className="flex justify-between gap-2 py-1 text-muted-foreground">
            <p>وقت التسليم</p>{" "}
            <span>
              {currentOffer.from_time} - {currentOffer.to_time} دقايق
            </span>
          </li>

          <li className="flex justify-between gap-2 py-1">
            <p>السعر الاجمالى</p> <span>{currentOffer.price} $</span>
          </li>
        </ul>
      </div>

      <Button onClick={handlePayment}>اشتري الان</Button>

      <ServicesPaymentCards />

      <PaymentModal
        open={open.paymentModal}
        onClose={() => setOpen({ ...open, paymentModal: false })}
        product_id={currentOffer.id}
        product_price={currentOffer.price}
      />

      <RequiredLoginModal
        open={open.loginModal}
        onClose={() => setOpen({ ...open, loginModal: false })}
      />
    </div>
  );
};

export default PaymentCard;
