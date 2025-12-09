export default function RatingFilter({ minRating, setMinRating }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Rating</h3>
      {[5,4,3,2,1,0].map(rating => (
        <label key={rating} className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="rating" checked={minRating === rating} onChange={() => setMinRating(rating)} />
          {rating} ⭐ & up
        </label>
      ))}
    </div>
  );
}
