import { useEffect, useState, useCallback } from "react";

/**
 * @param {object} props
 * @param {string} [props.placeholder="Search Project..."]
 * @param {string} [props.initialQuery=""]
 * @param {number} [props.debounceTime=300]
 * @param {function(string): void} props.onSearch
 */
export default function SearchBar({
  placeholder = "placeholder",
  initialQuery = "",
  debounceTime = 200,
  onSearch,
  className = "",
}) {
  const [query, setQuery] = useState(initialQuery);

  const onQueryChange = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) {
        onSearch(query);
      }
    }, debounceTime);

    return () => {
      clearTimeout(handler);
    };
  }, [query, debounceTime, onSearch]);
  return (
    <label className={`input border-2 shadow-sm ${className}`}>
      <svg
        className="h-[1em] opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={onQueryChange}
      />
    </label>
  );
}
