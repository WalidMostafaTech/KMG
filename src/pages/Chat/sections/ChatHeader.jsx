import { useTranslation } from "react-i18next";
import logo from "@/assets/images/logo.png";

const ChatHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="py-3 border-b text-white flex items-center gap-2">
      <img
        loading="lazy"
        src={logo}
        alt="logo"
        className="w-18 border-e-2 border-white pe-2"
      />
      <p className="font-bold text-xl">{t("chatHeader.admin")}</p>
    </div>
  );
};

export default ChatHeader;
