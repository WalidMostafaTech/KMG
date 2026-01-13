import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "@/store/languageSlice/languageSlice";
import LoadingModal from "@/components/Loading/LoadingModal";
import { Globe } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.language);

  const [openLoading, setOpenLoading] = useState(false);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const handleChangeLanguage = (value) => {
    if (value !== lang) {
      dispatch(changeLanguage(value));
      setOpenLoading(true);
    }
  };

  return (
    <>
      <Select value={lang} onValueChange={handleChangeLanguage}>
        <SelectTrigger className="min-w-[120px] rounded-full">
          <SelectValue placeholder="اللغة" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ar" className="flex gap-2">
            <Globe size={16} />
            العربية
          </SelectItem>

          <SelectItem value="en" className="flex gap-2">
            <Globe size={16} />
            English
          </SelectItem>
        </SelectContent>
      </Select>

      {openLoading && <LoadingModal />}
    </>
  );
};

export default LanguageSwitcher;
