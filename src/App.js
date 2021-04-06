import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/pages/SignIn/SignIn";
import Home from "./components/pages/homepage/Home";

import UserAccount from "./components/pages/UserPanel/UserAccount";
import UserEdit from "./components/pages/UserPanel/UserEdit";
import UserGetData from "./components/pages/UserPanel/UserGetDataToEdit";
import UserHistory from "./components/pages/UserPanel/UserHistory";

import Registration from "./components/pages/Register/registration";
import PriceList from "./components/pages/PriceList/PriceList";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";

import AdminUserEdit from "./components/pages/AdminPanel/AdminUserEdit";
import AdminTableEdit from "./components/pages/AdminPanel/AdminTableEdit";
import AdminAccount from "./components/pages/AdminPanel/AdminAccount";
import AdminVerification from "./components/pages/AdminPanel/AdminVerification";
import AdminTableAdd from "./components/pages/AdminPanel/AdminTableAdd";
import AdminTableUpdate from "./components/pages/AdminPanel/AdminTableUpdate";
import AdminReservationEdit from "./components/pages/AdminPanel/AdminReservationEdit";
import AdminUserUpdate from "./components/pages/AdminPanel/AdminUserUpdate";
import Reservation from "./components/pages/PickTable/Reservation";
import EmployeeVerification from "./components/pages/AdminPanel/EmployeeVerification";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./sign-in";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route exact path="/" exact component={Home} />
          {/* <Route exact path='/user-account' exact component={UserAccount} /> */}
                <PrivateRoute exact path="/user-edit" exact component={UserEdit} />
                <PrivateRoute exact path="/user-get-data" exact component={UserGetData} />
          <PrivateRoute
            exact
            path="/user-history"
            exact
            component={UserHistory}
          />
          <Route exact path="/sign-in" exact component={SignIn} />
          <Route exact path="/Registration" exact component={Registration} />
          <PrivateRoute
            exact
            path="/employee-verification"
            exact
            component={EmployeeVerification}
          />
          <Route exact path="/price-list" exact component={PriceList} />
          <PrivateRoute
            exact
            path="/admin-user-edit"
            exact
            component={AdminUserEdit}
          />
          <PrivateRoute
            exact
            path="/admin-table-edit"
            exact
            component={AdminTableEdit}
          />
          <PrivateRoute
            exact
            path="/admin-table-add"
            exact
            component={AdminTableAdd}
          />
          <PrivateRoute
            exact
            path="/admin-table-update"
            exact
            component={AdminTableUpdate}
          />
          <PrivateRoute
            exact
            path="/admin-user-update"
            exact
            component={AdminUserUpdate}
          />
          <PrivateRoute
            exact
            path="/admin-reservation-edit"
            exact
            component={AdminReservationEdit}
          />
          <Route exact path="/reservation" exact component={Reservation} />

          <Switch>
            {/* <PrivateRoute exact path="/dashboard" component={Dashboard} /> */}
            <PrivateRoute exact path="/user-account" component={UserAccount} />
            <PrivateRoute
              exact
              path="/admin-verification"
              component={AdminVerification}
            />
            <PrivateRoute
              exact
              path="/admin-account"
              component={AdminAccount}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
