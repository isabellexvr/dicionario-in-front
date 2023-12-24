import styled from "styled-components";
import colors from "../../constants/colors";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../../contexts/hooks/useUserInfo";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { RiMenu4Line } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import logo from "../../assets/logo.png"
import { RiFileList2Fill } from "react-icons/ri";


export default function Header({ setShowSearchModal }) {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const [userInfos, setUserInfos] = useState({});

  useEffect(() => {
    if (typeof userInfo == "string") {
      const decoded = jwtDecode(userInfo);
      //console.log(decoded)
      setUserInfos(decoded);
    }
  }, [userInfo]);

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate("/")} alt="logo" src={logo}/>
      {typeof userInfo == "string" ? (
        <>
          <h1>
            Olá,&ensp;<strong>{userInfos.nome}</strong>
          </h1>
          <CommonButton>Perfil</CommonButton>
          {userInfos.isAdmin && (
            <CommonButton onClick={() => navigate("/user/admin")}>
              Admin
            </CommonButton>
          )}
                    <CommonButton onClick={() => {
                  setShowSearchModal(true);
                }}>
            <FiSearch />
            Pesquisar
          </CommonButton>

          <HighlightButton onClick={() => navigate("/")}>
            Início
          </HighlightButton>

        </>
      ) : (
        <>
          {screen.width <= 600 ? (
            <>
              <RiMenu4Line
                
              />
              <HighlightButton onClick={() => navigate("/")}>
                Início
              </HighlightButton>
              <HighlightButton onClick={() => navigate("/sobre")}>
                Sobre
              </HighlightButton>
              
            </>
          ) : (
            <>
              <CommonButton onClick={() => navigate("/")}>Início</CommonButton>
              <CommonButton onClick={() => navigate("/sobre")}>
                Sobre
              </CommonButton>
            </>
          )}
          <CommonButton onClick={() => navigate("/referencias")}>
          <RiFileList2Fill />
            Referências
          </CommonButton>
          <CommonButton onClick={() => {
                  setShowSearchModal(true);
                }}>
            <FiSearch />
            Pesquisar
          </CommonButton>

        </>
      )}
    </HeaderContainer>
  );
}

const Logo = styled.img`
  
  pointer-events: none;
  width: 15%;
  position: absolute;
  left: 3%;
  cursor: pointer;
`

const HeaderContainer = styled.div`
  background-color: white;
  :hover {
    background-color: ${colors.lightGrey};
  }
  width: 80vw;
  height: 5vw;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;
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
  > svg {
    font-size: 8vw;
    color: ${colors.lightGrey};
    position: absolute;
    left: 5vw;
  }
  @media (max-width: 600px) {
    height: 15vw;
    width: 100vw;
    background-color: ${colors.darkGrey};
    > h1 {
      font-size: 5.5vw;
      margin-right: 5vw;
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
  @media (max-width: 600px) {
    font-size: 4vw;
    padding: 1.5vw;
    border-radius: 1vw;
  }
`;

const CommonButton = styled.button`
  all: unset;
  width: fit-content;
  padding: 0.1vw 0.5vw 0.1vw 0.5vw;

  height: 2.8vw;
  color: ${colors.darkGrey};
  font-weight: 600;
  border: 2px solid ${colors.lightGrey};
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 0.5vw;
  cursor: pointer;
  margin-right: 1.5vw;
  font-size: 1.1vw;
  >svg{
    font-size: 1.25vw;
    margin-right: 0.45vw;
  }

  @media (max-width: 600px) {
    font-size: 4vw;
    padding: 1.5vw;
    border-radius: 1vw;
    margin-right: 7vw;
  }
`;
