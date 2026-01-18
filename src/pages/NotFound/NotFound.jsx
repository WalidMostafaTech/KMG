import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <section className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-7xl font-bold">{t("notFound.title")}</h1>
      <h2 className="text-2xl font-bold">{t("notFound.subtitle")}</h2>

      <Link to="/" replace>
        <Button>{t("notFound.goHome")}</Button>
      </Link>
    </section>
  );
};

export default NotFound;
