import React, { useState, Component } from "react";
import { SubmitInput } from "../../Buttons/SubmitInput";
import validator from "validator";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";
import axios from "axios";

class AdminTableAdd extends Component {
  constructor() {
    super();
    this.state = {
      physicalCondition: 0,
      advancementLevel: 0,
      brand: "",
    };
  }

  onclickPhysicalCondition(type) {
    this.setState((prevState) => {
      console.log(this.state.physicalCondition);
      if (type == "add") {
        if (this.state.physicalCondition != 4) {
          return {
            physicalCondition: prevState.physicalCondition + 1,
          };
        }
      } else if (type == "sub") {
        if (this.state.physicalCondition != 0) {
          return {
            physicalCondition: prevState.physicalCondition - 1,
          };
        }
      }
    });
  }

  onclickadvancementLevel(type) {
    this.setState((prevState) => {
      console.log(this.state.advancementLevel);
      if (type == "add") {
        if (this.state.advancementLevel != 2) {
          return {
            advancementLevel: prevState.advancementLevel + 1,
          };
        }
      } else if (type == "sub") {
        if (this.state.advancementLevel != 0) {
          return {
            advancementLevel: prevState.advancementLevel - 1,
          };
        }
      }
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target.id);
    console.log(e.target.value);
  };



  onSubmit = (e) => {
    e.preventDefault();

    const newTable = {
      physicalCondition: this.state.physicalCondition,
      advancementLevel: this.state.advancementLevel,
      brand: this.state.brand
    };

    console.log(newTable);

    axios
      .post("https://ioproj2021.azurewebsites.net/tables", newTable)
      .then((res) => {
        console.log(res.data);
        console.log("Table successfully added");
      })
      .catch((error) => {
        console.log(error);
      });
    // Redirect to Table list
    this.props.history.push("/admin-table-edit");

  };

  render() {
    return (
      <div className="wrapper fadeInDown">
        <h2 className="registration">Add Table</h2>
        <div id="formContent">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="Registration-state">
              <CompOne
                type="number"
                label="Physical Condition"
                id="physicalCondition"
                fieldName="physicalCondition"
                fieldPlaceholder="Physical Condition"
                value={this.state.physicalCondition}
              />
              <br />
              <input
                type="button"
                onClick={this.onclickPhysicalCondition.bind(this, "add")}
                value="Inc"
                className="btnIncDec"
              />

              <input
                type="button"
                onClick={this.onclickPhysicalCondition.bind(this, "sub")}
                value="Dec"
                className="btnIncDec"
              />
              <br />
              <br />

              <CompOne
                type="number"
                label="Advancement Level"
                id="advancementLevel"
                fieldName="advancementLevel"
                fieldPlaceholder="advancement Level"
                value={this.state.advancementLevel}
              />
              <br />
              <input
                type="button"
                onClick={this.onclickadvancementLevel.bind(this, "add")}
                value="Inc"
                className="btnIncDec"
              />
              <input
                type="button"
                onClick={this.onclickadvancementLevel.bind(this, "sub")}
                value="Dec"
                className="btnIncDec"
              />
              <br />

              <CompOne
                type="text"
                id="brand"
                fieldName="brand"
                fieldPlaceholder="Brand"
                onChange={this.onChange}
                value={this.state.brand}
                maxlength="10"
              />
              <br />

              <button className="inp" type="submit">
                Add Table
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default (AdminTableAdd);

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