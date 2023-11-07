import SignForm from "../../components/SignForm";
import Background from "../../constants/Background";
import styled from "styled-components";
import useUserInfo from "../../contexts/hooks/useUserInfo";
import usePostUser from "../../services/hooks/api/users/usePostUser";

export default function SignUp() {
  const { postUserLoading, postUserError, postUser } = usePostUser();
  const { setUserInfo } = useUserInfo();

  return (
    <Background>
      <SignForm
        verb="Cadastrar"
        title="CADASTRO"
        inputs={[
          { placeholder: "Nome Completo", type: "text", name: "nome" },
          { placeholder: "Nome de Usuário", type: "text", name: "userName" },
          { placeholder: "E-mail", type: "email", name: "email" },
          { placeholder: "Senha", type: "password", name: "senha" },
        ]}
        api={postUser}
        setState={setUserInfo}
        navigateTo="/"
      ></SignForm>
    </Background>
  );
}
