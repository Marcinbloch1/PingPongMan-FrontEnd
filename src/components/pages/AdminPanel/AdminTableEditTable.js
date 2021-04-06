import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AdminTableUpdate from "./AdminTableUpdate";

class AdminTableEditTable extends Component {
  constructor(props) {
    super(props);
    this.state = { tablesCollection: [] };
  }

  deleteTable() {
    if (this.props.obj.isBusy === false) {
      console.log(this.props.obj.tableID);
      axios
        .delete(
          "https://ioproj2021.azurewebsites.net/tables?id=" +
            this.props.obj.tableID
        )
        .then((res) => {
          console.log("Table successfully deleted!");
          const tables = res.data;
          this.setState({ tables });
          this.props.history.push("about:blank");
          this.props.history.push("/admin-table-edit");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  AdminTableUpdate() {

    this.props.history.push({
      pathname: "/admin-table-update",
      state: this.props.obj,
    });
  }

  render() {
    return (
      <tr>
        {/* <td>{this.props.obj.tableID}</td> */}
        <td>{this.props.obj.brand}</td>
        <td>{this.props.obj.physicalCondition}</td>
        <td>{this.props.obj.advancementLevel}</td>
        <td>{this.props.obj.isBusy + ""}</td>

        <td>
          {
            <Button
              onClick={this.deleteTable.bind(this)}
              size="sm"
              variant="danger"
            >
              Delete
            </Button>
          }
        </td>
        <td>
          {
            <Button
              onClick={this.AdminTableUpdate.bind(this)}
              size="sm"
              variant="danger"
            >
              Update
            </Button>
          }
        </td>
      </tr>
    );
  }
}

export default withRouter(AdminTableEditTable);
