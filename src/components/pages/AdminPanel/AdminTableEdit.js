import React, { Component } from "react";
import "../../../App.css";
import axios from "axios";
import AdminTableEditTable from "./AdminTableEditTable";
import "./AdminUserEdit.css";

class AdminTableEdit extends Component {
  constructor(props) {
    super(props);
    this.state = { tablesCollection: [] };
  }

  componentDidMount() {
    axios
      .get("https://ioproj2021.azurewebsites.net/tables")
      .then((res) => {
        this.setState({ tablesCollection: res.data });
        //console.log(tablesCollection);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  AdminTableEditTable() {
    return this.state.tablesCollection.map((data, i) => {
      console.log(data);
      return <AdminTableEditTable obj={data} key={i} />;
    });
  }

  render() {
    return (
      <div className="wrapper fadeInDown">
        <h2>Tables</h2>
        <div id="formContentTable">
          <table className="AdminUserEdit">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Phhysical condition</th>
                <th>Advancement level</th>
                <th>Is busy</th>
                <th>Delete</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>{this.AdminTableEditTable()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default AdminTableEdit;
