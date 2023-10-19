import styled from "styled-components";
import colors from "../../constants/colors";

export default function HomePage(){
    return(
        <HomePageContainer>
        homepage
        </HomePageContainer>
    )
}

const HomePageContainer = styled.section`
background-color: ${colors.lightGrey};
height: 100vh;

`;

