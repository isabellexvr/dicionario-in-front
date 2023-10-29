import styled from "styled-components";
import colors from "../constants/colors";
import { HighlightButton } from "./Header";
import { useState } from "react";
import usePostUser from "../services/hooks/api/users/usePostUser";
import forms from "../helpers/forms";
import useUserInfo from "../contexts/hooks/useUserInfo"
import { useNavigate } from "react-router-dom";

/* model usuarios {
    id          Int           @id @default(autoincrement())
    userName    String        @unique @db.VarChar(50)
    nome        String
    email       String        @unique
    senha       String        @unique
    admin       Int           @db.SmallInt
    comentarios comentarios[]
  } */

export default function SignForm({ title, inputs }) {
  const [form, setForm] = useState({});

  const { postUserLoading, postUserError, postUser } = usePostUser();

  const { setUserInfo } = useUserInfo();

  const navigate = useNavigate();

  console.log(form)

  return (
    <SignFormContainer>
      <Title>{title}</Title>
      <FormContainer>
        <Form onSubmit={(e) => forms.sendForm(e, postUser, setUserInfo, form, navigate, "/")}>
          {inputs.map((i, index) => (
            <Input
              key={index}
              placeholder={i.placeholder}
              type={i.type}
              onChange={(e) => forms.handleForm(e, form, setForm)}
              name={i.name}
            />
          ))}
          <HighlightButton type="submit">Cadastrar</HighlightButton>
        </Form>
      </FormContainer>
    </SignFormContainer>
  );
}

const SignFormContainer = styled.div`
  width: 90%;
  height: 85%;
  border-radius: 1.5vw;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  width: 30%;
  height: 100%;
  background-color: ${colors.darkGrey};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.5vw 0px 0px 1.5vw;
  color: ${colors.lightGrey};
  font-weight: 800;
  font-size: 2.5vw;
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
`;

const Input = styled.input`
  all: unset;
  border-bottom: 1px solid ${colors.darkGrey};
  height: 20%;
  width: 80%;
  margin-bottom: 6%;
  font-size: 1.5vw;
  color: ${colors.darkGrey};
`;
