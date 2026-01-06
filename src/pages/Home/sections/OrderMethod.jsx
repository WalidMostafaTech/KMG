import SectionTitle from "@/components/common/SectionTitle";

const list = [
  {
    id: 1,
    title: "حماية 100%",
    disc: "جميع المعاملات محمية",
  },
  {
    id: 2,
    title: "بائعون موثوقون",
    disc: "فحص دقيق لكل بائع",
  },
  {
    id: 3,
    title: "خدمة 7-24",
    disc: "خدمة عملاء على مدار الساعة",
  },
  {
    id: 4,
    title: "استرجاع مضمون",
    disc: "ضمان استرجاع الأموال",
  },
  {
    id: 5,
    title: "تسليم سريع",
    disc: "معظم الطلبات فورية",
  },
  {
    id: 6,
    title: "أسعار تنافسية",
    disc: "أفضل الأسعار فى السوق",
  },
];

const OrderMethod = () => {
  return (
    <section className="container sectionPadding">
      <SectionTitle title={"طرق الطلب"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
        {list.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col items-center text-center gap-2 card"
          >
            <h2
              className="bg-primary rounded-xl w-16 h-16 flex items-center justify-center
            text-4xl font-bold shadow-lg shadow-accent-foreground/20 mb-4"
            >
              {index + 1}
            </h2>

            <h3 className="text-2xl font-bold">{item.title}</h3>
            <p className="text-sm">{item.disc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderMethod;
