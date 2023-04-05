import { useState } from "react";
const ANIMALS = ["bird", "cat", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
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
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
};

export default SearchParams;
