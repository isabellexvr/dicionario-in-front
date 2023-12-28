import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import styled from "styled-components";
import colors from "../../constants/colors";
import { IoMdCloseCircle } from "react-icons/io";

export const ShowResultsIcon = styled(MdKeyboardDoubleArrowLeft)`
  left: 0.5vw;
  top: 0.5vw;
  position: absolute;
  color: ${colors.lightGrey};
  font-size: 2vw;
  cursor: pointer;
  display: ${(p) => (p.areResultsHidden ? "none" : "initial")};
`;

export const Results = styled.div`
  width: 90%;
  height: 80%;
  background-color: white;
  border: 2px solid ${colors.mediumGrey};
  border-radius: 1vw;
  padding: 1vw;
  box-sizing: border-box;
  font-size: 0.9vw;
  overflow-y: scroll;
  > ul {
    > li {
      cursor: pointer;
      text-decoration: underline;
      margin-bottom: 2px;
    }
  }
`;

export const ResultsBox = styled.div`
  position: absolute;
  width: 15vw;
  height: 35vw;
  background-color: ${colors.lightGrey};
  left: -15vw;
  top: -2px;
  z-index: 1;
  border-radius: 1vw 0 0 1vw;
  border: 2px solid ${colors.lightGrey};
  box-sizing: border-box;
  display: flex;
  display: ${(p) => (p.areResultsHidden ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > .header {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    color: ${colors.darkGrey};
    > svg {
      font-size: 2vw;
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }
    > h1 {
      margin-bottom: 1vw;

      font-weight: 700;
      font-size: 1.75vw;
    }
  }
`;

export const CloseIcon = styled(IoMdCloseCircle)`
  position: absolute;
  right: 1vw;
  top: 1vw;
  font-size: 2vw;
  color: red;
  cursor: pointer;
`;

export const SearchModalContainer = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  //cursor: pointer;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 5;
  cursor: pointer;
`;

export const SearchModalWindow = styled.div`
  font-family: "Roboto", sans-serif;
  position: fixed;
  background-color: ${colors.darkGrey};
  border: 2px solid ${colors.mediumGrey};
  border-radius: 0 1vw 1vw 0;
  padding: 2vw;
  box-sizing: border-box;
  width: 40vw;
  height: 35vw;
  top: 50%; /* Set the top position to 50% of the viewport */
  left: 50%; /* Set the left position to 50% of the viewport */
  transform: translate(-31%, -50%);
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  //position: relative;
  z-index: 7;
`;

export const ModalHeader = styled.div`
  height: 17%;
  width: 60%;
  //background-color: yellow;
  > svg {
    color: ${colors.yellow};
  }
  color: ${colors.lightGrey};
  font-weight: 700;
  text-align: center;
  font-size: 3vw;
  display: flex;
  margin-bottom: 1vw;
  align-items: center;
  justify-content: space-evenly;
`;

export const TabsContainer = styled.div`
  display: flex;
  width: 95%;
  height: 8%;
  //background-color: ${colors.mediumGrey};
  //margin-bottom: 1vw;
`;

export const Tab = styled.div`
  background-color: white;
  color: ${colors.darkGrey};
  opacity: ${(p) => (p.isSelected ? "1" : "0.5")};
  cursor: pointer;
  font-size: 1vw;
  font-weight: 600;
  display: flex;
  align-items: center;
  padding-left: 0.7vw;
  padding-right: 0.7vw;
  border-radius: 0.3vw 0.3vw 0 0;
  margin-right: 0.5vw;
