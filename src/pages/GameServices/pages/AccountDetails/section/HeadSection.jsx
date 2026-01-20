import { Button } from "@/components/ui/button";
import ServicesPaymentCards from "@/components/commonSections/ServicesPaymentCards";
import PaymentModal from "@/components/commonSections/PaymentModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "@/store/modals/modalsSlice";

const HeadSection = ({ data }) => {
  const [openPaymentModal, setOpenPaymentModal] = useState(false);

  const { profile } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const handlePayment = () => {
    if (profile) {
      setOpenPaymentModal(true);
    } else {
      dispatch(openModal("requiredLoginModal"));
    }
  };

  return (
    <div className="card lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
      <div className="h-[300px] md:h-[400px] bg-accent overflow-hidden rounded-2xl">
        <img
          src={data?.offer_image}
          alt={data?.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col gap-4 lg:gap-6">
        <h2 className="text-lg lg:text-2xl font-bold">{data?.title}</h2>

        <div className="flex gap-2 flex-wrap">
          {data?.platforms?.map((platform) => (
            <p
              key={platform.id}
              className="text-sm border rounded-full w-fit px-4 py-2"
            >
              {platform.name}
            </p>
          ))}

          {data?.duration_minutes && (
            <p className="text-sm border rounded-full w-fit px-4 py-2">
              {data.duration_minutes}
            </p>
          )}

          {data?.country_name && (
            <p className="text-sm border rounded-full w-fit px-4 py-2">
              {data.country_name}
            </p>
          )}
        </div>

        <div className="p-4 bg-accent rounded-2xl">
          <div className="flex items-center flex-wrap gap-2 mb-4">
            <p className="text-4xl font-bold">{data?.price_after}</p>
            {data?.price_before && (
              <p className="text-muted-foreground line-through">
                {data?.price_before}
              </p>
            )}
          </div>

          <Button onClick={handlePayment} className="w-full">
            اشتري الان
          </Button>
        </div>

        <ServicesPaymentCards grid={2} />
      </div>

      <PaymentModal
        open={openPaymentModal}
        onClose={() => setOpenPaymentModal(false)}
        product_id={data?.id}
        product_price={data?.price_after}
      />
    </div>
  );
};

export default HeadSection;
