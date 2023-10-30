import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "reactstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navigator from "./pages/Main/components/Navigator/Navigator";
import SlideBar from "./pages/Main/components/SlideBar/SlideBar/SlideBar";

function App() {
  return (
    <Router>
      <Navigator />
      <SlideBar />
      <Routes></Routes>
    </Router>
  );
}

export default App;