`;

export const ModalBody = styled.div`
  width: 95%;
  height: 70%;
  background-color: white;
  border-radius: 0 0.5vw 0.5vw 0.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SearchForm = styled.form`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > p {
    width: 83%;
    //text-align: center;
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;
    font-size: 0.95vw;
    //font-weight: 600;
  }
  > .input {
    width: 95%;

    display: flex;
    align-items: center;

    position: relative;

    > input {
      all: unset;
      background-color: white;
      border: 1px solid ${colors.mediumGrey};
      padding: 1vw;
      box-sizing: border-box;
      margin-left: 2vw;
      border-radius: 0.5vw;
      width: 77%;
    }
    > label {
      font-weight: 600;
      font-size: 0.95vw;
      width: 32%;
    }
    > .icon-label {
      position: absolute;
      right: 1vw;
      top: 1vw;
      font-size: 1.6vw;
      color: ${colors.darkGrey};
      width: fit-content;
    }
  }
  > .buttons {
    width: 50%;
    margin-top: 1vw;
    font-weight: 600;
    display: flex;
    justify-content: space-evenly;
    height: 17%;
    font-size: 1vw;
    > button:first-child {
      background-color: ${colors.darkGrey};
      color: white;
      border: none;
    }
    > button {
      all: unset;
      padding: 0.6vw;
      border-radius: 0.2vw;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: white;
      border: 1px solid ${colors.mediumGrey};
      box-sizing: border-box;
    }
  }
`;

export const AddedReverseSearchWords = styled.div`
  display: flex;
  justify-content: space-between;
  border-radius: 2%;
  width: 95%;
  height: 40%;
  padding: 2%;
  box-sizing: border-box;

  ::-webkit-scrollbar {
    width: 1px;
  }
  ::-webkit-scrollbar-thumb {
    background: white;
    opacity: 0.5;
  }

  > .to-add {
    position: relative;
    > h1 {
      position: absolute;
      top: 3%;
      font-size: 0.75vw;
      font-weight: 700;
    }
    display: flex;
    padding-top: 10%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 49%;
    padding: 4% 1% 1% 1%;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    background-color: ${colors.mediumGrey};
  }

  > .to-delete {
    position: relative;
    > h1 {
      position: absolute;
      top: 3%;
      font-size: 0.75vw;
      font-weight: 700;
    }
    display: flex;
    padding-top: 10%;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 49%;
    padding: 4% 1% 1% 1%;
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    background-color: ${colors.mediumGrey};
  }
`;

export const ReverseSearchWord = styled.div`
  background-color: ${(p) => (p.isToAdd ? "#a5e85f" : "#ff7c7c")};
  margin-right: 3%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2%;
  border-radius: 10%;
  width: min(50%, 35%);
  > h1 {
    width: 65%;
    font-size: 0.8vw;
    margin-right: 10%;
    word-wrap: break-word;
  }
  > .close-icon {
    width: 30%;
    //background-color: blue;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    > svg {
      font-size: 100%;
      cursor: pointer;
    }
  }
`;

export const ReverseSearchFormStyle = styled.div`
  display: flex;
  width: 95%;
  height: 100%;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  > h1 {
    text-align: center;
    width: 85%;
    font-size: 1vw;
    font-weight: 700;
    margin-top: 2%;
    margin-bottom: 1%;
  }

  > .input {
    width: 95%;
    height: 15%;
    display: flex;
    align-items: center;
    position: relative;
    > input {
      all: unset;
      background-color: white;
      border: 1px solid ${colors.mediumGrey};
      padding: 1vw;
      box-sizing: border-box;
      margin-left: 1vw;
      border-radius: 0.5vw;
      width: 55%;
      height: 20%;
      box-sizing: border-box;
    }

    > button {
      all: unset;
      background-color: ${colors.darkGrey};
      color: white;
      width: 10%;
      height: 55%;
      border-radius: 0.5vw;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      > svg {
        font-size: 1.5vw;
      }
    }

    > label {
      width: 25%;
      font-size: 1vw;
    }
  }
  > .buttons {
    width: 50%;
    margin-top: 1vw;
    font-weight: 600;
    display: flex;
    justify-content: space-evenly;
    height: fit-content;
    font-size: 1vw;
    margin-bottom: 3%;
    > button:first-child {
      background-color: ${colors.darkGrey};
      color: white;
      border: none;
    }
    > button {
      all: unset;
      padding: 0.6vw;
      border-radius: 0.2vw;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background-color: white;
      border: 1px solid ${colors.mediumGrey};
      box-sizing: border-box;
    }
  }
`;

export const AddOrDeleteButton = styled.button`
      all: unset;
      background-color: ${colors.darkGrey};
      opacity: 0.4;
      color: white;
      width: 10%;
      height: 55%;
      border-radius: 0.5vw;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      > svg {
        font-size: 1.5vw;
      }
`