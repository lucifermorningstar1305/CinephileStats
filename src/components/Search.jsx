const Search = ({ query, setQuery }) => {
  return (
    <div>
      <input
        className="search"
        type="text"
        placeholder="Search movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Search;
