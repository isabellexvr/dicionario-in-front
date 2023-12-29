import Input from "./smallComponents/Input";
import useGetWords from "../../services/hooks/api/words/useGetWords.js";
import { useEffect, useState } from "react";
import PORTUGUESEALPHABET from "../../constants/portugueseAlphabet.js";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FallingLines } from "react-loader-spinner";
import colors from "../../constants/colors";
import useUserInfo from "../../contexts/hooks/useUserInfo";
import useSimpleSearch from "../../services/hooks/api/words/useSimpleSearch";
import useWords from "../../contexts/hooks/useWords";
import {
  SideBarContainer,
  DictionaryContainer,
  AlphabetContainer,
  Letter,
  WordsContainer,
  Word,
  LoadingContainer,
  FilterIcon,
  FooterIcons,
} from "./styledComponents";

export default function SideBar({
  selectedTab,
  setSelectedTab,
  globalSelectedWord,
  setGlobalSelectedWord,
  letterOrWordSelection,
}) {
  const { getWords, getWordsLoading, getWordsError } = useGetWords();

  const { words, setWords } = useWords();

  const { simpleSearch, simpleSearchLoading, simpleSearchError } =
    useSimpleSearch();

  const [apiWords, setApiWords] = useState([]);
  const [shownWords, setShownWords] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(0);
  const { setUserInfo } = useUserInfo();
  const [attWordsLoading, setAttWordsLoading] = useState(false);

  const navigate = useNavigate();

  function attWords(letter) {
    const toShow = apiWords.filter(
      (w) => w[0] == letter.toLowerCase() || w[0] == letter
    );
    setShownWords(toShow);
  }
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (letterOrWordSelection === 0) {
        if (e.key === "ArrowDown") {
          if (selectedLetter < PORTUGUESEALPHABET.length - 1) {
            setSelectedLetter((prevLetter) => {
              const nextLetter = prevLetter + 1;
              return nextLetter;
            });
            setGlobalSelectedWord(0);
          }
        } else if (e.key === "ArrowUp") {
          if (selectedLetter > 0) {
            setSelectedLetter((prevLetter) => {
              const prev = prevLetter - 1;
              return prev;
            });
            setGlobalSelectedWord(0);
          }
        }
      } else if (letterOrWordSelection === 1) {
        if(e.key === "Enter"){
          navigate(`/palavra/${shownWords[globalSelectedWord]}`)
        }
        if (e.key === "ArrowDown") {
          if (globalSelectedWord < shownWords.length - 1) {
            setGlobalSelectedWord((prevWord) => {
              const prev = prevWord + 1;
              return prev;
            });
          }
        } else if (e.key === "ArrowUp") {
          if (globalSelectedWord > 0) {
            setGlobalSelectedWord((prevWord) => {
              const prev = prevWord - 1;
              return prev;
            });
          }
        }
      }
    };

    attWords(PORTUGUESEALPHABET[selectedLetter]);

    document.addEventListener("keydown", handleKeyDown);

    async function getApiWords() {
      try {
        const data = await getWords();
        const hashtable = {};

        const onlyWords = data.map((d) => d.Verbete);
        setApiWords(onlyWords);
        setShownWords(onlyWords);
        onlyWords.forEach((w) => {
          hashtable[w] = true;
        });
        setWords(onlyWords);
      } catch (err) {
        console.log(err);
      }
    }
    if (apiWords.length < 1) getApiWords();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedLetter, globalSelectedWord, letterOrWordSelection]);

  return (
    <SideBarContainer>
      <>
        <Input
          setShownWords={setShownWords}
          allWords={apiWords}
          placeholder="Pesquisa simples..."
          search={simpleSearch}
          simpleSearchLoading={simpleSearchLoading}
          setSelectedLetter={setSelectedLetter}
        >
          {<FaMagnifyingGlass />}
        </Input>
        <DictionaryContainer>
          {getWordsLoading || simpleSearchLoading || attWordsLoading ? (
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
                      setGlobalSelectedWord(null);
                      setSelectedLetter(i);
                      attWords(PORTUGUESEALPHABET[i]);
                    }}
                    selectedLetter={selectedLetter == i}
                    key={i}
                  >
                    <h1>{l}</h1>
                  </Letter>
                ))}
              </AlphabetContainer>
              <WordsContainer>
                {shownWords.map((w, i) => (
                  <Word
                    onClick={() => {
                      navigate(`/palavra/${w}`);
                      setGlobalSelectedWord(i);
                    }}
                    isSelected={i == globalSelectedWord}
                    key={i}
                  >
                    {w}
                  </Word>
                ))}
              </WordsContainer>
            </>
          )}
        </DictionaryContainer>
        <FooterIcons>
          <FilterIcon
          />
        </FooterIcons>
      </>
    </SideBarContainer>
  );
}
