import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import Background from "../../constants/Background";

export default function HomePage({ showSidebar, setShowSidebar }) {

  return (
    <Background showSidebar={showSidebar}>
      <Word>Dicionário Lumeeiro de luz, iluminação e termos afins</Word>
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

  @media (max-width: 600px) {
    font-size: 13vw;
    width: 70%;
    margin-left: 10vw;
    border-radius: 5vw;
    padding: 4vw;
    line-height: 13vw;
    text-align: center;
  }
`;
