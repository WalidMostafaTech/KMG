import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { RefreshCcw, Search } from "lucide-react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const OffersFilter = ({ filters, setFilters, onApply, onReset, service }) => {
  const { t } = useTranslation();
  const { countries, platforms, productsMinutesRange, setting } = useSelector(
    (state) => state.setting,
  );
  const { lang } = useSelector((state) => state.language);

  const maxPriceLimit = setting?.max_product_price || 10000;

  return (
    <div className="container space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {service === "accounts" && (
          <>
            {/* نطاق السعر */}
            <div className="space-y-3 rounded-xl bg-input p-4 col-span-2">
              <div className="flex justify-between text-xs">
                <span>
                  {t("OffersFilter.from")} {filters.min_price}
                </span>
                <span>{t("OffersFilter.priceRange")}</span>
                <span>
                  {t("OffersFilter.to")} {filters.max_price}
                </span>
              </div>

              <Slider
                dir={lang === "ar" ? "rtl" : "ltr"}
                min={0}
                max={maxPriceLimit}
                step={10}
                value={[filters.min_price, filters.max_price]}
                onValueChange={([min, max]) =>
                  setFilters((prev) => ({
                    ...prev,
                    min_price: min,
                    max_price: max,
                  }))
                }
                className="w-full"
              />
            </div>

            {/* من الوقت */}
            <Select
              value={filters.min_time}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, min_time: value }))
              }
            >
              <SelectTrigger className="rounded-full bg-input w-full col-span-1">
                <SelectValue placeholder={t("OffersFilter.fromTime")} />
              </SelectTrigger>
              <SelectContent>
                {productsMinutesRange?.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* الى الوقت */}
            <Select
              value={filters.max_time}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, max_time: value }))
              }
            >
              <SelectTrigger className="rounded-full bg-input w-full col-span-1">
                <SelectValue placeholder={t("OffersFilter.toTime")} />
              </SelectTrigger>
              <SelectContent>
                {productsMinutesRange?.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        )}

        {/* المنطقة */}
        <Select
          value={filters.country_id}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, country_id: value }))
          }
        >
          <SelectTrigger className="rounded-full bg-input w-full col-span-2">
            <SelectValue placeholder={t("OffersFilter.country")} />
          </SelectTrigger>
          <SelectContent>
            {countries?.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* المنصة */}
        <Select
          value={filters.platform_id}
          onValueChange={(value) =>
            setFilters((prev) => ({ ...prev, platform_id: value }))
          }
        >
          <SelectTrigger className="rounded-full bg-input w-full col-span-2">
            <SelectValue placeholder={t("OffersFilter.platform")} />
          </SelectTrigger>
          <SelectContent>
            {platforms?.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* الأزرار */}
        <div className="flex gap-3 w-full col-span-2">
          <Button
            variant="outline"
            onClick={onReset}
            className="flex-1 rounded-full"
          >
            {t("OffersFilter.reset")}
            <RefreshCcw />
          </Button>

          <Button onClick={onApply} className="flex-1">
            {t("OffersFilter.apply")}
            <Search />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OffersFilter;
