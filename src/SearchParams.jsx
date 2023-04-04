const SearchParams = () => {
  const location = "Los Angeles, California";
  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input id="location" value={location} placeholder="Location" />
        </label>
      </form>
    </div>
  );
};

export default SearchParams;
