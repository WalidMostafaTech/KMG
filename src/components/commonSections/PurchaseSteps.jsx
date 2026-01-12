import SectionTitle from "@/components/common/SectionTitle";
import { getPurchaseSteps } from "@/services/mainServices";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, Package, Search } from "lucide-react";

const PurchaseSteps = () => {
  const {
    data: purchaseStepsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["purchase-steps"],
    queryFn: getPurchaseSteps,
  });

  const list = [
    {
      id: 1,
      title: purchaseStepsData?.[0]?.title,
      description: purchaseStepsData?.[0]?.description,
      icon: <Search />,
    },
    {
      id: 2,
      title: purchaseStepsData?.[1]?.title,
      description: purchaseStepsData?.[1]?.description,
      icon: <CreditCard />,
    },
    {
      id: 3,
      title: purchaseStepsData?.[2]?.title,
      description: purchaseStepsData?.[2]?.description,
      icon: <Package />,
    },
  ];

  return (
    <div>
      <SectionTitle title={"عملية شراء سهلة فى 3 خطوات"} />

      <div className="flex flex-wrap gap-4 lg:gap-8">
        {list?.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center gap-2 card relative flex-1 min-w-[200px]"
          >
            <span className="absolute top-2 start-4 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full border">
              {index + 1}
            </span>

            <h2
              className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center
            text-4xl font-bold shadow-lg shadow-accent-foreground/20 mb-4"
            >
              {item.icon}
            </h2>

            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchaseSteps;
