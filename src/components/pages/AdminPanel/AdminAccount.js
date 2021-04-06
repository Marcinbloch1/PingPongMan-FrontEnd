import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { SubmitInput, SubmitInput1 } from "../../Buttons/SubmitInput";
import { connect } from "react-redux";
import "../../../App.css";
import axios from "axios";

class AdminAccount extends Component {
  render() {
    return (
      <>
        <div className="wrapper fadeInDown">
          <h2>Admin Account</h2>
          <div id="formContent">
            {}
            <form action="about:blank" method="get">
              <div className="AdminUserEdit">
                <SubmitInput
                  link="/employee-verification"
                  className="inp-accounts"
                  value="View and edit users"
                />
                <SubmitInput
                  link="/admin-table-edit"
                  className="inp-accounts"
                  value="View and edit tables"
                />

                <SubmitInput
                  link="/admin-table-add"
                  className="inp-accounts"
                  value="Add table"
                />

                <SubmitInput
                  link="/admin-reservation-edit"
                  className="inp-accounts"
                  value="Reservations"
                />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  }
}

AdminAccount.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

//export default AdminAccount;
export default connect(mapStateToProps)(AdminAccount);
