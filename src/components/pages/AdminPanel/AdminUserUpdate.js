import React, { useState, Component } from "react";
import { SubmitInput } from "../../Buttons/SubmitInput";
import validator from "validator";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";
import axios from "axios";

class AdminUserUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.location.state.id,
      name: this.props.location.state.name,
      email: this.props.location.state.email,
      //password: this.props.location.state.password,
      passwordHash: this.props.location.state.passwordHash,
      passwordSalt: this.props.location.state.passwordSalt,
      userRole: this.props.location.state.userRole,
    };
  }

  onclickRole(type) {
    this.setState((prevState) => {
      console.log(this.state.userRole);
      if (type == "add") {
        if (this.state.userRole != 2) {
          return {
            userRole: prevState.userRole + 1,
          };
        }
      } else if (type == "sub") {
        if (this.state.userRole != 0) {
          return {
            userRole: prevState.userRole - 1,
          };
        }
      }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      //password: this.state.password,
      //password: this.state.password,
      passwordSalt: this.state.passwordSalt,
      passwordHash: this.state.passwordHash,
      userRole: this.state.userRole,
    };

    console.log(newUser);

    axios
      .put(
        "https://ioproj2021.azurewebsites.net/users",
        newUser
      )
      .then((res) => {
        console.log(res.data);
        console.log("User successfully Updated");
        this.props.history.push("about:blank");
        this.props.history.push("/admin-user-edit");
      })
      .catch((error) => {
        console.log(error);
      });
    // Redirect to User list
  };

  render() {
    return (
      <div className="wrapper fadeInDown">
        <h2 className="registration">Update User</h2>
        <div id="formContent">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="Registration-state">
              <CompOne
                type="text"
                id="email"
                label="email"
                fieldName="email"
                fieldPlaceholder="email"
                value={this.state.email}
              />
              <br />
              <br />

              <CompOne
                type="number"
                id="userRole"
                label="Role"
                fieldName="userRole"
                fieldPlaceholder="userRole"
                value={this.state.userRole}
                maxlength="10"
              />
              <br />
              <input
                type="button"
                onClick={this.onclickRole.bind(this, "add")}
                value="Inc"
                className="btnIncDec"
              />
              <input
                type="button"
                onClick={this.onclickRole.bind(this, "sub")}
                value="Dec"
                className="btnIncDec"
              />
              <br />
              <br />
              <button className="inp" type="submit">
                Update User
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminUserUpdate;

function CompOne(props) {
  return (
    <React.Fragment>
      <label>{props.label}</label>
      <br />
      <input
        type={props.type}
        id={props.id}
        name={props.fieldName}
        class={props.className}
        value={props.value}
        placeholder={props.fieldPlaceholder}
        onChange={props.onChange}
        error={props.error}
      />
    </React.Fragment>
  );
}