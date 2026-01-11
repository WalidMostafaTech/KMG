import Skeleton from "./Skeleton";

const SkeletonCards = ({ size = "sm", cardNum = 6 }) => {
  return (
    <section
      className={`sectionPadding container grid gap-6 ${
        size === "sm"
          ? "grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
          : size === "md"
          ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      } place-items-center`}
    >
      {Array.from({ length: cardNum }).map((_, index) => (
        <Skeleton
          key={index}
          height={`${size === "sm" ? "h-40" : size === "md" ? "h-60" : "h-96"}`}
          rounded="rounded-lg"
        />
      ))}
    </section>
  );
};

export default SkeletonCards;
