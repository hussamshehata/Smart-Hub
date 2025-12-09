import BrandFilter from "./BrandFilter";
import StorageFilter from "./StorageFilter";
import RamFilter from "./RamFilter";
import RatingFilter from "./RatingFilter";
import PriceFilter from "./PriceFilter";

export default function FiltersSidebar(props) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6 w-80">
      <BrandFilter {...props} />
      <PriceFilter {...props} />
      <StorageFilter {...props} />
      <RamFilter {...props} />
      <RatingFilter {...props} />
    </div>
  );
}
