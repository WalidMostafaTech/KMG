import image from "@/assets/images/slider-img.png";
import { Link, useParams } from "react-router";

import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
import ServicesAccountCard from "@/components/cards/ServicesAccountCard";

const list = [
  {
    id: 1,
    title: "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
    price: 49,
    priceOld: 99,
    time: "5-10 دقائق",
    items: [
      {
        id: 1,
        title: "PS3",
      },
      {
        id: 2,
        title: "PS4",
      },
      {
        id: 3,
        title: "PS5",
      },
    ],
  },
  {
    id: 2,
    title: "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
    price: 49,
    priceOld: null,
    time: "5-10 دقائق",
    items: [
      {
        id: 1,
        title: "PS3",
      },
      {
        id: 2,
        title: "PS4",
      },
      {
        id: 3,
        title: "PS5",
      },
    ],
  },
  {
    id: 3,
    title: "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
    price: 49,
    priceOld: 99,
    time: "5-10 دقائق",
    items: [
      {
        id: 1,
        title: "PS3",
      },
      {
        id: 2,
        title: "PS4",
      },
      {
        id: 3,
        title: "PS5",
      },
    ],
  },
];

const ServicesAccountsCheckout = () => {
  const { id } = useParams();

  return (
    <section className="container py-6 lg:py-10 space-y-8 lg:space-y-16">
      <div className="card lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <div className="h-[300px] md:h-[400px] bg-accent overflow-hidden rounded-2xl">
          <img src={image} alt="image" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col gap-4 lg:gap-6">
          <h2 className="text-lg lg:text-2xl font-bold">
            حساب GTA 5 مودد - 1 بليون +50 سيارة مودد
          </h2>

          <div>
            <p className="text-sm border rounded-full w-fit px-4 py-2">
              توصيل فورى
            </p>
          </div>

          <div className="p-4 bg-accent rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <p className="text-4xl font-bold">$84</p>
              <p className="text-muted-foreground line-through">$100</p>
            </div>

            <Link to={`/services/accounts/checkout/${id}`}>
              <Button className="w-full">اشتري الان</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-accent rounded-2xl flex gap-2">
              <span className="bg-card rounded-lg p-2">
                <DollarSign />
              </span>

              <div>
                <p className="font-bold">استرجاع المبلغ</p>
                <p className="text-sm">ضمان كامل</p>
              </div>
            </div>
            <div className="p-4 bg-accent rounded-2xl flex gap-2">
              <span className="bg-card rounded-lg p-2">
                <DollarSign />
              </span>

              <div>
                <p className="font-bold">استرجاع المبلغ</p>
                <p className="text-sm">ضمان كامل</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card lg:p-8 space-y-4 lg:space-y-8">
        <h3>وصف العرض</h3>

        <div className="p-4 bg-accent rounded-2xl">
          حساب GTA 5 مودد – 1 مليون + 50+ سيارة حساب PC Enhanced جاهز للعب فورًا
          أكثر من 1 مليون دولار داخل اللعبة 50+ سيارة مودد نادرة ومميزة رانك
          عالي + جميع الأسلحة مفتوحة حماية TradeShield كاملة ضد الباند تسليم
          فوري خلال دقايق بعد الدفع دعم 24/7 لو في أي استفسار اشترِ الآن وابدأ
          اللعب بقوة كاملة! (تحت النص حطي 4 خيارات صغيرة زي في الصورة: حساب GTA
          5 مودد – 500 مليون | حساب GTA 5 مودد – 1 مليار | حساب GTA 5 مودد – 2
          مليار | حساب GTA 5 مودد – 5 مليار)
        </div>

        <div className="p-4 bg-accent rounded-2xl">
          حساب GTA 5 مودد – 1 مليون + 50+ سيارة حساب PC Enhanced جاهز للعب فورًا
          أكثر من 1 مليون دولار داخل اللعبة 50+ سيارة مودد نادرة ومميزة رانك
          عالي + جميع الأسلحة مفتوحة حماية TradeShield كاملة ضد الباند تسليم
          فوري خلال دقايق بعد الدفع دعم 24/7 لو في أي استفسار اشترِ الآن وابدأ
          اللعب بقوة كاملة! (تحت النص حطي 4 خيارات صغيرة زي في الصورة: حساب GTA
          5 مودد – 500 مليون | حساب GTA 5 مودد – 1 مليار | حساب GTA 5 مودد – 2
          مليار | حساب GTA 5 مودد – 5 مليار)
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 mt-6 lg:mt-10">
        {list.map((item) => (
          <ServicesAccountCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ServicesAccountsCheckout;
