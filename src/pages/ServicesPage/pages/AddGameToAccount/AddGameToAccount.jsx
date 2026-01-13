import { useState } from "react";
import ChooseLocation from "@/pages/ServicesPage/sections/ChooseLocation";
import OffersList from "@/pages/ServicesPage/sections/OffersList";
import PaymentCard from "@/pages/ServicesPage/sections/PaymentCard";
import { useQuery } from "@tanstack/react-query";
import { getAllGamesByService } from "@/services/serviceServices";

const AddGameToAccount = () => {
  const [currentOffer, setCurrentOffer] = useState(null);
  const [location, setLocation] = useState({
    region: "",
    platform: "",
  });

  const handleOfferClick = (offer) => {
    if (currentOffer?.id === offer?.id) setCurrentOffer(null);
    else setCurrentOffer(offer);
  };

  const {
    data: servicesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["services-games-add_game_to_account"],
    queryFn: () => getAllGamesByService("add_game_to_account"),
  });

  return (
    <section className="container py-6 lg:py-10 space-y-6">
      <ChooseLocation location={location} setLocation={setLocation} />

      <section className="flex flex-col md:flex-row justify-center gap-8 lg:gap-16">
        <OffersList
          onOfferClick={handleOfferClick}
          currentOffer={currentOffer}
          offers={servicesData?.items}
        />

        <PaymentCard currentOffer={currentOffer} location={location} />
      </section>
    </section>
  );
};

export default AddGameToAccount;
