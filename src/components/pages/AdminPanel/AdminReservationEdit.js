import React, { Component } from "react";
import "../../../App.css";
import axios from "axios";
import AdminReservationEditTable from "./AdminReservationEditTable";
import "./AdminUserEdit.css";

class AdminReservationEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { reservationsCollection: [] };
  }

  componentDidMount() {
    axios
      .get("https://ioproj2021.azurewebsites.net/reservation")
      .then((res) => {
        this.setState({ reservationsCollection: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  AdminReservationEditTable() {
    return this.state.reservationsCollection.map((data, i) => {
      return <AdminReservationEditTable obj={data} key={i} />;
    });
  }

  render() {
    return (
      <div className="wrapper fadeInDown">
        <h2>Reservations</h2>
          <div id="formContentTable">
            <table className="AdminUserEdit">
              <thead>
                <tr>
                  <th>Reservation ID</th>
                  <th>Table Name</th>
                  <th>Is expired</th>
                  <th>User ID</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{this.AdminReservationEditTable()}</tbody>
            </table>
          </div>
      </div>
      
    );
  }
}

export default AdminReservationEdit;
