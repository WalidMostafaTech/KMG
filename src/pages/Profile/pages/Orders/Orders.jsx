import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BadgeCheck, NotebookTabs, SlidersHorizontal } from "lucide-react";
import image from "@/assets/images/slider-img.png";
import { Button } from "@/components/ui/button";
import { BsChatLeftText } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Orders = () => {
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

      <div className="card flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 lg:gap-4">
          <div className="w-24 lg:w-36 aspect-square overflow-hidden rounded-2xl">
            <img
              src={image}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-bold">اسم المنتج</h3>
            <p className="text-muted-foreground text-sm">اسم المنتج</p>{" "}
            <p className="text-lg font-bold">124.99$</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Button className="w-full gap-2">
            مراسلة
            <BsChatLeftText />
          </Button>
          <div className="flex items-center gap-2">
            <Badge variant={`outline`} className="gap-2 rounded-full">
              <BadgeCheck />
              حالة الطلب
            </Badge>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-full">
                  <NotebookTabs />
                  تفاصيل الطلب
                </Button>
              </DialogTrigger>
              <DialogContent className="md:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader className={`mb-4`}>
                  <DialogTitle className={`text-center`}>
                    تفاصيل الطلب
                  </DialogTitle>
                  <DialogDescription className={`mt-2`}>
                    <img
                      src={image}
                      alt="order"
                      className="w-full h-[200px] md:h-[300px] object-cover"
                    />
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                  {Array.from({ length: 10 }).map(() => (
                    <div className="flex flex-col gap-1 card">
                      <p className="text-muted-foreground text-sm">
                        اسم الحساب:
                      </p>
                      <h3 className="font-bold">FIFA Ultimate Team Pro</h3>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
