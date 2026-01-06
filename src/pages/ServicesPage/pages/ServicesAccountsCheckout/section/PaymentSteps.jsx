import SectionTitle from "@/components/common/SectionTitle";
import { CreditCard, Package, Search } from "lucide-react";

const list = [
  {
    id: 1,
    title: "إختر عرضك",
    disc: "تصفح الاف العروض زإختر الحساب المناسب لك",
    icon: <Search />,
  },
  {
    id: 2,
    title: "إدفع بأمان",
    disc: "الدفع محمى 100% عبر نظام الضمان الامن",
    icon: <CreditCard />,
  },
  {
    id: 3,
    title: "إستلم فورا",
    disc: "أحصل على حسابك فى دقائق وإبدأ اللعب",
    icon: <Package />,
  },
];

const PaymentSteps = () => {
  return (
    <div>
      <SectionTitle title={"عملية شراء سهلة فى 3 خطوات"} />

      <div className="flex flex-wrap gap-4 lg:gap-8">
        {list.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center gap-2 card relative flex-1 min-w-[200px]"
          >
            <span className="absolute top-2 start-4 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full border">
              {index + 1}
            </span>

            <h2
              className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center
            text-4xl font-bold shadow-lg shadow-accent-foreground/20 mb-4"
            >
              {item.icon}
            </h2>

            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-sm">{item.disc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentSteps;
