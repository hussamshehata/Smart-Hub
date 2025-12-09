import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Grid3x3, Grid2x2, List } from "lucide-react";

export default function ProductsLayout({
  products = [],
  ProductCard,
  brands = [],
  storageOptions = [],
  ramOptions = []
}) {

  const [view, setView] = useState("grid3");
  const [sortOption, setSortOption] = useState("Default");
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedStorage, setSelectedStorage] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);

  const toggleBrand = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  const toggleStorage = (value) =>
    setSelectedStorage((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );

  const toggleRam = (value) =>
    setSelectedRam((prev) =>
      prev.includes(value) ? prev.filter((r) => r !== value) : [...prev, value]
    );

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedStorage([]);
    setSelectedRam([]);
    setPriceRange([0, 2000]);
    setMinRating(0);
    setSearchQuery("");
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (
        selectedBrands.length === 0 &&
        selectedStorage.length === 0 &&
        selectedRam.length === 0 &&
        searchQuery.trim() === "" &&
        minRating === 0 &&
        priceRange[0] === 0 &&
        priceRange[1] === 2000
      ) {
        return true;
      }

    
      const matchesSearch =
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase());

     
      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    
      const matchesStorage =
        selectedStorage.length === 0 ||
        selectedStorage.includes(product.storage?.toString());

    
      const matchesRam =
        selectedRam.length === 0 || selectedRam.includes(product.ram?.toString());

      
      const productPrice = Number(product.price?.toString().replace("$", ""));
      const matchesPrice =
        productPrice >= priceRange[0] && productPrice <= priceRange[1];

     
      const matchesRating = product.rating >= minRating;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesStorage &&
        matchesRam &&
        matchesPrice &&
        matchesRating
      );
    });
  }, [
    products,
    searchQuery,
    selectedBrands,
    selectedStorage,
    selectedRam,
    priceRange,
    minRating,
  ]);


  const sortedProducts = useMemo(() => {
    let sorted = [...filteredProducts];

    switch (sortOption) {
      case "Price: Low to High":
        sorted.sort(
          (a, b) =>
            Number(a.price?.toString().replace("$", "")) -
            Number(b.price?.toString().replace("$", ""))
        );
        break;

      case "Price: High to Low":
        sorted.sort(
          (a, b) =>
            Number(b.price?.toString().replace("$", "")) -
            Number(a.price?.toString().replace("$", ""))
        );
        break;

      case "Name: A-Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "Name: Z-A":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "Rating: High to Low":
        sorted.sort((a, b) => b.rating - a.rating);
        break;

      case "Best Selling":
        sorted.sort((a, b) => {
          const aCount = Number(a.soldCount?.toString().replace("k", "")) * 1000 || 0;
          const bCount = Number(b.soldCount?.toString().replace("k", "")) * 1000 || 0;
          return bCount - aCount;
        });
        break;

      default:
        break;
    }

    return sorted;
  }, [filteredProducts, sortOption]);

  const activeFiltersCount =
    selectedBrands.length +
    selectedStorage.length +
    selectedRam.length +
    (minRating > 0 ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 2000 ? 1 : 0);

  const gridClasses = {
    grid3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
    grid2: "grid grid-cols-1 sm:grid-cols-2 gap-6",
    list: "flex flex-col gap-4",
  };

 
  return (
    <>
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
  <div className="relative w-full max-w-md">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full pl-12 pr-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 bg-white shadow-sm text-sm"
    />
  </div>
</div>


      <div className="flex gap-6">
        {/* Sidebar Filters */}
        {showFilters && (
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <SlidersHorizontal size={20} />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </h2>

                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="text-sm text-blue-600">
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">

                {/* Brands */}
                {brands.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">Brand</h3>
                    <div className="space-y-2">
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleBrand(brand)}
                          />
                          <span className="text-sm">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Storage */}
                {storageOptions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">Storage</h3>
                    <div className="space-y-2">
                      {storageOptions.map((s) => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedStorage.includes(s)}
                            onChange={() => toggleStorage(s)}
                          />
                          <span className="text-sm">{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* RAM */}
                {ramOptions.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-slate-700 mb-3">RAM</h3>
                    <div className="space-y-2">
                      {ramOptions.map((r) => (
                        <label key={r} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedRam.includes(r)}
                            onChange={() => toggleRam(r)}
                          />
                          <span className="text-sm">{r}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">

          {/* Top Bar */}
          <div className="bg-white rounded-xl shadow-lg p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg"
              >
                <SlidersHorizontal size={18} />
                {showFilters ? "Hide" : "Show"} Filters
              </button>

              <span className="text-sm text-slate-600">
                {sortedProducts.length} products found
              </span>
            </div>

            <div className="flex items-center gap-3">

              {/* View Selector */}
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                <button onClick={() => setView("grid3")} className={`p-2 rounded ${view === "grid3" ? "bg-white shadow-sm" : ""}`}>
                  <Grid3x3 size={18} />
                </button>

                <button onClick={() => setView("grid2")} className={`p-2 rounded ${view === "grid2" ? "bg-white shadow-sm" : ""}`}>
                  <Grid2x2 size={18} />
                </button>

                <button onClick={() => setView("list")} className={`p-2 rounded ${view === "list" ? "bg-white shadow-sm" : ""}`}>
                  <List size={18} />
                </button>
              </div>

              {/* Sorting */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 bg-slate-100 rounded-lg"
              >
                <option value="Default">Sort by</option>
                <option value="Best Selling">Best Selling</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Name: A-Z">Name: A-Z</option>
                <option value="Name: Z-A">Name: Z-A</option>
                <option value="Rating: High to Low">Rating: High to Low</option>
              </select>
            </div>
          </div>

          {/* PRODUCTS GRID */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <p className="text-slate-600 text-lg">No products found matching your filters</p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={gridClasses[view]}>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
