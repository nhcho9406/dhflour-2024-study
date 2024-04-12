import DefaultTemplate from "../templates/DefaultTemplate";

const HomePage = () => {
  const sectionStyle = {
    height:'800px',
    background:'lightgray',
    fontSize:'60px',
    paddingTop:'40px',
    paddingBottom:'40px',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
  };

  return (
    <DefaultTemplate>
      <section style={sectionStyle}>홈페이지 View 영역입니다.</section>
    </DefaultTemplate>
  );
};

export default HomePage;
