import "bootstrap/dist/css/bootstrap.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

import "./App.css";
import Login from "./login/login-index";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import ScheduleAppointment from "./schedule-appointment/schedule-appointment-index";

function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />}></Route>
          <Route
            path="/book-appointment"
            element={<ScheduleAppointment />}
          ></Route>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
