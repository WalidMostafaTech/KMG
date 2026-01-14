import { getProductsByGameAndService } from "@/services/serviceServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import GamesNav from "@/components/commonSections/GamesNav";
import Accounts from "./pages/Accounts/Accounts";
import ProductsPage from "./pages/ProductsPage/ProductsPage";

const GameServices = () => {
  const { service, id } = useParams();

  const {
    data: gameServicesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["game-services" + service + id],
    queryFn: () =>
      getProductsByGameAndService({ service: service, game_id: id }),
  });

  const game = gameServicesData?.extra?.game || null;
  const products = gameServicesData?.items || [];

  const links = [
    {
      id: 1,
      title: "الحسابات",
      link: `/games/accounts/${id}`,
    },
    {
      id: 2,
      title: "الإشتراكات",
      link: `/games/subscriptions/${id}`,
    },
    {
      id: 3,
      title: "شحن رصيد",
      link: `/games/top_up/${id}`,
    },
    {
      id: 4,
      title: "كروت الهدايا",
      link: `/games/gift_cards/${id}`,
    },
    {
      id: 5,
      title: "إضافة لعبه للحساب",
      link: `/games/add_game_to_account/${id}`,
    },
  ];

  return (
    <article>
      <GamesNav links={links} game={game} />

      {game?.service === "accounts" ? (
        <Accounts products={products} />
      ) : (
        <ProductsPage products={products} />
      )}
    </article>
  );
};

export default GameServices;
