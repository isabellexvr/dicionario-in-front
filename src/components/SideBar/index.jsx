import styled from "styled-components";
import Input from "./smallComponents/Input";
import useGetWords from "../../services/hooks/api/words/useGetWords.js";
import { useEffect, useState } from "react";
import PORTUGUESEALPHABET from "../../constants/portugueseAlphabet.js";

export default function SideBar() {
  const { getWords, getWordsLoading, getWordsError } = useGetWords();
  const [words, setWords] = useState([]);
  const [shownWords, setShownWords] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("A");

  useEffect(() => {
    async function getApiWords() {
      try {
        const data = await getWords();
        const onlyWords = data.map((d) => d.Verbete);
        const toShow = onlyWords.filter(
          (w) =>
            w.includes(selectedLetter.toLowerCase()) ||
            w.includes(selectedLetter)
        );
        setShownWords(toShow);
        setWords(onlyWords);
      } catch (err) {
        console.log(err);
      }
    }
    if (words.length <= 0) {
      getApiWords();
    }
  }, [selectedLetter]);

  function attWords(letter) {
    const toShow = words.filter(
      (w) => w[0] == letter.toLowerCase() || w[0] == letter
    );
    setShownWords(toShow);
  }

  return (
    <SideBarContainer>
      <Input />
      <DictionaryContainer>
        {getWordsLoading ? (
          <>carregando...</>
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
                <Word key={i}>{w}</Word>
              ))}
            </WordsContainer>
          </>
        )}
      </DictionaryContainer>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  background-color: #48556a;
  width: 30vw;

  position: fixed;
  left: 0;
  top: 0;
  overflow-y: scroll;
  //mudar scroll
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto", sans-serif;
`;

const DictionaryContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: red;
  position: relative;
  //padding-left: 3.7vw;
`;

const AlphabetContainer = styled.div`
  width: 3.2vw;
  color: #d8dfea;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: fixed;
  left: 0;
  font-weight: 500;
  font-size: 1vw;
`;

const Letter = styled.button`
  all: unset;
  background-color: ${(p) => (p.selectedLetter ? "#fcf05d" : "")};
  color: ${(p) => (p.selectedLetter ? "#48556a" : "")};
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 0px 1vw 1vw 0px;
  height: 1.4vw;
  cursor: pointer;
  margin-bottom: 0.25vw;
  align-items: center;
`;
const WordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 85%;
  justify-content: center;
  position: absolute;
  right: 0;
`;

const Word = styled.h1`
  width: 100%;
  margin-bottom: 0.7vw;
    color: #d8dfea;
    font-weight: 600;
`;
