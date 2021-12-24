import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Navigation from "./Component.js/Navigation";
import Home from "./Pages/Admin/Home";
import RegistrationArea from "./Pages/Admin/RegistrationArea";
import Settings from "./Pages/Admin/Settings";
import User from "./Pages/Admin/User";
import BlockedUsersFragment from "./Fragments/AdminFragments/SettingsFragments/BlockedUsersFragment";
import CreateUsersFragment from "./Fragments/AdminFragments/SettingsFragments/CreateUsersFragment";
import UserFragment from "./Fragments/AdminFragments/UserFragments/UserFragment";

import ErrorPage from "./Pages/404page";
import Details from "./Pages/Details";
import Login from "./Pages/Login";
import { withAuthentication } from "./UsersComponents/Session/index";
import PasswordForgetPage from "./Pages/ForgotPassword";
import OrderForm from "./Pages/Website/OrderForm";
import OrderDetailsTable from "./Tables/Admin/DashboardTables/OrderDetailsTable";
import CompleteOrderTable from "./Tables/Admin/DashboardTables/CompleteOrderTable";
import StaffCompleteOrderTable from "./Tables/staff/StaffCompleteOrderTable";
import UserMobileLogin from "./UsersComponents/SignUpFragments/UserMobileLogin";
import DriverCompleteOrderTable from "./Tables/Driver/DriverCompleteOrderTable";
import StaffHome from "./Pages/Staff/StaffHome";
import DriverHome from "./Pages/Driver/DriverHome";
import StaffFragment from "./Fragments/AdminFragments/UserFragments/StaffFragment";
import DriverFragment from "./Fragments/AdminFragments/UserFragments/DriverFragment";
import UserLogInFragment from "./Fragments/UserLogInFragment";
import OrderDetails from "./Fragments/User/OrderDetails";
import SingleOrderDetails from "./Fragments/User/SingleOrderDetails";
import RejectedOrderTable from "./Tables/Admin/DashboardTables/RejectedOrderTable";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/BackOffice">
            <Redirect to="/BackOffice/DUF" />
          </Route>

          <Route
            path="/Home"
            component={() => {
              window.location.href = "https://diola.ae/";
              return null;
            }}
          />
          <Route
            path="/contact-us"
            component={() => {
              window.location.href = "https://diola.ae/contact/";
              return null;
            }}
          />

          <Route
            path="/about"
            component={() => {
              window.location.href = "https://diola.ae/about/";
              return null;
            }}
          />

          <Route exact path="/Users">
            <Redirect to="/Users/Details" />
          </Route>

          <Route exact path="/Accounts">
            <Redirect to="/Accounts/DRF" />
          </Route>

          <Route exact path="/Admin" component={Login} />
          <Route exact path="/login" component={UserLogInFragment} />
          <Route exact path="/otplogin" component={UserMobileLogin} />

          <Route exact path="/Users/orderform" component={OrderForm} />

          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/Forgetpassword" component={PasswordForgetPage} />

          <Navigation>
            {/*AdminRoutes*/}

            <Route exact path="/Admin/Home" component={Home} />
            <Route exact path="/Admin/users" component={User} />
            <Route exact path="/Admin/settings" component={Settings} />
            <Route
              exact
              path="/Admin/registrationarea"
              component={RegistrationArea}
            />

            {/* Admin routes for Admin Fragment */}

            <Route
              exact
              path="/Admin/Home/OrderDetails"
              component={OrderDetailsTable}
            />
            <Route
              exact
              path="/Admin/Home/CompleteOrder"
              component={CompleteOrderTable}
            />
            <Route
              exact
              path="/Admin/Home/RejectedOrder"
              component={RejectedOrderTable}
            />
            {/* Admin routes for User Fragment */}

            <Route exact path="/Admin/users/User" component={UserFragment} />
            <Route exact path="/Admin/users/Staff" component={StaffFragment} />

            <Route
              exact
              path="/Admin/users/Driver"
              component={DriverFragment}
            />

            {/* Admin routes for settings Fragment */}

            <Route
              exact
              path="/Admin/settings/createusers"
              component={CreateUsersFragment}
            />
            <Route
              exact
              path="/Admin/settings/blockedusers"
              component={BlockedUsersFragment}
            />

            {/* Admin routes for registrationarea Fragment */}

            {/*SUBRoutes*/}

            <Route exact path="/Staff/Dashboard" component={StaffHome} />

            <Route
              exact
              path="/Staff/Dashboard/CompleteOrder"
              component={StaffCompleteOrderTable}
            />

            <Route exact path="/Driver/Dashboards" component={DriverHome} />

            <Route
              exact
              path="/Driver/Dashboards/CompleteOrders"
              component={DriverCompleteOrderTable}
            />

            {/*URoutes*/}

            <Route exact path="/Users/Details" component={Details} />
            <Route exact path="/Users/Details/OrderDetails" component={OrderDetails} />
            <Route exact path="/Users/Details/SingleOrderDetails" component={SingleOrderDetails} />

            {/*NonAuthRoutes*/}

            <Route exact path="/404" component={ErrorPage} />
          </Navigation>
        </Switch>
      </div>
    </Router>
  );
};

export default withAuthentication(App);
