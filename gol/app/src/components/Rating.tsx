export default function Rating({ rating = 0, length = 5 }) {
  const fullStarsCount = Math.round(rating);
  const emptyStarsCount = length - fullStarsCount;
  const stars = "★".repeat(fullStarsCount) + "☆".repeat(emptyStarsCount);

  return (
    <div className="flex text-xl" aria-label={`${rating} out of 5 stars`}>
      {stars}
    </div>
  );
}
