import Skeleton from "./Skeleton";

const SkeletonPageBanner = () => {
  return (
    <section className="p-4 pt-0 lg:pt-4">
      <div className="overflow-hidden rounded-3xl lg:rounded-[50px] shadow-lg shadow-myGold/50 border border-myGold p-4 lg:p-8">
        <div className="w-full min-h-[250px] lg:min-h-[300px] flex flex-col items-center justify-center gap-3 lg:gap-4 rounded-2xl lg:rounded-[40px] p-4">
          <Skeleton width="w-32" height="h-4" rounded="rounded-full" />

          <Skeleton width="w-60" height="h-7" />

          <Skeleton width="w-full max-w-3xl" height="h-5" />
          <Skeleton width="w-full max-w-2xl" height="h-5" />
        </div>
      </div>
    </section>
  );
};

export default SkeletonPageBanner;
