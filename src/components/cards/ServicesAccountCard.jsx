import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const ServicesAccountCard = ({ item }) => {
  const { t } = useTranslation();

  return (
    <div key={item.id} className="flex flex-col gap-4 card">
      <div className="flex items-center justify-between gap-2">
        <img
          loading="lazy"
          src={item.country_icon}
          alt="offer-image"
          className="w-10 h-10 object-contain"
        />
        <img
          loading="lazy"
          src={item.game_icon}
          alt="game-icon"
          className="w-10 h-10 object-contain"
        />
      </div>

      <h3 className="font-semibold line-clamp-2">{item.title}</h3>

      <div className="flex flex-col gap-1 text-sm">
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold">
            {item.price} {item.currency}
          </p>
        </div>

        {item.instant_delivery ? (
          <p className="py-1 px-4 bg-accent rounded-lg w-fit">
            {t("ServicesAccountCard.instantDelivery")}
          </p>
        ) : item.from_time && item.to_time ? (
          <p className="py-1 px-4 bg-accent rounded-lg w-fit">
            {item.from_time} - {item.to_time} {t("ServicesAccountCard.minutes")}
          </p>
        ) : null}

        <div className="flex items-center flex-wrap gap-1">
          {item?.platforms?.map((platform) => (
            <p
              key={platform.id}
              className="py-1 px-4 bg-accent rounded-lg w-fit"
            >
              {platform.name}
            </p>
          ))}
        </div>
      </div>

      <Link to={`/games/accounts/details/${item.slug}`} className="mt-auto">
        <Button className="w-full">{t("ServicesAccountCard.buyNow")}</Button>
      </Link>
    </div>
  );
};

export default ServicesAccountCard;
