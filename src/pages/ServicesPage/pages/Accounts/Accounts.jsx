import { Search } from "lucide-react";
import image from "@/assets/images/slider-img.png";
import { Link } from "react-router";

const list = [
  {
    id: 1,
    title: "BATTLEGROUNDS",
    image: image,
  },
  {
    id: 2,
    title: "BATTLEGROUNDS",
    image: image,
  },
  {
    id: 3,
    title: "BATTLEGROUNDS",
    image: image,
  },
  {
    id: 4,
    title: "BATTLEGROUNDS",
    image: image,
  },
  {
    id: 5,
    title: "BATTLEGROUNDS",
    image: image,
  },
  {
    id: 6,
    title: "BATTLEGROUNDS",
    image: image,
  },
  {
    id: 7,
    title: "BATTLEGROUNDS",
    image: image,
  },
  {
    id: 8,
    title: "BATTLEGROUNDS",
    image: image,
  },
];

const Accounts = () => {
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
          <Link
            to={`/services/accounts/${item.id}`}
            key={item.id}
            className="flex flex-col gap-2 card"
          >
            <div className="w-full h-60 bg-accent overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg font-bold text-center">{item.title}</h2>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Accounts;
