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

  console.log(wordInfo[NameToColumns[tabs[selectedFooterTab]]])

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
        <FooterDetails>

            {wordInfo[NameToColumns[tabs[selectedFooterTab]]]?.includes("v.") || wordInfo[NameToColumns[tabs[selectedFooterTab]]]?.includes("(") ? 
            
            (<Highlight
              onClick={() =>
                navigate(
                  `/palavra/${wordInfo[NameToColumns[tabs[selectedFooterTab]]].slice(3)}`
                )
              }
            >

            {wordInfo[NameToColumns[tabs[selectedFooterTab]]]?.slice(2)}

            </Highlight>) 
            : 

            (wordInfo[NameToColumns[tabs[selectedFooterTab]]]?
              .split(/, |;/)
              .map((w, i) => (

                <Highlight key={i} onClick={() => navigate(`/palavra/${w}`)}>
                {w}
                </Highlight>

              )))}

        </FooterDetails>
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
    height: 100%;
  }
  width: 100%;
  height: max(50%);
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

const FooterDetails = styled.div`
margin-top: 2%;
display: flex;
flex-direction: column;
flex-wrap: wrap;
height: 90%;
//background-color: yellow;

width: 50%;
`