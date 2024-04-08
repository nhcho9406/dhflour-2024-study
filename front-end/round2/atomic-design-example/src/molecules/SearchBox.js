import Button from "../atoms/Button";

const SearchBox = ({ placeholder, onSearch }) => {
  return (
    <div>
      <input type="text" placeholder={placeholder} />
      <Button text="Search" onClick={onSearch} />
    </div>
  );
};

export default SearchBox;
