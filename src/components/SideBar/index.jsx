import styled from "styled-components";
import Input from "./smallComponents/Input";
import useGetWords from "../../services/hooks/api/words/useGetWords.js";
import { useEffect, useState } from "react";
import PORTUGUESEALPHABET from "../../constants/portugueseAlphabet.js";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FallingLines } from "react-loader-spinner";
import colors from "../../constants/colors";
import { RiMenu4Line } from "react-icons/ri";
import { FiSun, FiMoon } from "react-icons/fi";

export default function SideBar({showSidebar, setShowSidebar}) {
  const { getWords, getWordsLoading, getWordsError } = useGetWords();
  const [words, setWords] = useState([]);
  const [searching, setSearching] = useState(false);
  const [shownWords, setShownWords] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("A");

  const navigate = useNavigate();

  useEffect(() => {
    async function getApiWords() {
      try {
        const data = await getWords();
        const onlyWords = data.map((d) => d.Verbete);
/*         const toShow = onlyWords.filter(
          (w) =>
            w.includes(selectedLetter.toLowerCase()) ||
            w.includes(selectedLetter)
        );
        setShownWords(toShow); */
        setWords(onlyWords);
        console.log(onlyWords)
        setShownWords(onlyWords);
      } catch (err) {
        console.log(err);
      }
    }
    if (words.length <= 0) {
      getApiWords();
    }
  }, []);

  function attWords(letter) {
    setSearching(true)
    const toShow = words.filter(
      (w) => w[0] == letter.toLowerCase() || w[0] == letter
    );
    setShownWords(toShow);
    setSearching(false);
  }

  return (
    <SideBarContainer opened={showSidebar}>
      {showSidebar ? (
        <>
          <div className="menu-icon">
            <RiMenu4Line onClick={() => setShowSidebar(!showSidebar)} />
          </div>

          <Input
            setSelectedLetter={setSelectedLetter}
            setShownWords={setShownWords}
            allWords={words}
            placeholder="Pesquise aqui..."
          >
            {<FaMagnifyingGlass />}
          </Input>
          <DictionaryContainer>
            {getWordsLoading ? (
              <LoadingContainer>
                <h1>Carregando...</h1>
                <FallingLines
                  color={colors.lightGrey}
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
                    <Word onClick={() => navigate(`/palavra/${w}`)} key={i}>
                      {w}
                    </Word>
                  ))}
                </WordsContainer>
              </>
            )}
          </DictionaryContainer>
        </>
      ) : (
        <CompressedSideBar>
          <div className="top">
            <RiMenu4Line onClick={() => setShowSidebar(!showSidebar)} />
            {<FaMagnifyingGlass />}
          </div>
          <div className="bottom">
            <FiMoon />
          </div>
        </CompressedSideBar>
      )}
    </SideBarContainer>
  );
}

const CompressedSideBar = styled.div`
  height: 100%;
  svg {
    color: ${colors.lightGrey};
    font-size: 2vw;
    cursor: pointer;

    border-radius: 0.5vw;
    padding: 0.5vw;
    :hover {
      background-color: ${colors.lightYellow};
    }
  }
  > .top {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    height: 93%;
    > svg {
      margin-top: 2vw;
    }
  }
  > .bottom {
  }
`;

const SideBarContainer = styled.div`
  background-color: #48556a;
  width: ${(p) => (p.opened ? "30vw" : "5vw")};
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  > .menu-icon {
    > svg {
      color: ${colors.lightGrey};
      font-size: 2vw;
      cursor: pointer;
    }
    width: 90%;
    display: flex;
    justify-content: flex-end;
    padding-top: 1vw;
  }

  font-family: "Roboto", sans-serif;
  ::-webkit-scrollbar-track {
    background-color: ${colors.darkGrey};
  }
  ::-webkit-scrollbar {
    width: 1px;
  }
  ::-webkit-scrollbar-thumb {
    background: #6a6a6a79;
  }
`;

const DictionaryContainer = styled.div`
  display: flex;
  width: 85%;
  //margin-top: 9vh;
  //background-color: red;
  position: relative;
  //padding-left: 3.7vw;
  height: 35%;
  //flex-direction: column;
  border: 4px solid ${colors.mediumGrey};
  box-sizing: border-box;
  border-radius: 1vw;
  align-items: center;
  justify-content: space-between;
  margin-top: 1vw;
`;

const AlphabetContainer = styled.div`
  width: 3.8vw;
  color: #d8dfea;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 600;
  font-size: 1vw;
  height: 90%;
  overflow-y: scroll;

  :hover {
    background-color: #fcf05d;
    color: #48556a;
  }
`;

const Letter = styled.button`
  all: unset;
  background-color: ${(p) => (p.selectedLetter ? "#fcf05d" : "")};
  color: ${(p) => (p.selectedLetter ? "#48556a" : "")};
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 0px 1vw 1vw 0px;
  height: 1.65vw;
  cursor: pointer;
  margin-bottom: 1vw;
  align-items: center;
  :hover {
    background-color: #fcf05d;
  }
`;
const WordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  //position: absolute;
  right: 0;
  font-size: 1.1vw;
  //margin-top: 2vw;
  height: 90%;
  overflow-y: scroll;
  :hover {
    background-color: red;
  }
`;

const Word = styled.h1`
  width: 100%;
  margin-bottom: 1.7vw;
  color: #d8dfea;
  font-weight: 600;
  cursor: pointer;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > h1 {
    color: ${colors.lightGrey};
    margin-bottom: 1vw;
  }
`;
