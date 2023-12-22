import SideBar from "./components/SideBar";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import WordPage from "./pages/WordPage";
import Header from "./components/Header";
import SignUp from "./pages/SignUpPage";
import UserInfoProvider from "./contexts/UserInfoContext";
import SignInPage from "./pages/SignInPage";
import { useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage";
import useToken from "./services/hooks/useToken";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import { createPortal } from "react-dom";
import SearchModal from "./components/SearchModal";
import WordsProvider from "./contexts/WordsContext";
import styled from "styled-components";

function App() {
  const searchModal = document.getElementById("search-modal");

  const [selectedTab, setSelectedTab] = useState(0);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [globalSelectedWord, setGlobalSelectedWord] = useState(0);
  const [letterOrWordSelection, setLetterOrWordSelection] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      //console.log(letterOrWordSelection)
      if(e.key === "ArrowRight"){
        setLetterOrWordSelection(1);
      }else if( e.key === "ArrowLeft"){
        setLetterOrWordSelection(0);
      }
      // Perform actions based on the pressed key
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  console.log(globalSelectedWord)

  return (
    <AppContainer>
      <UserInfoProvider>
        <WordsProvider>
          <BrowserRouter>
            <Header setShowSearchModal={setShowSearchModal} />
            <SideBar
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              globalSelectedWord={globalSelectedWord}
              setGlobalSelectedWord={setGlobalSelectedWord}
              letterOrWordSelection={letterOrWordSelection}
            />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="palavra">
                <Route
                  path=":palavra"
                  element={
                    <WordPage
                      selectedTab={selectedTab}
                      setSelectedTab={setSelectedTab}
                      globalSelectedWord={globalSelectedWord}
                      setGlobalSelectedWord={setGlobalSelectedWord}
                    />
                  }
                />
              </Route>
              <Route
                path="/user"
                element={
                  <AuthorizedRoute>
                    <Outlet />
                  </AuthorizedRoute>
                }
              >
                <Route element={<AdminPage></AdminPage>} path="admin" />
                <Route element={<ProfilePage />} path="" />
              </Route>
              <Route path="cadastro" element={<SignUp />} />
              <Route path="login" element={<SignInPage />} />
              <Route path="sobre" element={<AboutPage />} />
            </Routes>
            {showSearchModal &&
              createPortal(
                <SearchModal setShowSearchModal={setShowSearchModal} />,
                searchModal
              )}
          </BrowserRouter>
        </WordsProvider>
      </UserInfoProvider>
    </AppContainer>
  );
}

export default App;

function AuthorizedRoute({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

const AppContainer = styled.div`
//background-color: red;
`;
