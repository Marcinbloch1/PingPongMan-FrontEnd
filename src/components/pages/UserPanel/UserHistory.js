// import React from "react";
// import "../../../App.css";

// export default function UserHistory() {
//   return (
//     <>
//       <h1 className="user-edit">User history page</h1>
//     </>
//   );
// }

import React, { Component } from "react";
import "../../../App.css";
import axios from "axios";
import UserHistoryView from "./UserHistoryView";
import "../AdminPanel/AdminUserEdit.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class UserHistory extends Component {
  constructor(props) {
    super(props);
    this.state = { reservationsCollection: [] };
  }

  componentDidMount() {
    const { user } = this.props.auth;
    axios
      .get("https://ioproj2021.azurewebsites.net/reservation/" + user.unique_name)
      .then((res) => {
        this.setState({ reservationsCollection: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  UserHistoryView() {
    return this.state.reservationsCollection.map((data, i) => {
      return <UserHistoryView obj={data} key={i} />;
    });
  }

  render() {
    return (
      <div className="wrapper fadeInDown">
        <h2>My Reservations</h2>
        <div id="formContentTable">
          <table className="AdminUserEdit">
            <thead>
              <tr>
                <th>Table Brand</th>
                <th>Is Expired</th>
                <th>From</th>
                <th>To</th>
              </tr>
            </thead>
            <tbody>{this.UserHistoryView()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

UserHistory.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(UserHistory);
