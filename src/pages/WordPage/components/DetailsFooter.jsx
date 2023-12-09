import styled from "styled-components";
import { Tab, Details } from "..";
import { useEffect, useState } from "react";
import { NameToColumns } from "../helpers";
import colors from "../../../constants/colors";
import { Highlight } from "./LikableWords";

export default function DetailsFooter({
  tabs,
  wordInfo,
  defaultTab,
  navigate,
  selectedFooterTab,
  setSelectedFooterTab
}) {


  return (
    <DetailsFooterContainer>
      <TabsContainer>
        {tabs.map((t, i) => (
          <Tab
            onClick={() => {
              setSelectedFooterTab(i);
            }}
            isSelected={selectedFooterTab == i}
            isFooter={true}
            key={i}
          >
            {t}
          </Tab>
        ))}
      </TabsContainer>
      <div className="content">
        <Details>
          {tabs[selectedFooterTab] == "Sinônimos/Variantes" ? (
            wordInfo[NameToColumns[tabs[selectedFooterTab]]]
              .split("; ")
              .map((w, i) => (
                <Highlight key={i} onClick={() => navigate(`/palavra/${w}`)}>
                  {w}
                </Highlight>
              ))
          ) : wordInfo[NameToColumns[tabs[selectedFooterTab]]]?.search("v.") !== -1 ? (
            <Highlight
              onClick={() =>
                navigate(
                  `/palavra/${wordInfo[NameToColumns[tabs[selectedFooterTab]]].slice(3)}`
                )
              }
            >
              {wordInfo[NameToColumns[tabs[selectedFooterTab]]]?.slice(2)}
            </Highlight>
          ) : (
            <h1>{wordInfo[NameToColumns[tabs[selectedFooterTab]]]}</h1>
          )}
        </Details>
      </div>
    </DetailsFooterContainer>
  );
}

const DetailsFooterContainer = styled.div`
  background-color: ${colors.mediumGrey};
  border-radius: 0 0 1vw 1vw;
  > .content {
    padding: 2vw;
    box-sizing: border-box;
  }
  width: 100%;
  height: 45%;
  position: relative;
`;

const TabsContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  flex-wrap: wrap;
  // background-color: red;
  width: 100%;
`;
