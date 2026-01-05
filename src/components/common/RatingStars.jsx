import { Star } from "lucide-react";

const RatingStars = ({
  rating = 0,
  max = 5,
  size = 16,
  color = "text-yellow-500",
}) => {
  return (
    <div className="flex items-center gap-0.5" dir="ltr">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;

        if (rating >= starValue) {
          // Full star
          return (
            <Star key={index} size={size} className={`${color} fill-current`} />
          );
        }

        if (rating >= starValue - 0.5) {
          // Half star
          return (
            <div
              key={index}
              className="relative"
              style={{ width: size, height: size }}
            >
              <Star size={size} className={color} />
              <Star
                size={size}
                className={`${color} fill-current absolute top-0 left-0`}
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            </div>
          );
        }

        // Empty star
        return <Star key={index} size={size} className={color} />;
      })}
    </div>
  );
};

export default RatingStars;
