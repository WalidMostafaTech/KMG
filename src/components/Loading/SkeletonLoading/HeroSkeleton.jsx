import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="container py-10">
      <div className="h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px] rounded-3xl overflow-hidden relative">
        {/* Image Skeleton */}
        <Skeleton className="w-full h-full rounded-3xl" />

        {/* Pagination Skeleton */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-white/50"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSkeleton;
