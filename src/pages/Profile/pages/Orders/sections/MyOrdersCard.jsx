import { Button } from "@/components/ui/button";
import { BsChatLeftText } from "react-icons/bs";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, NotebookTabs } from "lucide-react";
import { useState } from "react";
import DetailsModal from "./DetailsModal";

const MyOrdersCard = ({ order }) => {
  const [open, setOpen] = useState(false);



  return (
    <div className="card flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 lg:gap-4">
        <div className="w-24 lg:w-36 aspect-square overflow-hidden rounded-2xl">
          <img
            src={order?.product?.game_icon}
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-2 max-w-sm">
          <h3 className="text-lg font-bold">{order?.product?.title}</h3>
          <p className="text-muted-foreground text-sm">
            رقم الطلب: {order.order_code}
          </p>
          <p className="text-lg font-bold">${order?.product?.price}</p>
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
            {order.status}
          </Badge>

          <Button onClick={() => setOpen(true)} variant="outline" className="gap-2 rounded-full">
            <NotebookTabs />
            تفاصيل الطلب
          </Button>

          <DetailsModal
            open={open}
            onClose={() => setOpen(false)}
            order_id={order.id}
          />
        </div>
      </div>
    </div>
  );
};

export default MyOrdersCard;
