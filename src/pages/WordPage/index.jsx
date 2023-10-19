import { useParams } from "react-router-dom";
import styled from "styled-components";
import colors from "../../constants/colors";

export default function WordPage(){
    const {palavra} = useParams();
    console.log(palavra)
    //dar get na palavra
    return(
        <WordPageContainer>
            <Word>{palavra}</Word>
        </WordPageContainer>
    )
}

const WordPageContainer = styled.section`
background-color: ${colors.lightGrey};
height: 100vh;
padding-top: 3vw;
padding-left: 34vw;
box-sizing: border-box;
`;

const Word = styled.h1`
    font-size: 3vw;
    background-color: ${colors.lightYellow};
    width: fit-content;
    padding: 1.3vw;
    border-radius: 1.5vw;
    color: ${colors.darkGrey};
    
`