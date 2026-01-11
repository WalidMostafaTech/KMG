import Skeleton from "./Skeleton";

const SkeletonContactUs = () => {
  return (
    <section className="sectionPadding container">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 rounded-4xl overflow-hidden w-full max-w-7xl mx-auto">
        {/* Map Skeleton */}
        <div className="col-span-1 lg:col-span-5 min-h-[500px] bg-white order-2 lg:order-1 rounded-t-4xl lg:rounded-t-none overflow-hidden">
          <Skeleton width="w-full" height="h-full" rounded="rounded-none" />
        </div>

        {/* Form Skeleton */}
        <div className="col-span-1 lg:col-span-7 p-6 lg:p-10 space-y-5 order-1 lg:order-2 content-center bg-myDark-2 rounded-b-4xl lg:rounded-b-none">
          {/* Title */}
          <div className="space-y-3">
            <Skeleton width="w-24" height="h-4" />
            <Skeleton width="w-full" height="h-6" />
            <Skeleton width="w-3/4" height="h-6" />
          </div>

          {/* Name */}
          <Skeleton width="w-full" height="h-[42px]" rounded="rounded-lg" />

          {/* Phone */}
          <Skeleton width="w-full" height="h-[42px]" rounded="rounded-lg" />

          {/* Email */}
          <Skeleton width="w-full" height="h-[42px]" rounded="rounded-lg" />

          {/* Message */}
          <Skeleton width="w-full" height="h-28" rounded="rounded-lg" />

          {/* Button */}
          <Skeleton width="w-40" height="h-[44px]" rounded="rounded-lg" />
        </div>
      </div>
    </section>
  );
};

export default SkeletonContactUs;
