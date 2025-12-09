export default function PriceFilter({ priceRange, setPriceRange }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Price: ${priceRange[0]} - ${priceRange[1]}</h3>
      <input type="range" min="0" max="2000" value={priceRange[0]} onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])} />
      <input type="range" min="0" max="2000" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], +e.target.value])} />
    </div>
  );
}
