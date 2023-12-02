import styled from "styled-components";
import { Tab, Details } from "..";
import { useEffect, useState } from "react";
import { NameToColumns } from "../helpers";
import colors from "../../../constants/colors";

export default function DetailsFooter({ tabs, wordInfo, defaultTab }) {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <DetailsFooterContainer>
      <TabsContainer>
        {tabs.map((t, i) => (
          <Tab
            onClick={() => {
              setSelectedTab(i);

            }}
            isSelected={selectedTab == i}
            isFooter={true}
            key={i}
          >
            {t}
          </Tab>
        ))}
      </TabsContainer>
      <div className="content">
        <Details> 
          <h1>{wordInfo[NameToColumns[tabs[selectedTab]]]}</h1>
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
  height: 35%;
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
