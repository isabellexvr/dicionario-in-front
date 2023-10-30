import { useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";
import useGetWordByName from "../../services/hooks/api/words/useGetWordByName";
import { useEffect, useState } from "react";
import Background from "../../constants/Background";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export default function WordPage({ showSidebar, setShowSidebar }) {
  const { palavra } = useParams();

  const { getWordByName, getWordByNameLoading, getWordByNameError } =
    useGetWordByName();

  const [wordInfo, setWordInfo] = useState({});
  const [definicoes, setDefinicoes] = useState([]);
  const regex = /\(\d\) /g;

  useEffect(() => {
    async function getApiWordByName() {
      try {
        const data = await getWordByName(palavra);
        setWordInfo(data);
        const thereAreMany = data.definicao.search("(1)");
        //console.log(thereAreMany)
        if (thereAreMany == 1) {
          const arr = data.definicao.split(regex);
          setDefinicoes(arr.slice(1));
        } else {
          const arr = [data.definicao];
          setDefinicoes(arr);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getApiWordByName();
  }, [palavra]);

  console.log(definicoes);

  return (
    <Background showSidebar={showSidebar}>
      {wordInfo.Verbete && (
        <>
          <WordDetailsContainer>
            <Word>
              {wordInfo.Verbete}
              <AiOutlineStar />
            </Word>
            <Details>
              <h1>DEFINIÇÕES</h1>
              {definicoes.map((d, i) => (
                <h2>
                  <strong>{i + 1}</strong>. {d}
                  {"\n"}
                </h2>
              ))}
            </Details>
          </WordDetailsContainer>
        </>
      )}
    </Background>
  );
}

const WordDetailsContainer = styled.div`
  border: 2px solid ${colors.mediumGrey};
  width: 70%;
  height: 70%;
  border-radius: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Word = styled.h1`
  font-family: "Roboto", sans-serif;
  width: 80%;
  height: 20%;
  display: flex;
  align-items: flex-end;
  color: ${colors.darkGrey};
  font-size: 3vw;
  position: relative;
  > svg {
    position: absolute;
    right: 0;
    cursor: pointer;
  }
`;

const Details = styled.div`
  width: 75%;
  margin-top: 2vw;
  height: 50%;
  display: flex;
  flex-direction: column;
  color: ${colors.darkThemeGrey};
  >h1{
    font-weight: 800;
    font-size: 1.5vw;
    margin-bottom: 0.5vw;
  }

  > h2 {
    margin-top: 0.5vw;
    line-height: 1.6vw;
    text-align: justify;
    > strong {
      font-weight: 800;
    }
  }
`;
