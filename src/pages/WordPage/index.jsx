import { useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";
import useGetWordByName from "../../services/hooks/api/words/useGetWordByName";
import { useEffect, useState } from "react";
import Background from "../../constants/Background";

export default function WordPage() {
  const { palavra } = useParams();

  const { getWordByName, getWordByNameLoading, getWordByNameError } =
    useGetWordByName();
  const [wordInfo, setWordInfo] = useState({});
  useEffect(() => {
    async function getApiWordByName() {
      try {
        const data = await getWordByName(palavra);
        setWordInfo(data);
      } catch (err) {
        console.log(err);
      }
    }
    getApiWordByName();
  }, [palavra]);

  return (
    <Background>
      <Word>{palavra}</Word>
      {wordInfo.definicao !== undefined && (
        <WordDefinitionContainer>

        {wordInfo.definicao}
        </WordDefinitionContainer>
      )}
      
    </Background>
  );
}



const Word = styled.h1`
  font-size: 3vw;
  background-color: ${colors.lightYellow};
  width: fit-content;
  padding: 1.3vw;
  border-radius: 1.5vw;
  color: ${colors.darkGrey};
  font-weight: 600;
`;

const WordDefinitionContainer = styled.div`
  margin-top: 2vw;
  width: 90%;
  height: 50%;
  border-radius: 1vw;
  background-color: ${colors.mediumGrey};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2vw;
  box-sizing: border-box;
  >p{
    
  }
`