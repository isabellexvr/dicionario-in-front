import styled from "styled-components";
import Input from "./smallComponents/Input";
import useGetWords from "../../services/hooks/api/words/useGetWords.js";
import useGetWordsByFirstChar from "../../services/hooks/api/words/useGetWordsByFirstChar";
import { useEffect, useState } from "react";
import PORTUGUESEALPHABET from "../../constants/portugueseAlphabet.js";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FallingLines } from "react-loader-spinner";
import colors from "../../constants/colors";
import { RiMenu4Line, RiLogoutCircleLine } from "react-icons/ri";
import { FiMoon } from "react-icons/fi";
import useUserInfo from "../../contexts/hooks/useUserInfo";
import useSearch from "../../services/hooks/api/words/useSearch";

export default function SideBar({ selectedTab, setSelectedTab }) {
  //const { getWords, getWordsLoading, getWordsError } = useGetWords();
  const {
    getWordByFirstCharData,
    getWordByFirstCharLoading,
    getWordByFirstCharError,
    getWordByFirstChar,
  } = useGetWordsByFirstChar();

  const { search, searchLoading, searchError } = useSearch();

  const [words, setWords] = useState([]);
  const [shownWords, setShownWords] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("A");
  const { setUserInfo } = useUserInfo();

  const navigate = useNavigate();
  useEffect(() => {
    async function getApiWords() {
      try {
        const data = await getWordByFirstChar(selectedLetter);
        //console.log(data);
        const onlyWords = data.map((d) => d.Verbete);
        setWords(onlyWords);
        setShownWords(onlyWords);
      } catch (err) {
        console.log(err);
      }
    }

    getApiWords();
  }, [selectedLetter]);

  function attWords(letter) {
    const toShow = words.filter(
      (w) => w[0] == letter.toLowerCase() || w[0] == letter
    );
    setShownWords(toShow);
  }

  return (
    <SideBarContainer>
      <>
        <Input
          setShownWords={setShownWords}
          allWords={words}
          placeholder="Pesquisa simples..."
          search={search}
          searchLoading={searchLoading}
        >
          {<FaMagnifyingGlass />}
        </Input>
        <DictionaryContainer>
          {getWordByFirstCharLoading || searchLoading ? (
            <LoadingContainer>
              <h1>Carregando...</h1>
              <FallingLines
                color={colors.darkGrey}
                width="100"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            </LoadingContainer>
          ) : (
            <>
              <AlphabetContainer>
                {PORTUGUESEALPHABET.map((l, i) => (
                  <Letter
                    onClick={() => {
                      setSelectedLetter(l);
                      attWords(l);
                    }}
                    selectedLetter={selectedLetter == l}
                    key={i}
                  >
                    {l}
                  </Letter>
                ))}
              </AlphabetContainer>
              <WordsContainer>
                {shownWords.map((w, i) => (
                  <Word
                    onClick={() => {
                      if (screen.width <= 600) {
                      }
                      setSelectedTab(0);
                      navigate(`/palavra/${w}`);
                    }}
                    key={i}
                  >
                    {w}
                  </Word>
                ))}
              </WordsContainer>
            </>
          )}
        </DictionaryContainer>
        <OpenedSidebarBottom>

          <RiLogoutCircleLine
            onClick={() => {
              localStorage.removeItem("userInfo");
              setUserInfo({});
              navigate("/");
            }}
          />
        </OpenedSidebarBottom>
      </>
    </SideBarContainer>
  );
}

const OpenedSidebarBottom = styled.div`
  height: 15%;
  width: 75%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 1;

  > svg {
    color: ${colors.darkGrey};
    font-size: 2vw;
    cursor: pointer;

    border-radius: 0.5vw;
    padding: 0.5vw;
  }
  @media (max-width: 600px) {
    > svg {
      font-size: 7vw;
    }
  }
`;

const SideBarContainer = styled.div`
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
    width: 1px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.lightYellow};
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

const DictionaryContainer = styled.div`
  display: flex;
  width: 92%;
  position: relative;
  height: 80%;
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

const AlphabetContainer = styled.div`
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
    background-color: #fcf05d;
    color: #48556a;
  }
  @media (max-width: 600px) {
    width: 30%;
    font-size: 4vw;
    overflow-y: scroll;
    height: 100%;
  }
`;

const Letter = styled.button`
  all: unset;
  background-color: ${(p) => (p.selectedLetter ? "#fcf05d" : "")};
  color: ${colors.darkGrey};
  width: 90%;
  display: flex;
  justify-content: center;
  border-radius: 0px 0.3vw 0.3vw 0px;
  padding-top: 0.23vw;
  padding-bottom: 0.23vw;
  cursor: pointer;
  margin-bottom: 0.75vw;
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
const WordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  right: 0;
  font-size: 0.8vw;
  height: 96%;
  z-index: 2;
  color: ${colors.darkGrey};
  overflow-y: scroll;
  padding-left: 0.5vw;
  box-sizing: border-box;


  @media (max-width: 600px) {
    font-size: 4vw;
    height: 100%;
    padding: 2vw;

    box-sizing: border-box;
    z-index: 1;
  }
`;

const Word = styled.h1`
  width: 100%;
  margin-bottom: 0.8vw;
  color: ${colors.darkGrey};
  font-weight: 600;
  cursor: pointer;
  z-index: 2;

  @media (max-width: 600px) {
    margin-top: 2vw;
    margin-bottom: 2vw;
  }
`;

const LoadingContainer = styled.div`
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
