import logo from "@/assets/images/logo.png";
import visaIcon from "@/assets/icons/visa-icon.jpg";
import masterIcon from "@/assets/icons/master-card-icon.jpg";
import americanIcon from "@/assets/icons/american-express-icon.jpg";
import discoverIcon from "@/assets/icons/discover-icon.jpg";
import { Facebook, Linkedin, Twitch, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router";

const list = [
  {
    id: 1,
    icon: visaIcon,
    link: "www.google.com",
  },
  {
    id: 2,
    icon: masterIcon,
    link: "www.google.com",
  },
  {
    id: 3,
    icon: americanIcon,
    link: "www.google.com",
  },
  {
    id: 4,
    icon: discoverIcon,
    link: "www.google.com",
  },
];

const links = [
  {
    id: 1,
    name: "انضم كاشريك",
    link: "/",
  },
  {
    id: 2,
    name: "سياسة الاسترداد",
    link: "/",
  },
  {
    id: 3,
    name: "اتصل بنا",
    link: "/",
  },
];

const socials = [
  {
    id: 1,
    name: "youtube",
    link: "www.google.com",
    icon: <Youtube />,
  },
  {
    id: 2,
    name: "twitter",
    link: "www.google.com",
    icon: <Twitter />,
  },
  {
    id: 3,
    name: "linkedin",
    link: "www.google.com",
    icon: <Linkedin />,
  },
  {
    id: 4,
    name: "twitch",
    link: "www.google.com",
    icon: <Twitch />,
  },
  {
    id: 5,
    name: "facebook",
    link: "www.google.com",
    icon: <Facebook />,
  },
];

const Footer = () => {
  return (
    <footer className="bg-background container">
      <section className="flex flex-col items-center gap-6 py-4">
        <div className="flex items-center gap-4">
          {list.map((item) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              key={item.id}
              className="w-12 h-8 overflow-hidden rounded"
            >
              <img
                src={item.icon}
                alt={item.link}
                className="w-full h-full object-cover"
              />
            </Link>
          ))}
        </div>

        <img src={logo} alt="logo" />

        <p className="text-center text-sm max-w-3xl">
          KMG.gg هو الوجهة الأولى لكل لاعب يبحث عن تجربة تسوق آمنة وسريعة
          للمنتجات الرقمية. نقدم لك أفضل الحسابات، البطاقات الهدايا، الاشتراكات،
          والإضافات لأشهر الألعاب والمنصات العالمية، مع ضمان استرداد كامل المبلغ
          ودعم فوري على مدار الساعة.
        </p>

        <div className="flex items-center gap-4">
          {links.map((item) => (
            <Link
              href={item.link}
              key={item.id}
              className="text-sm underline hover:text-primary transition"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {socials.map((item) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              key={item.id}
              className="hover:text-primary hover:scale-110 transition"
            >
              {item.icon}
            </Link>
          ))}
        </div>
      </section>

      <div className="py-4 border-t">
        <p></p>
      </div>
    </footer>
  );
};

export default Footer;
