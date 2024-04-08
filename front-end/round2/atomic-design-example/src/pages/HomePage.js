import DefaultTemplate from "../templates/DefaultTemplate";

const HomePage = () => {
  const sectionStyle = {
    paddingTop:'40px',
    paddingBottom:'40px',
  };

  return (
    <DefaultTemplate>
      <section style={sectionStyle}>홈페이지 View 영역입니다.</section>
    </DefaultTemplate>
  );
};

export default HomePage;
