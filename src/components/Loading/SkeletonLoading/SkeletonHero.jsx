import Skeleton from "./Skeleton";

const SkeletonHero = () => {
  return (
    <section className="container">
      <div className="relative h-[60vh] 2xl:h-[80vh]">
        {/* Image Skeleton */}
        <div className="w-full lg:w-2/3 h-full rounded-4xl overflow-hidden">
          <Skeleton width="w-full" height="h-full" rounded="rounded-4xl" />
        </div>

        {/* Text Skeleton */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-4 lg:items-end lg:text-end w-full lg:max-w-lg lg:ms-auto px-4">
          {/* side title */}
          <Skeleton width="w-40" height="h-6" />

          {/* main title line 1 */}
          <Skeleton width="w-72 sm:w-96" height="h-12" />

          {/* main title line 2 */}
          <Skeleton width="w-56 sm:w-80" height="h-12" />
        </div>
      </div>
    </section>
  );
};

export default SkeletonHero;
