import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const ServicesAccountCard = ({ item }) => {
  return (
    <div key={item.id} className="flex flex-col gap-4 card">
      <div className="flex items-center justify-between gap-2">
        <img
          src={item.image}
          alt="image"
          className="w-10 h-10 object-contain"
        />
        <img src={item.icon} alt="icon" className="w-10 h-10 object-contain" />
      </div>

      <p>{item.title}</p>

      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">${item.price}</p>
          {item.priceOld && (
            <p className="text-sm text-muted-foreground line-through">
              ${item.priceOld}
            </p>
          )}
        </div>

        <p className="py-1 px-4 bg-accent rounded-lg w-fit">{item.time}</p>

        <div className="flex items-center flex-wrap gap-1">
          {item.items.map((item) => (
            <p className="py-1 px-4 bg-accent rounded-lg w-fit" key={item.id}>
              {item.title}
            </p>
          ))}
        </div>
      </div>

      <Link to={`/services/accounts/checkout/${item.id}`}>
        <Button className="w-full">اشتري الان</Button>
      </Link>
    </div>
  );
};

export default ServicesAccountCard;
