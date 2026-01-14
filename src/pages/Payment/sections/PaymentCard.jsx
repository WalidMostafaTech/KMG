import VodafoneCashForm from "../forms/VodafoneCashForm";
import InstaPayForm from "../forms/InstaPayForm";
import PaypalForm from "../forms/PaypalForm";
import BinancePayForm from "../forms/BinancePayForm";

const PaymentCard = ({ currentPayment, cancelPayment, state }) => {
  if (!currentPayment) return null;

  return (
    <div className="flex flex-col gap-4 card w-full md:max-w-sm h-fit">
      <ul className="flex flex-col divide-y-2 text-sm">
        <li className="flex justify-between gap-2 py-1 text-muted-foreground">
          <p>السعر الاجمالى</p> <span>{state.product_price}</span>
        </li>
        <li className="flex justify-between gap-2 py-1 text-muted-foreground">
          <p>مصاريف الخدمة</p> <span>{currentPayment.amount}</span>
        </li>
        <li className="flex justify-between gap-2 py-1">
          <p>السعر النهائى</p>{" "}
          <span>{state.product_price + currentPayment.amount}</span>
        </li>
      </ul>

      <div className="flex items-center justify-between gap-2">
        <h3 className="font-bold mb-2">{currentPayment.title}</h3>

        <div className="w-16 h-8 overflow-hidden rounded">
          <img
            src={currentPayment.image}
            alt={currentPayment.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div>
        {currentPayment.paymentMethod === "online" && <div></div>}
        {currentPayment.paymentMethod === "vodafone_cash" && (
          <VodafoneCashForm
            cancelPayment={cancelPayment}
            currentPayment={currentPayment}
            state={state}
          />
        )}
        {currentPayment.paymentMethod === "instapay" && (
          <InstaPayForm
            cancelPayment={cancelPayment}
            currentPayment={currentPayment}
            state={state}
          />
        )}
        {currentPayment.paymentMethod === "paypal" && (
          <PaypalForm
            cancelPayment={cancelPayment}
            currentPayment={currentPayment}
            state={state}
          />
        )}
        {currentPayment.paymentMethod === "binance_pay" && (
          <BinancePayForm
            cancelPayment={cancelPayment}
            currentPayment={currentPayment}
            state={state}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentCard;
