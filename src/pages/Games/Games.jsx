import { Search } from "lucide-react";
import { Link, useParams } from "react-router";
import { getAllGamesByService } from "@/services/serviceServices";
import { useQuery } from "@tanstack/react-query";
import GamesNav from "@/components/commonSections/GamesNav";
import { useEffect, useState } from "react";
import EmptyDataSection from "@/components/commonSections/EmptyDataSection";
import GamesSkeleton from "@/components/Loading/SkeletonLoading/GamesSkeleton";

const Games = () => {
  const { service } = useParams();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data: gamesData, isLoading } = useQuery({
    queryKey: ["games", service, debouncedSearch],
    queryFn: () => getAllGamesByService(service, debouncedSearch),
    enabled: !!service,
  });

  const links = [
    {
      id: 1,
      title: "الحسابات",
      link: `/games/accounts`,
    },
    {
      id: 2,
      title: "الإشتراكات",
      link: "/games/subscriptions",
    },
    {
      id: 3,
      title: "شحن رصيد",
      link: "/games/top_up",
    },
    {
      id: 4,
      title: "كروت الهدايا",
      link: "/games/gift_cards",
    },
    {
      id: 5,
      title: "إضافة لعبه للحساب",
      link: "/games/add_game_to_account",
    },
  ];

  return (
    <article>
      <GamesNav links={links} />

      <section className="container py-6 lg:py-10">
        <div className="w-full flex items-center gap-2 bg-input py-2 px-4 rounded-full">
          <button>
            <Search />
          </button>

          <input
            type="search"
            placeholder="بحث ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none border-none bg-transparent"
          />
        </div>

        {isLoading ? (
          <GamesSkeleton />
        ) : gamesData?.items?.length === 0 ? (
          <EmptyDataSection msg="لا توجد العاب لعرضها حالياً." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 mt-6 lg:mt-10">
            {gamesData?.items?.map((item) => (
              <Link
                to={`/games/${item.service}/${item.id}`}
                key={item.id}
                className="flex flex-col gap-2 card"
              >
                <div className="w-full h-60 bg-accent overflow-hidden rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h2 className="text-lg font-bold text-center">{item.name}</h2>
              </Link>
            ))}
          </div>
        )}
      </section>
    </article>
  );
};

export default Games;
