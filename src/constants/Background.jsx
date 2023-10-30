import styled from "styled-components";
import colors from "./colors";

export default function Background({ children, showSidebar }) {
  console.log(showSidebar);
  return <PageContainer showSidebar={showSidebar}>{children}</PageContainer>;
}

const PageContainer = styled.section`
  background-color: ${colors.lightGrey};
  height: 100vh;
  padding-top: 7vw;

  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: ${(p) => (p.showSidebar ? "30vw" : "10vw")};
`;
