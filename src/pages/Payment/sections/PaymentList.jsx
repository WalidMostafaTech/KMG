import EmptyDataSection from "@/components/commonSections/EmptyDataSection";
import PaymentListSkeleton from "@/components/Loading/SkeletonLoading/PaymentListSkeleton";
import { getPaymentSettings } from "@/services/paymentsServices";
import { useQuery } from "@tanstack/react-query";

const PaymentList = ({ onPaymentClick, currentPayment }) => {
  const { data: paymentData, isLoading } = useQuery({
    queryKey: ["payment-settings"],
    queryFn: getPaymentSettings,
  });

  if (isLoading) return <PaymentListSkeleton />;

  if (!paymentData || paymentData.length === 0)
    return <EmptyDataSection msg={"لا توجد طرق دفع لعرضها حالياً."} />;

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-center">اختر طريقة الدفع</h3>

      <div className="grid grid-cols-2 gap-4 h-fit">
        {paymentData?.map((item) => (
          <div
            key={item.id}
            onClick={() => onPaymentClick(item)}
            className={`card flex flex-col items-center text-center gap-2 cursor-pointer hover:scale-105 duration-200 ${
              item?.id === currentPayment?.id ? "border-primary border-2" : ""
            }`}
          >
            <img
              src={item.image}
              alt=""
              className="max-h-[70px] object-contain"
            />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentList;
