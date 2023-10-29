import SideBar from "./components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WordPage from "./pages/WordPage";
import Header from "./components/Header";
import SignUp from "./pages/SignUpPage";
import UserInfoProvider from "./contexts/UserInfoContext";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Header />
        <SideBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="palavra">
            <Route path=":palavra" element={<WordPage />} />
          </Route>
          <Route path="cadastro" element={<SignUp />} />
          <Route path="login" element={<SignInPage />} />
        </Routes>
      </BrowserRouter>
    </UserInfoProvider>
  );
}

export default App;
