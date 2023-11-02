import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login/Login";
import Groovy from "./pages/Groovy/Groovy";
import { createContext, useState } from "react";

const LoginContext = createContext();

function App() {

  const [loginID, setLoginID] = useState("");

  return (
    <Router>
      <LoginContext.Provider value={{ loginID, setLoginID }} >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Groovy/*" element={<Groovy />} />
        </Routes>
      </LoginContext.Provider>

    </Router>

  );
}

export default App;
export { LoginContext };