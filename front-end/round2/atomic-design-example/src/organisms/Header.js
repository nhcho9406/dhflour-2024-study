// import SearchBox from "../molecules/SearchBox";
//
// const Header = ({ title }) => {
//   const handleSearch = () => {
//     console.log("검색 버튼 클릭");
//   };
//
//   return (
//     <div>
//       <h1>{title}</h1>
//       <SearchBox placeholder="검색어를 입력하세요."  onSearch={handleSearch}/>
//     </div>
//   );
// };
//
// export default Header;
import React from 'react';
import SearchBox from "../molecules/SearchBox";

const Header = ({ title }) => {
  const handleSearch = () => {
    console.log("검색 버튼 클릭");
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <img src="/logo.png" alt="Logo" style={{ height: '120px' }} />
      <h1>{title}</h1>
      <SearchBox placeholder="검색어를 입력하세요." onSearch={handleSearch} />
      <nav>
        <ul style={{ listStyle: 'none', display: 'flex', padding: 0 }}>
          <li style={{ margin: '0 10px' }}><a href="/">Home</a></li>
          <li style={{ margin: '0 10px' }}><a href="/">About</a></li>
          <li style={{ margin: '0 10px' }}><a href="/">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
