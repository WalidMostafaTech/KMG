import image from "@/assets/images/slider-img.png";

const list = [
  { id: 1, image: image, title: `اونلاين`, paymentMethod: "online" },
  { id: 2, image: image, title: `فودافون كاش`, paymentMethod: "vodafone_cash" },
  { id: 3, image: image, title: `انستا باي`, paymentMethod: "instaPay" },
  { id: 4, image: image, title: `باي بال`, paymentMethod: "paypal" },
  { id: 5, image: image, title: `بينانس`, paymentMethod: "binance_pay" },
];

const PaymentList = ({ onPaymentClick, currentPayment }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-center">اختر طريقة الدفع</h3>

      <div className="grid grid-cols-2 gap-4 h-fit">
        {list.map((item) => (
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
