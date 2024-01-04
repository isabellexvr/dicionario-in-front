import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";
import useGetWordByName from "../../services/hooks/api/words/useGetWordByName";
import useGetWordTabs from "../../services/hooks/api/words/useGetWordTabs";
import { useEffect, useState } from "react";
import useUserInfo from "../../contexts/hooks/useUserInfo";
import DetailsFooter from "./components/DetailsFooter";
import useWords from "../../contexts/hooks/useWords";
import HighlightWords from "./components/LikableWords";

const HeaderTabs = ["Definições/Acepções", "Tópicos em Iluminação Natural"];

export default function WordPage({
  selectedTab,
  setSelectedTab,
  globalSelectedWord,
  setGlobalSelectedWord,
  selectedLetter,
  setSelectedLetter,
  shownWords,
  setShownWords,
  apiWords,
  setApiWords
}) {
  const { palavra } = useParams();

  const { getWordByName, getWordByNameLoading, getWordByNameError } =
    useGetWordByName();

  const { getWordTabsData, getWordTabsLoading, getWordTabsError, getWordTabs } =
    useGetWordTabs();

  const { userInfo } = useUserInfo();
  const { words, setWords } = useWords();

  const [wordInfo, setWordInfo] = useState({});
  const [definicoes, setDefinicoes] = useState([]);
  const [definicaoIN, setDefinicaoIN] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [tabs, setTabs] = useState([0, 1]);
  const [genClass, setGenClass] = useState([]);

  const [selectedHeaderTab, setSelectedHeaderTab] = useState(0);
  const [selectedFooterTab, setSelectedFooterTab] = useState(0);

console.log(wordInfo)

  const regex = /\(\d\)/g;

  const navigate = useNavigate();

  useEffect(() => {
    async function getApiWordByName() {
      try {
        const data = await getWordByName(palavra);

        const tabsData = await getWordTabs(palavra);
        setSelectedFooterTab(0);

        setWordInfo(data);
        setDefinicaoIN(data["topicoIluminacaoNatural"]);
        setTabs(tabsData.filter((e) => e !== null));
        const arr = [];
        if (data["Classe Gramatical"] !== null)
          arr.push(data["Classe Gramatical"]);
        if (data["Gênero/Número"] !== null) arr.push(data["Gênero/Número"]);

        setGenClass(arr);

        const thereAreMany = data["Definição"].search("(1)");
        if (thereAreMany == 1) {
          const arr = data["Definição"].split(regex);
          //console.log(arr)
          setDefinicoes(arr.slice(1));
        } else {
          const arr = [data["Definição"]];
          //console.log(arr)
          setDefinicoes(arr);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getApiWordByName();
  }, [palavra, globalSelectedWord]);

  return (
    <PageContainer>
      {wordInfo.Verbete && (
        <>
          <WordDetailsContainer>
            <Verbete>
              <h1>{wordInfo.Verbete}</h1>
            </Verbete>
            <TabsContainer>
              {HeaderTabs.map((t, i) => (
                <Tab
                  onClick={() => {
                    setSelectedTab(i);
                    setSelectedHeaderTab(i);
                  }}
                  isSelected={selectedHeaderTab == i}
                  key={i}
                >
                  {t}
                </Tab>
              ))}
            </TabsContainer>
            <DetailsHeader>
              {selectedTab == 0 ? (
                <>
                  <AboutWord>
                    {genClass.map((e, i) => (
                      <span key={i}>
                        {e}
                        {i === genClass.length - 1 ? "" : " "}&ensp;
                      </span>
                    ))}
                  </AboutWord>
                  <Details>
                    {definicoes.length == 1 && definicoes[0]?.includes("v.") ? (
                      <h3
                        onClick={() =>
                          navigate(`/palavra/${wordInfo["Rem. Imperativa"]}`)
                        }
                      >
                        v. {wordInfo["Rem. Imperativa"]}
                      </h3>
                    ) : (
                      <>
                        {definicoes?.map((d, i) => (
                          <h2>
                            <strong>{i + 1}&nbsp; </strong>{" "}
                            <HighlightWords
                              text={d}
                              hashtable={words}
                              navigate={navigate}
                              setGlobalSelectedWord={setGlobalSelectedWord}
                              selectedLetter={selectedLetter}
                              setSelectedLetter={setSelectedLetter}
                              shownWords={shownWords}

                            />
                            {"\n"}
                          </h2>
                        ))}
                      </>
                    )}
                  </Details>
                </>
              ) : (
                <Details>
                  <h1>{HeaderTabs[selectedHeaderTab]}</h1>
                  <h2>{wordInfo[selectedHeaderTab]}</h2>
                </Details>
              )}
            </DetailsHeader>

            <DetailsFooter
              tabs={tabs}
              wordInfo={wordInfo}
              default={tabs[0]}
              navigate={navigate}
              selectedFooterTab={selectedFooterTab}
              setSelectedFooterTab={setSelectedFooterTab}
            />
          </WordDetailsContainer>
        </>
      )}
    </PageContainer>
  );
}

const Verbete = styled.div`
  position: absolute;
  top: -4vw;
  left: 0vw;
  color: ${colors.darkGrey};
  font-size: 3.2vw;
  font-weight: 800;
`;

const PageContainer = styled.section`
  background-color: ${colors.lightGrey};
  height: 100vh;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20vw;
  position: relative;
  padding-top: 7vw;
  @media (max-width: 600px) {
    padding-left: 0;
    flex-direction: column;
  }
`;

const DetailsHeader = styled.div`
  width: 100%;
  height: fit-content;
  padding: 2vw;
  padding-top: 2.7vw;
  box-sizing: border-box;
`;

const TabsContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  z-index: 2;
  width: 100%;
`;

export const Tab = styled.div`
  background-color: ${(p) => (p.isFooter ? "white" : colors.darkGrey)};
  display: flex;
  opacity: ${(p) => (p.isSelected ? "1" : "0.5")};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(p) => (p.isFooter ? colors.darkGrey : "white")};
  font-weight: 600;
  margin-right: 0.25vw;
  height: fit-content;
  padding: 0.35vw 0.7vw 0.35vw 0.7vw;
  box-sizing: border-box;
  font-size: min(15px, 0.8vw);
  width: fit-content;
  white-space: nowrap;
  @media (max-width: 600px) {
    font-size: 4.5vw;
    width: 79vw;
    height: 11vw;
    border-radius: 2vw 2vw 0 0;
    z-index: 0;
  }
`;
const WordDetailsContainer = styled.div`
  ::-webkit-scrollbar-track {
    background-color: ${colors.lightYellow};
  }
  ::-webkit-scrollbar {
    width: 1px;
    height: 100px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.yellow};
  }
  border: 2px solid ${colors.mediumGrey};
  background-color: white;
  width: 80%;
  height: 65%;

  border-radius: 0 0 1vw 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-sizing: border-box;
  @media (max-width: 600px) {
    width: 80vw;
    height: 50vh;
    z-index: 0;
    margin-left: 0%;
  }
`;

export const Details = styled.div`
  width: 85%;
  margin-top: 1vw;
  display: flex;
  height: fit-content;
  flex-direction: column;
  color: ${colors.darkThemeGrey};
  > h1 {
    font-weight: 800;
    font-size: 1.2vw;
    margin-bottom: 0.5vw;
  }

  > h2 {
    margin-top: 0.5vw;
    margin-bottom: 2%;
    line-height: 1.6vw;
    display: flex;
    text-align: justify;
    > strong {
      font-weight: 800;
    }
    > a {
      color: red;
    }
  }
  > h3 {
    text-decoration: underline;
    cursor: pointer;
    margin-top: 0.5vw;
    font-size: 0.9vw;
    line-height: 1.6vw;
  }
  @media (max-width: 600px) {
    margin-top: 5vw;
    > h1 {
      font-size: 5vw;
      margin-bottom: 3vw;
      margin-top: 5vw;
    }
    > h2 {
      line-height: 5vw;
      text-align: justify;
      > strong {
        font-weight: 800;
      }
    }
  }
`;

const AboutWord = styled.div`
  width: 85%;
  font-weight: 600;
  display: flex;
  align-items: center;
  font-size: 0.8vw;
  color: ${colors.darkGrey};
  margin-bottom: 0.2vw;
  margin-top: 0.2vw;
  > svg {
    font-size: 1vw;
  }
  > strong {
    color: orangered;
  }
  > span {
    display: flex;
    font-size: 1.2vw;
    font-style: italic;
    color: orangered;
  }
`;
