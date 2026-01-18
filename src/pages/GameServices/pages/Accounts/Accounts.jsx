import ServicesAccountCard from "@/components/cards/ServicesAccountCard";
import EmptyDataSection from "@/components/commonSections/EmptyDataSection";

const Accounts = ({ products = [] }) => {
  if (!products || products.length === 0)
    return <EmptyDataSection msg={"لا توجد حسابات لعرضها حالياً."} />;

  return (
    <section className="container py-6 lg:py-10 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 lg:gap-8">
        {products?.map((item) => (
          <ServicesAccountCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default Accounts;
