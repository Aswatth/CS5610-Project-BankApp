import "./App.css";
import Login from "./login/login-index";
import "bootstrap/dist/css/bootstrap.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
