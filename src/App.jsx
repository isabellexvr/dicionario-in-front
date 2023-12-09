import SideBar from "./components/SideBar";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import WordPage from "./pages/WordPage";
import Header from "./components/Header";
import SignUp from "./pages/SignUpPage";
import UserInfoProvider from "./contexts/UserInfoContext";
import SignInPage from "./pages/SignInPage";
import { useState } from "react";
import AdminPage from "./pages/AdminPage";
import useToken from "./services/hooks/useToken";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import { createPortal } from "react-dom";
import SearchModal from "./components/SearchModal";
import WordsProvider from "./contexts/WordsContext";

function App() {
  const searchModal = document.getElementById("search-modal");

  const [selectedTab, setSelectedTab] = useState(0);
  const [showSearchModal, setShowSearchModal] = useState(false);

  return (
    <UserInfoProvider>
      <WordsProvider>
        <BrowserRouter>
          <Header setShowSearchModal={setShowSearchModal} />
          <SideBar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="palavra">
              <Route
                path=":palavra"
                element={
                  <WordPage
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
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
