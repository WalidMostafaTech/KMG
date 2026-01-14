import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const ServicesAccountCard = ({ item }) => {
  return (
    <div key={item.id} className="flex flex-col gap-4 card">
      <div className="flex items-center justify-between gap-2">
        <img
          src={item.offer_image}
          alt="offer-image"
          className="w-10 h-10 object-contain"
        />
        <img
          src={item.game_icon}
          alt="game-icon"
          className="w-10 h-10 object-contain"
        />
      </div>

      <p>{item.title}</p>

      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">${item.price_after}</p>
          {item.price_before && (
            <p className="text-sm text-muted-foreground line-through">
              ${item.price_before}
            </p>
          )}
        </div>

        <p className="py-1 px-4 bg-accent rounded-lg w-fit">
          {item.duration_minutes}
        </p>

        <div className="flex items-center flex-wrap gap-1">
          {item?.platforms?.map((item) => (
            <p className="py-1 px-4 bg-accent rounded-lg w-fit" key={item.id}>
              {item.name}
            </p>
          ))}
        </div>
      </div>

      <Link to={`/games/accounts/details/${item.id}`}>
        <Button className="w-full">اشتري الان</Button>
      </Link>
    </div>
  );
};

export default ServicesAccountCard;
