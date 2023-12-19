import React from "react";
import styled from "styled-components";
import colors from "../../constants/colors";
import Background from "../../constants/Background";
import logo from "../../assets/logo.png";

export default function HomePage() {
  return (
    <Background>
      <Logo src={logo} />
    </Background>
  );
}

const Logo = styled.img`
  pointer-events: none;
  width: 40vw;
`;
//palavra do dia
