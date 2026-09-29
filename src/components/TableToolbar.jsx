function TableToolbar({
  search,
  setSearch,
  searchPlaceholder = "Search...",
  filterValue,
  setFilterValue,
  filterOptions = [],
}) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
      {/* Search */}
      <div className="relative w-full lg:w-80">
        <span
          className="
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-400
          text-sm
        "
        >
          🔍
        </span>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="
            w-full
            rounded-lg
            border
            border-slate-200
            bg-white
            py-2.5
            pl-9
            pr-4
            text-sm
            text-slate-700
            placeholder:text-slate-400
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        />
      </div>

      {/* Filter */}
      {filterOptions.length > 0 && (
        <select
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          className="
            w-full
            lg:w-auto
            rounded-lg
            border
            border-slate-200
            bg-white
            px-4
            py-2.5
            text-sm
            text-slate-600
            outline-none
            cursor-pointer
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default TableToolbar;
