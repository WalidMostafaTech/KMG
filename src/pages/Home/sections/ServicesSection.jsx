import image from "@/assets/images/slider-img.png";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router";

const list = [
  {
    id: 1,
    title: "الحسابات",
    items: [
      {
        id: 1,
        img: image,
        title: "The Best Web",
        disc: "Tokens",
      },
      {
        id: 2,
        img: image,
        title: "The Best Web",
        disc: "Tokens",
      },
      {
        id: 3,
        img: image,
        title: "The Best Web",
        disc: "Tokens",
      },
    ],
  },
  {
    id: 2,
    title: "الحسابات",
    items: [
      {
        id: 1,
        img: image,
        title: "The Best Web",
        disc: "Tokens",
      },
      {
        id: 2,
        img: image,
        title: "The Best Web",
        disc: "Tokens",
      },
      {
        id: 3,
        img: image,
        title: "The Best Web",
        disc: "Tokens",
      },
    ],
  },
];

const ServicesSection = () => {
  return (
    <section className="container sectionPadding">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
        {list.map((item) => (
          <div key={item.id} className="flex flex-col gap-4 card">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <Link
                to={`/services`}
                className="flex items-center gap-1 group hover:underline"
              >
                عرض المزيد
                <ChevronLeft className="group-hover:-translate-x-2 transition-all" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {item.items.map((i) => (
                <Link
                  to={`/services/accounts/${i.link}`}
                  key={i.id}
                  className="flex gap-2 hover:bg-accent rounded transition"
                >
                  <div className="w-12 h-12 overflow-hidden rounded">
                    <img
                      src={i.img}
                      alt={i.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold">{i.title}</h3>
                    <p className="text-sm text-muted-foreground">{i.disc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;
