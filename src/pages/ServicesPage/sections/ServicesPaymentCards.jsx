import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

import { FaHeadset } from "react-icons/fa6";
import { BiShieldAlt2 } from "react-icons/bi";
import { CiCreditCard2 } from "react-icons/ci";
import { BsCurrencyDollar } from "react-icons/bs";
import { useState } from "react";

const list = [
  {
    id: 1,
    title: "دعم 7-24",
    desc: "دائما متاح",
    icon: <FaHeadset />,
  },
  {
    id: 2,
    title: "حماية مضمونة",
    desc: "سرية تامة",
    icon: <BiShieldAlt2 />,
  },
  {
    id: 3,
    title: "دفع سريع",
    desc: "دفع امن",
    icon: <CiCreditCard2 />,
  },
  {
    id: 4,
    title: "استرجاع المبلغ",
    desc: "ضمان كامل",
    icon: <BsCurrencyDollar />,
  },
];

const ServicesPaymentCards = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {list.map((item) => (
          <button
            key={item.id}
            onClick={() => setShowModal(true)}
            className="flex-1 min-w-[180px] cursor-pointer"
          >
            <div className="p-2 bg-accent rounded-2xl flex items-center gap-2 text-start">
              <span className="bg-card rounded-lg p-2">{item.icon}</span>
              <div>
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-xs">{item.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Dialog open={!!showModal} onOpenChange={() => setShowModal(false)}>
        <DialogContent>
          <VisuallyHidden>
            <DialogTitle>...</DialogTitle>
          </VisuallyHidden>

          <DialogDescription className="text-sm pt-4">
            حساب GTA V مودد + 1 مليار دولار حساب PC Enhanced كامل المميزات 1
            مليار دولار داخل اللعبة + 50+ سيارة فاخرة رانك 1000+ + جميع الأسلحة
            والملابس مفتوحة حماية TradeShield كاملة (ضمان عدم الباند) تسليم فوري
            خلال 5-10 دقائق دعم 24/7 + ضمان استرداد 100% السعر الآن: 74.99 دولار
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ServicesPaymentCards;
