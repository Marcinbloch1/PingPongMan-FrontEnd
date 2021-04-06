import React, { Component } from "react";
import "../../../App.css";
import axios from "axios";
import AdminUserEditTable from "./AdminUserEditTable";
import "./AdminUserEdit.css";

class AdminUserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { usersCollection: [] };
  }

  componentDidMount() {
    axios
      .get("https://ioproj2021.azurewebsites.net/users")
      .then((res) => {
        this.setState({ usersCollection: res.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  AdminUserEditTable() {
    return this.state.usersCollection.map((data, i) => {
      return <AdminUserEditTable obj={data} key={i} />;
    });
  }

  render() {
    return (
      <div className="wrapper fadeInDown">
        <h2>Users</h2>
          <div id="formContentTable">
            <table className="AdminUserEdit">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{this.AdminUserEditTable()}</tbody>
            </table>
          </div>
      </div>
      
    );
  }
}

export default AdminUserEdit;