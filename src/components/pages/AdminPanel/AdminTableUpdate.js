import React, { useState, Component } from "react";
import { SubmitInput } from "../../Buttons/SubmitInput";
import validator from "validator";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";
import axios from "axios";

class AdminTableUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      physicalCondition: this.props.location.state.physicalCondition,
      advancementLevel: this.props.location.state.advancementLevel,
      brand: this.props.location.state.brand,
      tableID: this.props.location.state.tableID,
      isBusy: this.props.location.state.isBusy,
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

  onclickAdvancementLevel(type) {
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

  onclickIsBusy(type) {
    this.setState((prevState) => {
      console.log(this.state.isBusy);
      if (type == "true") {
        return {
          isBusy: true,
        };
      } else if (type == "false") {
        return {
          isBusy: false,
        };
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
      tableID: this.state.tableID,
      physicalCondition: this.state.physicalCondition,
      advancementLevel: this.state.advancementLevel,
      isBusy: this.state.isBusy,
      brand: this.state.brand,
    };

    console.log(newTable);

    axios
      .put(
        "https://ioproj2021.azurewebsites.net/tables?id=" + newTable.tableID,
        newTable
      )
      .then((res) => {
        console.log(res.data);
        console.log("Table successfully Updated");
        this.props.history.push("about:blank");
        this.props.history.push("/admin-table-edit");
      })
      .catch((error) => {
        console.log(error);
      });
    // Redirect to Table list
  };

  render() {
    return (
      <div className="wrapper fadeInDown">
        <h2 className="registration">Update Table</h2>
        <div id="formContent">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="Registration-state">
              <CompOne
                type="text"
                id="tableID"
                label="Table ID"
                fieldName="tableID"
                fieldPlaceholder="tableID"
                //onChange={this.onChange}
                value={this.state.tableID}
                maxlength="10"
              />
              <br />
              <br />

              <CompOne
                type="text"
                id="isBusy"
                label="Is Busy"
                fieldName="isBusy"
                fieldPlaceholder="isBusy"
                //onChange={this.onChange}
                value={this.state.isBusy}
                maxlength="10"
              />
              <br />
              <input
                type="button"
                onClick={this.onclickIsBusy.bind(this, "true")}
                value="True"
                className="btnIncDec"
              />
              <input
                type="button"
                onClick={this.onclickIsBusy.bind(this, "false")}
                value="False"
                className="btnIncDec"
              />
              <br />
              <br />

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
                onClick={this.onclickAdvancementLevel.bind(this, "add")}
                value="Inc"
                className="btnIncDec"
              />
              <input
                type="button"
                onClick={this.onclickAdvancementLevel.bind(this, "sub")}
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
                Update Table
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AdminTableUpdate;

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
