import styled from "styled-components";
import colors from "../constants/colors";

export default function SignForm({title}){
return(
    <SignFormContainer>

        <Title>
            {title}
        </Title>
    </SignFormContainer>
)
}

const SignFormContainer = styled.div`
    width: 90%;
    height: 85%;
    background-color: red;
    border-radius: 1.5vw;
    display: flex;
    align-items: center;

`

const Title = styled.div`
        width: 30%;
        height: 100%;
        background-color: ${colors.darkGrey};
`

const Form = styled.form`

`