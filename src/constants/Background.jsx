import styled from "styled-components";
import colors from "./colors";

export default function Background({ children, showSidebar }) {
  return <PageContainer showSidebar={showSidebar}>{children}</PageContainer>;
}

const PageContainer = styled.section`
  background-color: ${colors.lightGrey};
  height: 100vh;
  //padding-top: 7vw;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  display: flex;
  //
  align-items: center;
  justify-content: center;
  padding-left: ${(p) => (p.showSidebar ? "20vw" : "5vw")};
 // overflow-y: scroll;
 padding-top: 7vw;
 @media (max-width: 600px) {
    flex-direction: column;
  }
`;
