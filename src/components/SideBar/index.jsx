import styled from "styled-components";
import Input from "./smallComponents/Input";
import useGetWords from "../../services/hooks/api/words/useGetWords.js";
import { useEffect, useState } from "react";

export default function SideBar() {
  const { getWords, getWordsLoading, getWordsError } = useGetWords();
  const [words, setWords] = useState([]);

  useEffect(() => {
    async function getApiWords() {
      try {
        const data = await getWords();
        setWords(data);
        //console.log(data)
      } catch (err) {
        console.log(err);
      }
    }
    if (words.length <= 0) {
      getApiWords();
    }
  }, []);

  return (
    <SideBarContainer>
      <Input />
      <ul>{words.length > 0 && words.map((w, i) => <li key={i}>{w.Verbete}</li>)}</ul>
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  background-color: red;
`;
