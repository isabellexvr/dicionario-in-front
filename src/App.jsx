import { useState } from "react";
import SideBar from "./components/SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WordPage from "./pages/WordPage";

function App() {
  //const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="palavra">
          <Route path=":palavra" element={<WordPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
