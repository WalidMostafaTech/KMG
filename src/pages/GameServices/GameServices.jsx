import { getProductsByGameAndService } from "@/services/serviceServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import GamesNav from "@/components/commonSections/GamesNav";
import Accounts from "./pages/Accounts/Accounts";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import OffersFilter from "./sections/OffersFilter";
import { useState } from "react";
import AccountsSkeleton from "@/components/Loading/SkeletonLoading/AccountsSkeleton";

const defaultFilters = {
  min_time: "",
  max_time: "",
  country_id: "",
  platform_id: "",
  min_price: 0,
  max_price: 1000,
};

const GameServices = () => {
  const { service, id } = useParams();

  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  const { data: gameServicesData, isLoading } = useQuery({
    queryKey: ["game-services", service, id, appliedFilters],
    queryFn: () =>
      getProductsByGameAndService({
        service,
        game_id: id,
        ...appliedFilters,
      }),
  });

  const applyFilters = () => {
    setAppliedFilters(filters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
  };

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
    <article className="space-y-6">
      <GamesNav links={links} game={game} isLoading={isLoading} />

      <OffersFilter
        filters={filters}
        setFilters={setFilters}
        onApply={applyFilters}
        onReset={resetFilters}
        service={game?.service}
      />

      {isLoading ? (
        <AccountsSkeleton />
      ) : game?.service === "accounts" ? (
        <Accounts products={products} />
      ) : (
        <ProductsPage products={products} />
      )}
    </article>
  );
};

export default GameServices;
