import { useState } from 'react';

/**
 * SearchBar component provides a text input for filtering recipes by title or tags.
 * It debounces the user input to avoid frequent calls and triggers the onSearch
 * callback when the query changes.
 *
 * @param {Object} props
 * @param {Function} props.onSearch - Callback invoked with the search query
 */
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="mb-4">
      <label htmlFor="search" className="sr-only">
        Search recipes
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search by title or tag..."
        className="block w-full md:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        value={query}
        onChange={handleChange}
      />
    </div>
  );
}