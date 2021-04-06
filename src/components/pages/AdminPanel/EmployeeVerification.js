import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { SubmitInput, SubmitInput1 } from "../../Buttons/SubmitInput";
import { connect } from "react-redux";
import "../../../App.css";
import axios from "axios";

class EmployeeVerification extends Component {
  componentDidMount() {
    const { user } = this.props.auth;
    axios
      .get("https://ioproj2021.azurewebsites.net/users/" + user.unique_name)
      .then((res) => {
        //console.log("this.props.obj._id");
        const users = res.data;
        this.setState({ users });
        //console.log(users.isAdmin);
        if (users.userRole === 1) {
          this.props.history.push("about:blank");
          this.props.history.push("/admin-account");
        } else if (users.userRole === 2) {
          this.props.history.push("/admin-user-edit");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return <></>;
  }
}

EmployeeVerification.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

//export default AdminAccount;
export default connect(mapStateToProps)(EmployeeVerification);
