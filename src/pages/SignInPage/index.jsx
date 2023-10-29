import SignForm from "../../components/SignForm";
import Background from "../../constants/Background";
import useUserInfo from "../../contexts/hooks/useUserInfo";
import useSignInUser from "../../services/hooks/api/users/useSignInUser";

export default function SignInPage() {
  const { setUserInfo } = useUserInfo();
  const { signInUserLoading, signInUserError, signInUser } = useSignInUser();

  return (
    <Background>
      <SignForm
        title="LOGIN"
        inputs={[
          { placeholder: "E-mail", type: "email", name: "email" },
          { placeholder: "Senha", type: "password", name: "senha" },
        ]}
        api={signInUser}
        setState={setUserInfo}
        navigateTo="/"
      ></SignForm>
    </Background>
  );
}
