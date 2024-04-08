import SearchBox from "../molecules/SearchBox";

const Header = ({ title }) => {
  const handleSearch = () => {
    console.log("검색 버튼 클릭");
  };

  return (
    <div>
      <h1>{title}</h1>
      <SearchBox placeholder="검색어를 입력하세요."  onSearch={handleSearch}/>
    </div>
  );
};

export default Header;
