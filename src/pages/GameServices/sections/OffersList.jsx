import MainPagination from "@/components/common/MainPagination";

const OffersList = ({
  onOfferClick,
  currentOffer,
  offers = [],
  meta,
  currentPage,
  onPageChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-center gap-4 h-fit">
        {offers?.map((item) => (
          <div
            key={item.id}
            onClick={() => onOfferClick(item)}
            className={`card min-w-[140px] flex flex-col items-center text-center gap-2 cursor-pointer hover:scale-102 duration-200 ${
              item?.id === currentOffer?.id ? "border-primary border-2" : ""
            }`}
          >
            <div className="w-full h-[70px] bg-accent rounded-md overflow-hidden">
              <img
                loading="lazy"
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>

            {item?.game_currency ? (
              <div>
                <p className="text-xl font-bold">{item.title}</p>
                <p className="text-sm">{item?.game_currency}</p>
              </div>
            ) : (
              <p className="text-sm">{item.title}</p>
            )}

            <span className="font-semibold pt-1 border-t mt-auto w-full">
              {item.price} {item.currency}
            </span>
          </div>
        ))}
      </div>

      <MainPagination
        totalPages={meta?.last_page || 1}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default OffersList;
