import image from "@/assets/images/slider-img.png";
import MainPagination from "@/components/common/MainPagination";

const list = Array.from({ length: 8 }).map((_, index) => ({
  id: index + 1,
  image: image,
  title: `offer ${index + 1}`,
  disc: `offer ${index + 1} disc`,
}));

const OffersList = ({ onOfferClick, currentOffer }) => {
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-fit">
        {list.map((item) => (
          <div
            key={item.id}
            onClick={() => onOfferClick(item)}
            className={`card flex flex-col gap-2 cursor-pointer hover:scale-105 duration-200 ${
              item?.id === currentOffer?.id ? "border-primary border-2" : ""
            }`}
          >
            <img
              src={item.image}
              alt=""
              className="max-h-[70px] object-contain"
            />
            <p>{item.title}</p>
            <span>{item.disc}</span>
          </div>
        ))}
      </div>

      <MainPagination page={1} totalPages={10} onChange={() => {}} />
    </div>
  );
};

export default OffersList;
