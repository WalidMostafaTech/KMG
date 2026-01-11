import Skeleton from "./Skeleton";

const SkeletonDetailsSection = ({ reverse = false }) => {
  return (
    <section
      className={
        "sectionPadding container grid grid-cols-1 md:grid-cols-2 items-center gap-4 md:gap-16"
      }
    >
      <Skeleton
        height="h-72"
        rounded="rounded-2xl"
        className={`${reverse ? "order-1" : ""}`}
      />

      <div className={`space-y-4 ${reverse ? "-order-1" : ""}`}>
        <Skeleton width="w-48" height="h-4" rounded="rounded-md" />

        <Skeleton width="w-full max-w-md" height="h-6" />

        <div className="space-y-1">
          <Skeleton height="h-3" width="w-full max-w-lg" />
          <Skeleton height="h-3" width="w-full max-w-xl" />
          <Skeleton height="h-3" width="w-full max-w-md" />
          <Skeleton height="h-3" width="w-full max-w-sm" />
          <Skeleton height="h-3" width="w-full max-w-2xl" />
          <Skeleton height="h-3" width="w-full max-w-lg" />
          <Skeleton height="h-3" width="w-full max-w-xl" />
          <Skeleton height="h-3" width="w-full max-w-md" />
          <Skeleton height="h-3" width="w-full max-w-sm" />
        </div>
      </div>
    </section>
  );
};

export default SkeletonDetailsSection;
