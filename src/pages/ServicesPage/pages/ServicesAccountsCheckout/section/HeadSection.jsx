import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router";
import image from "@/assets/images/slider-img.png";

import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

const HeadSection = () => {
  return (
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

          <Link to={`/services/accounts/checkout`}>
            <Button className="w-full">اشتري الان</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map(() => (
            <Dialog>
              <DialogTrigger>
                <div className="p-2 bg-accent rounded-2xl flex items-start gap-2 cursor-pointer">
                  <span className="bg-card rounded-lg p-2">
                    <DollarSign size={20} />
                  </span>

                  <div>
                    <p className="font-bold text-sm">استرجاع المبلغ</p>
                    <p className="text-xs">ضمان كامل</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent>
                <p className="text-sm pt-4">
                  حساب GTA V مودد + 1 مليار دولار حساب PC Enhanced كامل المميزات
                  1 مليار دولار داخل اللعبة + 50+ سيارة فاخرة رانك 1000+ + جميع
                  الأسلحة والملابس مفتوحة حماية TradeShield كاملة (ضمان عدم
                  الباند) تسليم فوري خلال 5-10 دقائق دعم 24/7 + ضمان استرداد
                  100% السعر الآن: 74.99 دولار (بدل 99.99 دولار)
                </p>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeadSection;
