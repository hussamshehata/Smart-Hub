export default function BrandFilter({ brands, selectedBrands, toggleBrand }) {
  return (
    <div>
      <h3 className="font-semibold text-slate-700 mb-3">Brand</h3>
      <div className="space-y-2">
        {brands.map(brand => (
          <label key={brand} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleBrand(brand)}
            />
            {brand}
          </label>
        ))}
      </div>
    </div>
  );
}
