import styled from 'styled-components';

const StyledDiv = styled.div`
  color: blue;
  background-color: lightgrey;
  padding: 10px;
`;

const StyledDiv2 = styled.div`
    color:red;
    background-color: #ffffff;
    padding: 30px;
`
const CssLibrary = () => {
  return <StyledDiv2>styled-components example!!</StyledDiv2>;
};
export default CssLibrary;
