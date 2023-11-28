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
import { useState } from "react";
import AdminPage from "./pages/AdminPage";
import useToken from "./services/hooks/useToken";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <UserInfoProvider>
      <BrowserRouter>
        <Header />
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
      </BrowserRouter>
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
