import styled from "styled-components";
import colors from "./colors";

export default function Background({children}){
    return(
<PageContainer>
{children}
</PageContainer>
    )
}

const PageContainer = styled.section`
  background-color: ${colors.lightGrey};
  height: 100vh;
  padding-top: 7vw;
  padding-left: 34vw;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
`;