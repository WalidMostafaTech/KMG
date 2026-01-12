import image from "@/assets/images/slider-img.png";

import ServicesAccountCard from "@/components/cards/ServicesAccountCard";

import HeadSection from "./section/HeadSection";
import OfferDetails from "./section/OfferDetails";
import FAQ from "@/components/commonSections/FAQ";
import PurchaseSteps from "@/components/commonSections/PurchaseSteps";

const list = [
  {
    id: 1,
    image: image,
    icon: image,
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
    image: image,
    icon: image,
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
    image: image,
    icon: image,
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

const AccountsCheckout = () => {
  // const { id } = useParams();

  return (
    <section className="container py-6 lg:py-10 space-y-8 lg:space-y-16">
      <HeadSection />

      <OfferDetails />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-8 mt-6 lg:mt-10">
        {list.map((item) => (
          <ServicesAccountCard key={item.id} item={item} />
        ))}
      </div>

      <PurchaseSteps />

      <FAQ />
    </section>
  );
};

export default AccountsCheckout;
