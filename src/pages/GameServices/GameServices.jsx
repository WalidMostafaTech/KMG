import { getProductsByGameAndService } from "@/services/serviceServices";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "react-router";
import GamesNav from "@/components/commonSections/GamesNav";
import Accounts from "./pages/Accounts/Accounts";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import OffersFilter from "./sections/OffersFilter";
import { useState, useMemo, useEffect } from "react";
import AccountsSkeleton from "@/components/Loading/SkeletonLoading/AccountsSkeleton";
import { useTranslation } from "react-i18next";
import SeoManager from "@/utils/SeoManager";
import { useSelector } from "react-redux";

const GameServicesContent = () => {
  const { setting } = useSelector((state) => state.setting);

  const maxPriceLimit = setting?.max_product_price || 10000;

  const defaultFilters = useMemo(
    () => ({
      min_time: "",
      max_time: "",
      country_id: "",
      platform_id: "",
      min_price: 0,
      max_price: maxPriceLimit,
    }),
    [maxPriceLimit],
  );

  const { service, id } = useParams();
  const { t } = useTranslation();

  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page") || 1);

  useEffect(() => {
    if (!setting?.max_product_price) return;

    setFilters((prev) => ({
      ...prev,
      max_price: maxPriceLimit,
    }));

    setAppliedFilters((prev) => ({
      ...prev,
      max_price: maxPriceLimit,
    }));
  }, [setting?.max_product_price, maxPriceLimit]);

  // Filter out account-specific filters for non-account services
  const apiFilters = useMemo(() => {
    if (service === "accounts") {
      return appliedFilters;
    }

    // For non-account services, only send country_id and platform_id
    return {
      country_id: appliedFilters.country_id,
      platform_id: appliedFilters.platform_id,
      min_time: "",
      max_time: "",
      min_price: 0,
      max_price: maxPriceLimit,
    };
  }, [service, appliedFilters, maxPriceLimit]);

  const { data: gameServicesData, isLoading } = useQuery({
    queryKey: ["game-services", service, id, apiFilters, currentPage],
    queryFn: () =>
      getProductsByGameAndService({
        service,
        game_slug: id,
        page: currentPage,
        ...apiFilters,
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

  const gameServicesToShow = gameServicesData?.extra?.game?.items_count || {};

  const links = [
    {
      id: 1,
      key: "accounts",
      title: t("Games.list.accounts"),
      link: `/games/accounts/${id}`,
    },
    {
      id: 2,
      key: "subscriptions",
      title: t("Games.list.subscriptions"),
      link: `/games/subscriptions/${id}`,
    },
    {
      id: 3,
      key: "top_up",
      title: t("Games.list.topUp"),
      link: `/games/top_up/${id}`,
    },
    {
      id: 4,
      key: "gift_cards",
      title: t("Games.list.giftCards"),
      link: `/games/gift_cards/${id}`,
    },
    {
      id: 5,
      key: "add_game_to_account",
      title: t("Games.list.addGameToAccount"),
      link: `/games/add_game_to_account/${id}`,
    },
  ];

  // فلترة العناصر اللي قيمتها أكبر من صفر
  const filteredLinks = links.filter(
    (item) => gameServicesToShow[item.key] > 0,
  );

  const handlePageChange = (page) => {
    setSearchParams({ page });
  };

  return (
    <>
      <SeoManager
        title={game?.seo?.meta_title}
        description={game?.seo?.meta_description}
        keywords={game?.seo?.keywords}
        canonical={game?.seo?.canonical_url}
        ogImage={game?.seo?.og_image}
      />

      <article className="space-y-6 lg:space-y-10 pb-6">
        <GamesNav links={filteredLinks} game={game} isLoading={isLoading} />

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
            game={game}
            products={products}
            meta={gameServicesData?.meta}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            service={game?.service}
          />
        )}
      </article>
    </>
  );
};

const GameServices = () => {
  const { service } = useParams();

  // Reset entire component state when service changes
  return <GameServicesContent key={service} />;
};

export default GameServices;
