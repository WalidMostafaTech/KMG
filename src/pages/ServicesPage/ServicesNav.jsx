import image from "@/assets/images/slider-img.png";
import { NavLink } from "react-router";

const list = [
  {
    id: 1,
    title: "الحسابات",
    link: "/services",
  },
  {
    id: 2,
    title: "الإشتراكات",
    link: "/services/subscriptions",
  },
  {
    id: 3,
    title: "شحن رصيد",
    link: "/services/balance-top-up",
  },
  {
    id: 4,
    title: "كروت الهدايا",
    link: "/services/gift-cards",
  },
  {
    id: 5,
    title: "إضافة لعبه للحساب",
    link: "/services/add-game-to-account",
  },
];

const ServicesNav = () => {
  return (
    <nav className="bg-input">
      <div className="container py-2 flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 overflow-hidden rounded">
            <img
              src={image}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-bold capitalize">pupg</h2>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-4 py-2">
          {list.map((item) => (
            <li key={item.id}>
              <NavLink end to={item.link} className={`services_nav_links`}>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default ServicesNav;
