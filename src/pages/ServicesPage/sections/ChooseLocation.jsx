import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ChooseLocation = ({ location, setLocation }) => {
  return (
    <div>
      <p className="font-bold mb-2">حدد منطقة اللعبة</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* المنطقة */}
        <Select
          value={location?.region}
          onValueChange={(value) =>
            setLocation((prev) => ({ ...prev, region: value }))
          }
        >
          <SelectTrigger className="rounded-full bg-input w-full">
            <SelectValue placeholder="منطقة" />
          </SelectTrigger>
          <SelectContent className="bg-input rounded-xl">
            <SelectItem value="fr">فرنسا</SelectItem>
            <SelectItem value="eg">مصر</SelectItem>
          </SelectContent>
        </Select>

        {/* المنصة */}
        <Select
          value={location.platform}
          onValueChange={(value) =>
            setLocation((prev) => ({ ...prev, platform: value }))
          }
        >
          <SelectTrigger className="rounded-full bg-input w-full">
            <SelectValue placeholder="المنصة" />
          </SelectTrigger>
          <SelectContent className="bg-input rounded-xl">
            <SelectItem value="pc">PC</SelectItem>
            <SelectItem value="ps">PlayStation</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ChooseLocation;
