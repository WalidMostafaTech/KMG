import { getProductsByGameAndService } from "@/services/serviceServices";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
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

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  const { data: gameServicesData, isLoading } = useQuery({
    queryKey: ["game-services", service, id, appliedFilters, currentPage],
    queryFn: () =>
      getProductsByGameAndService({
        service,
        game_id: id,
        page: currentPage,
        ...appliedFilters,
      }),
    enabled: !!service,
  });

  const applyFilters = () => {
    setAppliedFilters(filters);
    setSearchParams({ page: 1 });
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setSearchParams({ page: 1 });
  };

  const game = gameServicesData?.extra?.game || null;
  const products = gameServicesData?.items || [];

  const links = [
    { id: 1, title: "الحسابات", link: `/games/accounts/${id}` },
    { id: 2, title: "الإشتراكات", link: `/games/subscriptions/${id}` },
    { id: 3, title: "شحن رصيد", link: `/games/top_up/${id}` },
    { id: 4, title: "كروت الهدايا", link: `/games/gift_cards/${id}` },
    {
      id: 5,
      title: "إضافة لعبه للحساب",
      link: `/games/add_game_to_account/${id}`,
    },
  ];

  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

  return (
    <article className="space-y-6 lg:space-y-10 pb-6">
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
        <Accounts
          products={products}
          meta={gameServicesData?.meta}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <ProductsPage
          products={products}
          meta={gameServicesData?.meta}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </article>
  );
};

export default GameServices;
