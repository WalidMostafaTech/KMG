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
            <img
              src={item.game_icon}
              alt={item.title}
              className="max-h-[70px] object-contain"
            />
            <p className="text-sm">{item.title}</p>
            <span>{item.price} $</span>
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
