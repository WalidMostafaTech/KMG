import logo from "@/assets/images/logo.png";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaXTwitter,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa6";

import { Link } from "react-router";
import ContactUsModal from "./ContactUsModal";
import { getFooter } from "@/services/mainServices";
import { useQuery } from "@tanstack/react-query";

const Footer = () => {
  const {
    data: footerData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["footer"],
    queryFn: getFooter,
  });

  const socials = [
    {
      id: 1,
      name: "youtube",
      link: footerData?.youtube,
      icon: <FaYoutube />,
    },
    {
      id: 2,
      name: "x",
      link: footerData?.x,
      icon: <FaXTwitter />,
    },
    {
      id: 3,
      name: "linkedin",
      link: footerData?.linkedin,
      icon: <FaLinkedinIn />,
    },
    {
      id: 4,
      name: "instagram",
      link: footerData?.instagram,
      icon: <FaInstagram />,
    },
    {
      id: 5,
      name: "facebook",
      link: footerData?.facebook,
      icon: <FaFacebookF />,
    },
  ];

  return (
    <footer className="bg-background container">
      <section className="flex flex-col items-center gap-6 py-4">
        <div className="flex items-center gap-4">
          {footerData?.payment_platforms.map((item, index) => (
            <div key={item.id} className="w-12 h-8 overflow-hidden rounded">
              <img
                src={item.image}
                alt={index + 1}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <img src={logo} alt="logo" />

        <p className="text-center text-sm max-w-3xl">
          {footerData?.footer_text}
        </p>

        <div className="flex items-center gap-4">
          <Link
            to="/join-as-partner"
            className="text-sm underline hover:text-primary transition"
          >
            انضم كاشريك
          </Link>
          <Link
            to="/refund-policy"
            className="text-sm underline hover:text-primary transition"
          >
            سياسة الاسترداد
          </Link>
          <ContactUsModal />
        </div>

        <div className="flex items-center gap-4">
          {socials.map((item) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={item.link}
              key={item.id}
              className="hover:text-primary hover:scale-110 transition text-xl"
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
