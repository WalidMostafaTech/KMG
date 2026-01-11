import { useState } from "react";
import PaymentList from "./sections/PaymentList";
import PaymentCard from "./sections/PaymentCard";

const Payment = () => {
  const [currentPayment, setCurrentPayment] = useState(null);

  const handlePaymentClick = (payment) => {
    if (currentPayment?.id === payment?.id) setCurrentPayment(null);
    else setCurrentPayment(payment);
  };
  return (
    <section className="container py-6 flex flex-col md:flex-row justify-center gap-8 lg:gap-16">
      <PaymentList
        onPaymentClick={handlePaymentClick}
        currentPayment={currentPayment}
      />

      <PaymentCard
        currentPayment={currentPayment}
        cancelPayment={() => setCurrentPayment(null)}
      />
    </section>
  );
};

export default Payment;
