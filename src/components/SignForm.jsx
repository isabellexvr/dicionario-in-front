import styled from "styled-components";
import colors from "../constants/colors";
import { HighlightButton } from "./Header";
import { useState } from "react";
import forms from "../helpers/forms";
import { useNavigate } from "react-router-dom";

export default function SignForm({ verb, title, inputs, api, setState, navigateTo }) {
  const [form, setForm] = useState({});

  const navigate = useNavigate();

  return (
    <>
        <SignFormContainer>
      <Title>{title}</Title>
      <FormContainer>
        <Form onSubmit={(e) => forms.sendForm(e, api, setState, form, navigate, navigateTo)}>
          {inputs.map((i, index) => (
            <Input
              key={index}
              placeholder={i.placeholder}
              type={i.type}
              onChange={(e) => forms.handleForm(e, form, setForm)}
              name={i.name}
            />
          ))}
          <HighlightButton type="submit">{verb}</HighlightButton>
        </Form>
      </FormContainer>
    </SignFormContainer>    </>

  );
}



const SignFormContainer = styled.div`
  width: 90%;
  height: 85%;
  border-radius: 1.5vw;
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    width: 83%;
    height: 50%;
    margin-left: 15vw;
  }
`;

const Title = styled.div`
  width: 20%;
  height: 100%;
  background-color: ${colors.darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5vw 0px 0px 1.5vw;
  color: ${colors.lightGrey};
  font-weight: 800;
  font-size: 4vw;
  writing-mode: vertical-rl; /* Vertical text writing mode */
  text-orientation: upright; /* Maintain upright orientation */
  @media (max-width: 600px) {
    font-size: 7vw;

  }
`;

const FormContainer = styled.div`
  width: 70%;
  height: 100%;
  background-color: ${colors.mediumGrey};
  border-radius: 0 1.5vw 1.5vw 0vw;
  display: flex;

  align-items: center;
  justify-content: center;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70%;
  width: 70%;
  ::placeholder {
    opacity: 0.5;
    color: ${colors.darkGrey};
  }
  @media (max-width: 600px) {
    width: 90%;
    font-size: 4vw;
    
  }
`;

const Input = styled.input`
  all: unset;
  border-bottom: 1px solid ${colors.darkGrey};
  height: 20%;
  width: 80%;
  margin-bottom: 6%;
  font-size: 1.5vw;
  color: ${colors.darkGrey};  
  @media (max-width: 600px) {
    width: 90%;
    font-size: 4vw;
    height: 15%;
    margin-bottom: 13%;
  }

`;
