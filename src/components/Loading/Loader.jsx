import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="w-16 h-16 lg:w-20 lg:h-20 border-4 border-dashed border-primary rounded-full animate-spin"></div>

      <h2 className="text-lg font-semibold mt-4">{t("loading")}</h2>
    </div>
  );
};

export default Loader;
