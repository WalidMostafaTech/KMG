import { Search } from "lucide-react";
import { useParams } from "react-router";
import ServicesAccountCard from "@/components/cards/ServicesAccountCard";
import image from "@/assets/images/slider-img.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const AccountsDetails = () => {
  const { id } = useParams();

  return (
    <section className="container py-6 lg:py-10 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select>
          <SelectTrigger className="rounded-full bg-input w-full">
            <SelectValue placeholder="إختر وقت التسليم" />
          </SelectTrigger>
          <SelectContent className={`bg-input rounded-xl`}>
            <SelectItem value="ar" className={`rounded-lg`}>
              العربية
            </SelectItem>
            <SelectItem value="en" className={`rounded-lg`}>
              English
            </SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="rounded-full bg-input w-full">
            <SelectValue placeholder="السعر" />
          </SelectTrigger>
          <SelectContent className={`bg-input rounded-xl`}>
            <SelectItem value="ar" className={`rounded-lg`}>
              العربية
            </SelectItem>
            <SelectItem value="en" className={`rounded-lg`}>
              English
            </SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="rounded-full bg-input w-full">
            <SelectValue placeholder="جهاز" />
          </SelectTrigger>
          <SelectContent className={`bg-input rounded-xl`}>
            <SelectItem value="ar" className={`rounded-lg`}>
              العربية
            </SelectItem>
            <SelectItem value="en" className={`rounded-lg`}>
              English
            </SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="rounded-full bg-input w-full">
            <SelectValue placeholder="المنطقة" />
          </SelectTrigger>
          <SelectContent className={`bg-input rounded-xl`}>
            <SelectItem value="ar" className={`rounded-lg`}>
              العربية
            </SelectItem>
            <SelectItem value="en" className={`rounded-lg`}>
              English
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-8">
        {list.map((item) => (
          <ServicesAccountCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default AccountsDetails;
