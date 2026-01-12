import { getPolicies } from "@/services/mainServices";
import { useQuery } from "@tanstack/react-query";

const JoinAsPartner = () => {
  const {
    data: joinData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["join_as_partner"],
    queryFn: () => getPolicies("join_as_partner"),
  });

  return (
    <article className="container py-6">
      <div dangerouslySetInnerHTML={{ __html: joinData?.join_as_partner }} />
    </article>
  );
};

export default JoinAsPartner;
