import { useTranslation } from "react-i18next";

const ChatHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="px-4 py-3 border-b border-white/10 text-white font-semibold">
      {t("chatHeader.title")}
    </div>
  );
};

export default ChatHeader;
