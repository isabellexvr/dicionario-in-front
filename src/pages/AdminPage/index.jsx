import styled from "styled-components";
import { useEffect, useState } from "react";
import Background from "../../constants/Background";
import useGetWordById from "../../services/hooks/api/words/useGetWordById";
import useSearch from "../../services/hooks/api/words/useSearch";
import AdminSearchInput from "./components/AdminSearchInput";
import useGetWords from "../../services/hooks/api/words/useGetWords.js";
import colors from "../../constants/colors";

// input pra pesquisar palavra
// começar pela primeira palavra?
// filtrar por palavras
// criar nova palavra => modal

export default function AdminPage({ showSidebar, setShowSidebar }) {
  const { getWords, getWordsLoading, getWordsError } = useGetWords();

  const [wordInfo, setWordInfo] = useState({});
  const [words, setWords] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const { getWordById, getWordByIdLoading, getWordByIdError } =
    useGetWordById();
  const { search, searchLoading, searchError } = useSearch();

  useEffect(() => {
    async function getApiWordInfo() {
      try {
        const data = await getWordById(1);
        setWordInfo(data);
      } catch (err) {
        console.log(err);
      }
    }

    async function getApiWords() {
      try {
        const data = await getWords();
        console.log(data);
        setWords(data);
      } catch (err) {
        console.log(err);
      }
    }

    if (wordInfo.Verbete == undefined) {
      getApiWordInfo();
    }

    if (words.length <= 0) {
      getApiWords();
    }
  }, []);

  return (
    <Background>
      {getWordByIdLoading ? (
        <>CARREGANDO...</>
      ) : (
        <>
          <PageHeader showSidebar={showSidebar}>
            <AdminSearchInput
              search={search}
              setWordInfo={setWordInfo}
              words={words}
              showSearchBar={showSearchBar}
              setShowSearchBar={setShowSearchBar}
            ></AdminSearchInput>
          </PageHeader>
          <></>
        </>
      )}
    </Background>
  );
}

const PageHeader = styled.div`
position: absolute;
top: 6vw;
  background-color: ${colors.darkGrey};
padding-top: 2vw;
padding-bottom: 2vw;

  width: 100%;
  left: 50%;
  transform: translateX(-50%);
  //padding-left: ${(p) => (p.showSidebar ? "22vw" : "7vw")};
  display: flex;
  justify-content: center;
  //align-items: center;
`;
