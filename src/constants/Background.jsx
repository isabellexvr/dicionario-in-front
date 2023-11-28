import styled from "styled-components";
import colors from "./colors";

export default function Background({ children }) {
  return <PageContainer>{children}</PageContainer>;
}

const PageContainer = styled.section`
  background-color: ${colors.lightGrey};
  height: 100vh;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left:  20vw;
 padding-top: 7vw;
 @media (max-width: 600px) {
  padding-left: 0;
    flex-direction: column;
  }
`;
