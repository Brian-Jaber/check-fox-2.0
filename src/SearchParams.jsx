import { useState } from "react";

const SearchParams = () => {
  const [location, setLocation] = useState("");
  // Lines 6-8 are equivalent to line 4.  These explain what is happening under the hood
  // const locationHook = useState("");
  // const location = locationHook[0];
  // const setLocation = locationHook[1];

  return (
    <div className="search-params">
      <form>
        <label htmlFor="location">
          Location
          <input
            onChange={(e) => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
          />
        </label>
      </form>
    </div>
  );
};

export default SearchParams;
