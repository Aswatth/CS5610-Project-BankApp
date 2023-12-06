import "bootstrap/dist/css/bootstrap.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

import "./App.css";
import Login from "./login/login-index";
import { Routes, Route, Navigate } from "react-router";
import ScheduleAppointment from "./schedule-appointment/schedule-appointment-index";
import AdminHomePage from "./admin-homepage/admin-homepage-index";
import { Provider } from "react-redux";
import store from "./store/index";
import { HashRouter } from "react-router-dom";
import CustomerPage from "./customer/customer-index";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/book-appointment"
              element={<ScheduleAppointment />}
            ></Route>
            <Route path="/admin-homepage" element={<AdminHomePage />}></Route>
            <Route path="/customer/*" element={<CustomerPage />}></Route>
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
