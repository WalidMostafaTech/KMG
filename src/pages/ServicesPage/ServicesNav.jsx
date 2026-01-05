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
    title: "المنتجات",
    link: "/services/products",
  },
];

const ServicesNav = () => {
  return (
    <nav className="bg-input py-2">
      <div className="container flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 overflow-hidden rounded">
            <img
              src={image}
              alt="image"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-lg font-bold">الخدمات</h2>
        </div>

        <ul className="flex items-center gap-4 flex-1">
          {list.map((item) => (
            <li key={item.id}>
              <NavLink to={item.link} className={`services_nav_links`}>
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
