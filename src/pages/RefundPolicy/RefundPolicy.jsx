import { getPolicies } from "@/services/mainServices";
import { useQuery } from "@tanstack/react-query";

const RefundPolicy = () => {
  const {
    data: policeData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["refund_policy"],
    queryFn: () => getPolicies("refund_policy"),
  });

  return (
    <article className="container py-6">
      <div dangerouslySetInnerHTML={{ __html: policeData?.refund_policy }} />
    </article>
  );
};

export default RefundPolicy;
