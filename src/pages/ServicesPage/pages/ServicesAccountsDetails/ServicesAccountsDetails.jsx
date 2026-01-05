import { Search } from "lucide-react";
import { useParams } from "react-router";
import ServicesAccountCard from "@/components/cards/ServicesAccountCard";

const list = [
  {
    id: 1,
    title: "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
    price: 49,
    priceOld: 99,
    time: "5-10 دقائق",
    items: [
      {
        id: 1,
        title: "PS3",
      },
      {
        id: 2,
        title: "PS4",
      },
      {
        id: 3,
        title: "PS5",
      },
    ],
  },
  {
    id: 2,
    title: "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
    price: 49,
    priceOld: null,
    time: "5-10 دقائق",
    items: [
      {
        id: 1,
        title: "PS3",
      },
      {
        id: 2,
        title: "PS4",
      },
      {
        id: 3,
        title: "PS5",
      },
    ],
  },
  {
    id: 3,
    title: "حساب GTA 5 مودد كامل  500 مليون دولار + جميع الأسلحة + مستوى 500",
    price: 49,
    priceOld: 99,
    time: "5-10 دقائق",
    items: [
      {
        id: 1,
        title: "PS3",
      },
      {
        id: 2,
        title: "PS4",
      },
      {
        id: 3,
        title: "PS5",
      },
    ],
  },
];

const ServicesAccountsDetails = () => {
  const { id } = useParams();

  return (
    <section className="container py-6 lg:py-10">
      <div className="w-full flex items-center gap-2 bg-input py-2 px-4 rounded-full">
        <button>
          <Search />
        </button>
        <input
          type="search"
          placeholder="بحث ..."
          className="flex-1 outline-none border-none"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 mt-6 lg:mt-10">
        {list.map((item) => (
          <ServicesAccountCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default ServicesAccountsDetails;
