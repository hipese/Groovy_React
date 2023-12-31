import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Groovy from "./pages/Groovy/Groovy";
import { createContext, useState } from "react";
import { CookiesProvider } from "react-cookie";

const LoginContext = createContext();

function App() {

  const [loginID, setLoginID] = useState("");

  return (
    <Router>
      <LoginContext.Provider value={{ loginID, setLoginID }} >
        <CookiesProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Groovy/*" element={<Groovy />} />
          </Routes>
        </CookiesProvider>
      </LoginContext.Provider>

    </Router>

  );
}

export default App;
export { LoginContext };