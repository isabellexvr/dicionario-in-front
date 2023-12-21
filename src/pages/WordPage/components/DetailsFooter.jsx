import styled from "styled-components";
import { Tab } from "..";
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
  //palavra pano ta com problema
  return (
<>
 {tabs.length > 0 && (
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
                  `/palavra/${wordInfo[NameToColumns[tabs[selectedFooterTab]]]?.slice(3)}`
                )
              }
            >

           { (wordInfo[NameToColumns[tabs[selectedFooterTab]]]?.slice(3).split(/\((\d+)\)|,|;/g)
              .map((w, i) => (

                <Highlight key={i} onClick={() => navigate(`/palavra/${w}`)}>
                {w}{"\n"}
                </Highlight>

              )))}

            </Highlight>) 
            : 

            (wordInfo[NameToColumns[tabs[selectedFooterTab]]]?.split(/\((\d+)\)|,|;/g)
              .map((w, i) => (

                <Highlight key={i} onClick={() => navigate(`/palavra/${w}`)}>
                {w}{"\n"}
                </Highlight>

              )))}

        </FooterDetails>
      </div>
    </DetailsFooterContainer>

    )}

</>
   
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
  height: fit-content;
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