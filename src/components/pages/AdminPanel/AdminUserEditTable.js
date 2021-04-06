import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AdminUserEditTable extends Component {
  constructor(props) {
    super(props);
    this.state = { usersCollection: [] };
  }

  deleteUser() {
    axios
      .delete(
        "https://ioproj2021.azurewebsites.net/users?id=" +
          this.props.obj.id
      )
      .then((res) => {
        console.log("User successfully deleted!");
        this.props.history.push("about:blank");
        this.props.history.push("/admin-user-edit");
      })
      .catch((error) => {
        console.log(error);
      });
  }


  updateUser() {
    this.props.history.push({
      pathname: "/admin-user-update",
      state: this.props.obj,
    });
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.id}</td>
        <td>{this.props.obj.name}</td>
        <td>{this.props.obj.email}</td>
        <td>{this.props.obj.userRole}</td>
        <td>
          {
            <Button
              onClick={this.deleteUser.bind(this)}
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
              onClick={this.updateUser.bind(this)}
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

export default withRouter(AdminUserEditTable);
