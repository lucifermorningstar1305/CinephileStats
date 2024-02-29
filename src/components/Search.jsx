import { useRef } from "react";
import { useKey } from "../hooks/useKey";

const Search = ({ query, setQuery }) => {
  const inputElement = useRef(null);

  useKey("Enter", function () {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  });

  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
      />
    </div>
  );
};

export default Search;
