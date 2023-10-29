import SignForm from "../../components/SignForm";
import Background from "../../constants/Background";
import styled from "styled-components";

export default function SignUp() {
  return (
    <Background>
      <SignForm
        title="CADASTRO"
        inputs={[
          { placeholder: "Nome Completo", type: "text", name: "nome" },
          { placeholder: "Nome de Usuário", type: "text", name: "userName" },
          { placeholder: "E-mail", type: "email", name: "email" },
          { placeholder: "Senha", type: "password", name: "senha" },
        ]}
      ></SignForm>
    </Background>
  );
}
