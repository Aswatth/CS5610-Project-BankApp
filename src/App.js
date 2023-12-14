import "bootstrap/dist/css/bootstrap.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

import "./App.css";
import Login from "./login/login-index";
import { Routes, Route, Navigate } from "react-router";
import ScheduleAppointment from "./schedule-appointment/schedule-appointment-index";
import AdminPage from "./admin-homepage/admin-index";
import { Provider } from "react-redux";
import store from "./store/index";
import { HashRouter } from "react-router-dom";
import CustomerPage from "./customer/customer-index";
import Employee from "./employee/employee.index";
import Home from "./home/home";
import Branches from "./branches/branches";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />}></Route>
            <Route path="/branches" element={<Branches />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/book-appointment"
              element={<ScheduleAppointment />}
            ></Route>
            <Route path="/admin/*" element={<AdminPage />}></Route>
            <Route path="/customer/*" element={<CustomerPage />}></Route>
            <Route
              path="/employee/*"
              element={
                <Employee
                  employeeAccess={{
                    viewCustomerAccess: true,
                    approveCardRequests: true,
                    createCustomer: true,
                  }}
                />
              }
            ></Route>
          </Routes>
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
