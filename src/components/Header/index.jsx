import styled from "styled-components";
import colors from "../../constants/colors";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
  return (
    <HeaderContainer>
        <CommonButton onClick={() => navigate("/")} >Início</CommonButton>
        <CommonButton>Sobre</CommonButton>
        <CommonButton>Login</CommonButton>
      <HighlightButton>Cadastro</HighlightButton>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 70vw;
  height: 6vw;
  //background-color: ${colors.lightGrey};
  position: fixed;
  right: 0;
  top: 0;
  padding-right: 4vw;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: "Roboto", sans-serif;

`;

export const HighlightButton = styled.button`
  all: unset;
  //width: 7.9vw;
  //height: 3.2vw;
  padding: 0.85vw;
  border-radius: 0.8vw;
  background-color: ${colors.darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.lightGrey};
  font-weight: 600;
  cursor: pointer; 
  font-size: 1.25vw;
`;

const CommonButton = styled.button`
  all: unset;
  width: 5vw;
  height: 2.8vw;
    color: ${colors.darkGrey};
    font-weight: 600;
    cursor: pointer; 
    margin-right: 1.5vw;
    font-size: 1.25vw;

`