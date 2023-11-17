import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";
import useGetWordByName from "../../services/hooks/api/words/useGetWordByName";
import { useEffect, useState } from "react";
import Background from "../../constants/Background";
import { AiOutlineStar } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import CommentsBar from "../../components/CommentsBar";
import useUserInfo from "../../contexts/hooks/useUserInfo";
import { NameToColumns, mapTabs, responsive } from "./helpers";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const CustomRightArrow = ({ onClick, ...rest }) => (
  <RightArrow onClick={() => onClick()}>
    <FaArrowAltCircleRight />
  </RightArrow>
);

const CustomLeftArrow = ({ onClick, ...rest }) => (
  <LeftArrow onClick={() => onClick()}>
    <FaArrowAltCircleLeft />
  </LeftArrow>
);

export default function WordPage({ showSidebar, setShowSidebar, selectedTab, setSelectedTab }) {
  const { palavra } = useParams();

  const { getWordByName, getWordByNameLoading, getWordByNameError } =
    useGetWordByName();
  const { userInfo } = useUserInfo();

  const [wordInfo, setWordInfo] = useState({});
  const [definicoes, setDefinicoes] = useState([]);
  const [definicaoIN, setDefinicaoIN] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [tabs, setTabs] = useState([]);

  const [selectedTabName, setSelectedTabName] = useState("Definições");

  const regex = /\(\d\) /g;
  const navigate = useNavigate();

  useEffect(() => {
    async function getApiWordByName() {
      try {
        const data = await getWordByName(palavra);
        setWordInfo(data);

        const tabsArr = Object.keys(data).filter((e) => {
          if (data[e] == null) {
            return false;
          } else if (
            e == "Verbete" ||
            e == "definicao" ||
            e == "id" ||
            e == "topicoIluminacaoNatural" ||
            e == "obsrcc" ||
            e == "comentariosExtraBrutos"
          ) {
            return false;
          } else {
            return true;
          }
        });

        const defArr = ["Definições"];
        const mappedTabsArr = mapTabs(tabsArr);

        setTabs(defArr.concat(mappedTabsArr));

        const thereAreMany = data.definicao.search("(1)");
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

  return (
    <Background showSidebar={showSidebar}>
      {wordInfo.Verbete && (
        <>
          <WordDetailsContainer>
            <CarouselContainer>
              <Carousel
                customRightArrow={<CustomRightArrow />}
                customLeftArrow={<CustomLeftArrow />}
                partialVisible
                removeArrowOnDeviceType={["tablet", "mobile"]}
                responsive={responsive}
              >
                {tabs.map((t, i) => (
                  <Tab
                    onClick={() => {
                      setSelectedTab(i);
                      setSelectedTabName(NameToColumns[tabs[i]]);
                    }}
                    isSelected={selectedTab == i}
                    key={i}
                  >
                    {t}
                  </Tab>
                ))}
              </Carousel>
            </CarouselContainer>
            <Word showSidebar={showSidebar}>
              {wordInfo.Verbete}
              <div className="icons">
                <AiOutlineStar />
                <BiCommentDetail
                  onClick={() => setShowComments(!showComments)}
                />
              </div>
            </Word>
            {selectedTab == 0 ? (
              <Details>
                <h1>{tabs[selectedTab]}</h1>
                {definicoes.length == 1 && definicoes[0] == "v." ? (
                  <h3
                    onClick={() =>
                      navigate(`/palavra/${wordInfo.remissivaImperativa}`)
                    }
                  >
                    {wordInfo.remissivaImperativa}
                  </h3>
                ) : (
                  <>
                    {definicoes.map((d, i) => (
                      <h2>
                        <strong>{i + 1}</strong>. {d}
                        {"\n"}
                      </h2>
                    ))}
                  </>
                )}
              </Details>
            ) : (
              <Details>
                <h1>{tabs[selectedTab]}</h1>
                <h2>{wordInfo[selectedTabName]}</h2>
              </Details>
            )}
          </WordDetailsContainer>
          {showComments && (
            <>
              <CommentsBar wordId={wordInfo.id} logged={userInfo} />
            </>
          )}
        </>
      )}
    </Background>
  );
}

const RightArrow = styled.div`
  font-size: 1.5em; // Set your desired size
  color: black; // Set your desired color
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  font-size: 2.2vw;
  right: 1%;
  > svg {
    opacity: 0.4;
  }
  :hover {
    opacity: 0.7;
  }
`;

const LeftArrow = styled.div`
  font-size: 1.5em; // Set your desired size
  color: black; // Set your desired color
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  font-size: 2.2vw;
  left: 1%;
  > svg {
    opacity: 0.4;
  }
  :hover {
    opacity: 0.7;
  }
`;

const CarouselContainer = styled.div`
  width: 100%; 
  position: absolute;
  top: -2.9vw;
  left: 0;
  @media (max-width: 600px) {
    top: -5.7vw;
    z-index: 0;
  }
`;

const Tab = styled.div`
  background-color: ${colors.darkGrey};
  display: flex;
  opacity: ${(p) => (p.isSelected ? "1" : "0.5")};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-weight: 600;
  margin-right: 1vw;
  height: 2.8vw;
  padding: 0vw 1vw 0vw 1vw;
  box-sizing: border-box;
  border-radius: 0.7vw 0.7vw 0 0;
  font-size: 1.1vw;
  @media (max-width: 600px) {
    font-size: 3vw;
    width: 25vw;
    height: 8vw;
    margin-right: 4vw;
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
  width: 50%;
  height: fit-content;

  border-radius: 0 0 1vw 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 2vw;
  padding-bottom: 2vw;
  box-sizing: border-box;
  @media (max-width: 600px) {
    width: 80%;
    height: fit-content;
    z-index: 0;
    margin-left: 10%;
  }
`;

const Word = styled.h1`
  font-family: "Roboto", sans-serif;
  width: 85%;
  height: 20%;
  display: flex;
  align-items: flex-end;
  color: ${colors.darkGrey};
  font-size: 3.2vw;
  position: relative;
  font-weight: 800;
  z-index: 0;
  > .icons {
    position: absolute;
    right: 0;
    cursor: pointer;
    font-size: 2.5vw;
    display: flex;
    justify-content: space-between;
    width: 18%;
    > svg:first-child {
      :hover {
        color: red;
      }
    }
  }
  @media (max-width: 600px) {
    font-size: 10vw;
    height: 13%;
    width: 90%;
    margin-bottom: 2vw;
    margin-top: 6vw;
    flex-direction: column;
    align-items: flex-start;
    //background-color: red;
    display: ${(p) => (p.showSidebar ? "none" : "initial")};
    > .icons {
      font-size: 8vw;
      width: 100%;
      position: inherit;
      justify-content: flex-end;
      > svg:first-child {
        margin-right: 1vw;
      }
    }
  }
`;

const Details = styled.div`
  width: 85%;
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  color: ${colors.darkThemeGrey};
  > h1 {
    font-weight: 800;
    font-size: 1.2vw;
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
  > h3 {
    text-decoration: underline;
    cursor: pointer;
    margin-top: 0.5vw;
    line-height: 1.6vw;
  }
  @media (max-width: 600px) {
    > h1 {
      font-size: 5vw;
      margin-bottom: 3vw;
      margin-top: 2vw;
    }
    > h2 {
      //margin-top: 2vw;
      line-height: 5vw;
      text-align: justify;
      > strong {
        font-weight: 800;
      }
    }
  }
`;
