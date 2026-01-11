import Skeleton from "./Skeleton";

const SkeletonPostSection = ({ center = false }) => {
  return (
    <section
      className={`sectionPadding container flex flex-col gap-4 ${
        center ? "items-center" : "items-start"
      }`}
    >
      <Skeleton width="w-48" height="h-8" rounded="rounded-md" />

      <Skeleton width="w-full max-w-2xl" height="h-8" />

      <Skeleton height="h-64" rounded="rounded-2xl" />
    </section>
  );
};

export default SkeletonPostSection;
