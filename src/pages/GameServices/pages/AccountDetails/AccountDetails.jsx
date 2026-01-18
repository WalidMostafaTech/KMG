import HeadSection from "./section/HeadSection";
import OfferDetails from "./section/OfferDetails";
import FAQ from "@/components/commonSections/FAQ";
import PurchaseSteps from "@/components/commonSections/PurchaseSteps";
import { useParams } from "react-router";
import { getProductsDetails } from "@/services/serviceServices";
import { useQuery } from "@tanstack/react-query";
import EmptyDataSection from "@/components/commonSections/EmptyDataSection";
import OfferDetailsSkeleton from "@/components/Loading/SkeletonLoading/OfferDetailsSkeleton";
import HeadSectionSkeleton from "@/components/Loading/SkeletonLoading/HeadSectionSkeleton";

const AccountDetails = () => {
  const { id } = useParams();

  const { data: productDetailsData, isLoading } = useQuery({
    queryKey: ["product-details" + id],
    queryFn: () => getProductsDetails(id),
  });

  if (isLoading) {
    return (
      <section className="container py-6 lg:py-10 space-y-8 lg:space-y-16">
        <HeadSectionSkeleton />
        <OfferDetailsSkeleton />
      </section>
    );
  }

  if (!productDetailsData)
    return <EmptyDataSection msg={"لا توجد بيانات لعرضها حالياً."} />;

  return (
    <section className="container py-6 lg:py-10 space-y-8 lg:space-y-16">
      <HeadSection data={productDetailsData} />

      <OfferDetails data={productDetailsData} />

      <PurchaseSteps />

      <FAQ />
    </section>
  );
};

export default AccountDetails;
