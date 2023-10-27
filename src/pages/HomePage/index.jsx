import styled from "styled-components";
import colors from "../../constants/colors";
import Background from "../../constants/Background";

export default function HomePage() {
  return (
    <Background>
      <Word>Dicionário de Iluminação Natural</Word>
    </Background>
  );
}


const Word = styled.h1`
  font-size: 3vw;
  background-color: ${colors.lightYellow};
  width: fit-content;
  padding: 1.3vw;
  border-radius: 1.5vw;
  color: ${colors.darkGrey};
  font-weight: 600;
`;
