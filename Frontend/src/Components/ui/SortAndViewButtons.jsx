  import React, { useState } from "react";
  import { ChevronDown, LayoutGrid, Grid, List } from "lucide-react";

  export default function SortAndViewButtons({ view, setView, sortOption, setSortOption }) {
    const [open, setOpen] = useState(false);

    const options = [
      "Default",
      "Price: Low to High",
      "Price: High to Low",
      "Name: A-Z",
      "Name: Z-A",
      "Newest",
    ];

    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end w-full border-b border-muted-300 pb-1 mb-6 relative">
        {/* 🔽 Sort Dropdown */}
        <div className="relative mb-3 sm:mb-0">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 text-[15px] font-medium text-neutral-300 px-4 py-2 rounded-lg transition-all"
          >
            Sort by:
            <span className="ml-1 text-neutral-300 font-semibold">{sortOption}</span>
            <ChevronDown
              size={18}
              className={`text-neutral-500 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open && (
            <div className="absolute top-11 left-0 w-56  border border-muted-600 rounded-lg shadow-md z-20 mt-2">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSortOption(opt);
                    setOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-muted-100 transition ${
                    sortOption === opt ? "text-neutral-900 font-semibold bg-muted-50" : "text-muted-600"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center border border-muted-300 rounded-lg overflow-hidden ">
          <button
            onClick={() => setView("grid3")}
            className={`p-2 border-r border-neutral-400 ${
              view === "grid3" ? "bg-muted-100 text-neutral-400" : "text-muted-500"
            } hover:bg-neutral-500 transition`}
            aria-label="Grid 3"
          >
            <LayoutGrid size={18} />
          </button>

          <button
            onClick={() => setView("grid2")}
            className={`p-2 border-r border-neutral-400 ${
              view === "grid2" ? "bg-muted-100 text-neutral-400" : "text-muted-500"
            } hover:bg-neutral-500 transition`}
            aria-label="Grid 2"
          >
            <Grid size={18} />
          </button>

          <button
            onClick={() => setView("list")}
            className={`p-2 ${
              view === "list" ? "bg-muted-100 text-neutral-400" : "text-muted-500"
            } hover:bg-neutral-500 transition`}
            aria-label="List"
          >
            <List size={18} />
          </button>
        </div>
      </div>
    );
  }
