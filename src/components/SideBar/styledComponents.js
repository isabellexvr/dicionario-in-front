import styled from "styled-components";
import colors from "../../constants/colors";
import { IoFilterSharp } from "react-icons/io5";


export const SideBarContainer = styled.div`
  background-color: ${colors.lightGrey};
  border-right: 2px solid ${colors.mediumGrey};
  width: 20vw;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 5;
  box-sizing: border-box;

  > .menu-icon {
    > svg {
      color: ${colors.darkGrey};
      font-size: 1.5vw;
      cursor: pointer;
    }

    width: 90%;
    display: flex;
    justify-content: flex-end;
    padding-top: 1vw;
  }

  font-family: "Roboto", sans-serif;
  ::-webkit-scrollbar-track {
    //background-color: ${colors.darkGrey};
  }
  ::-webkit-scrollbar {
    width: 3px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.mediumGrey};
    height: 10%;

    opacity: 0.5;
  }
  @media (max-width: 600px) {
    //width: ${(p) => (p.opened ? "100vw" : "0")};
    > .menu-icon {
      > svg {
        font-size: 7vw;
      }
      padding-top: 3vw;
    }
  }
`;

export const DictionaryContainer = styled.div`
  display: flex;
  width: 92%;
  position: relative;
  height: 80%;
  background-color: white;
  border: 2px solid ${colors.mediumGrey};
  box-sizing: border-box;
  border-radius: 0.8vw;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.2vw;
  z-index: 2;

  @media (max-width: 600px) {
    height: 75%;
    margin-top: 3vw;
    align-items: flex-start;
    overflow-y: scroll;
    z-index: 2;
  }
`;

export const AlphabetContainer = styled.div`
  width: 25%;
  color: #d8dfea;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 800;
  font-size: 0.75vw;
  height: 97%;
  overflow-y: scroll;
  :hover {
    background-color: ${colors.lightYellow};
    color: #48556a;
  }
  @media (max-width: 600px) {
    width: 30%;
    font-size: 4vw;
    overflow-y: hidden;
    height: 100%;
  }
`;

export const Letter = styled.button`
  all: unset;
  background-color: ${(p) => (p.selectedLetter ? "#fcf05d" : "")};
  border-left: none;
  box-sizing: border-box;
  color: ${colors.darkGrey};
  width: 80%;

  display: flex;
  justify-content: center;
  border-radius: 0 0.3vw 0.3vw 0;
  padding: 5%;
  padding-bottom: 5%;
  cursor: pointer;
  margin-bottom: 2%;
  align-items: center;
  :hover {
    background-color: #fcf05d;
  }
  @media (max-width: 600px) {
    height: 45%;
    padding-top: 1.5vw;
    padding-bottom: 1.5vw;
    margin-bottom: 2vw;
    margin-top: 2vw;
    border-radius: 0px 2vw 2vw 0px;
  }
`;
export const WordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  right: 0;
  font-size: 0.8vw;
  height: 97%;
  z-index: 2;
  color: ${colors.darkGrey};
  overflow-y: scroll;
  padding-left: 0.5vw;
  box-sizing: border-box;
  :hover {
    background-color: ${colors.lightYellow};
  }

  @media (max-width: 600px) {
    font-size: 4vw;
    height: 100%;
    padding: 2vw;

    box-sizing: border-box;
    z-index: 1;
  }
`;

export const Word = styled.h1`
  width: 90%;
  padding: 0.3vw;
  color: ${colors.darkGrey};
  font-weight: 600;
  margin-bottom: 2%;
  cursor: pointer;
  z-index: 2;
  border-radius: 0.3vw;
  background-color: ${(p) => (p.isSelected ? colors.yellow : "white")};

  @media (max-width: 600px) {
    margin-top: 2vw;
    margin-bottom: 2vw;
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > h1 {
    color: ${colors.darkGrey};
    margin-bottom: 1vw;
  }
`;

export const FilterIcon = styled(IoFilterSharp)`
  color: ${colors.darkGrey};
  font-size: 2vw;
`

export const FooterIcons = styled.div`
  //background-color: red;
  height: 18%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
`