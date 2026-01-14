import { Search } from "lucide-react";
import ServicesAccountCard from "@/components/cards/ServicesAccountCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Accounts = ({ products }) => {
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
            <SelectValue placeholder="المنصه" />
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
        {products?.map((item) => (
          <ServicesAccountCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Accounts;
