import styled from "styled-components";
import colors from "../../constants/colors";

export default function HomePage() {
  return (
    <HomePageContainer>
      <Word>Dicionário de Iluminação Natural</Word>
    </HomePageContainer>
  );
}

const HomePageContainer = styled.section`
  background-color: ${colors.lightGrey};
  height: 100vh;
  padding-top: 3vw;
  padding-left: 34vw;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
`;
const Word = styled.h1`
  font-size: 3vw;
  background-color: ${colors.lightYellow};
  width: fit-content;
  padding: 1.3vw;
  border-radius: 1.5vw;
  color: ${colors.darkGrey};
  font-weight: 600;
`;
