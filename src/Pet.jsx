const Pet = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <h2>{props.animals}</h2>
      <h2>{props.breed}</h2>
    </div>
  );
};

// Related to ES6, general top level export
export default Pet;
