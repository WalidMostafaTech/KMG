import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServicesSubscriptions = () => {
  return (
    <section className="container py-6 lg:py-10 space-y-6">
      <div>
        <p className="font-bold mb-2">حدد منطقة اللعبة</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select>
            <SelectTrigger className="rounded-full bg-input w-full">
              <SelectValue placeholder="منطقة" />
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
        </div>
      </div>
    </section>
  );
};

export default ServicesSubscriptions;
