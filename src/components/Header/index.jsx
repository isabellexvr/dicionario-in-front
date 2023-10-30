import styled from "styled-components";
import colors from "../../constants/colors";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../contexts/hooks/useUserInfo";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const [userInfos, setUserInfos] = useState({});

  useEffect(() => {
    if (typeof userInfo !== "string") {
      const decoded = jwtDecode(userInfo);
      setUserInfos(decoded);
    }
  }, [userInfo]);

  return (
    <HeaderContainer>
      {(typeof userInfo == "string") ? (
        <>
          <h1>
            Olá, <strong>{userInfos.nome}</strong>
          </h1>

          <CommonButton>Sobre</CommonButton>
          <CommonButton>Perfil</CommonButton>
          <HighlightButton onClick={() => navigate("/")}>
            Início
          </HighlightButton>
        </>
      ) : (
        <>
          <CommonButton onClick={() => navigate("/")}>Início</CommonButton>
          <CommonButton>Sobre</CommonButton>
          <CommonButton onClick={() => navigate("/login")}>Login</CommonButton>
          <HighlightButton onClick={() => navigate("/cadastro")}>
            Cadastro
          </HighlightButton>
        </>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 70vw;
  height: 6vw;
  position: fixed;
  right: 0;
  top: 0;
  padding-right: 4vw;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: "Roboto", sans-serif;
  > h1 {
    color: ${colors.darkGrey};
    display: flex;
    align-items: center;

    height: 100%;
    margin-right: 2.5vw;
    font-size: 1.7vw;
    > strong {
      font-weight: 700;
    }
  }
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
  margin-right: 1.5vw;
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
`;
