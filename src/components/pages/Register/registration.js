import React, { useState, Component } from "react";
import { SubmitInput } from "../../Buttons/SubmitInput";
import validator from "validator";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      password2match: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/sign-in");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      //password2: this.state.password2,
    };

    if(this.state.password !== this.state.password2)
    {
      this.setState({
        password2match: "Password must match"
      })
    }
    else
    {
      this.props.registerUser(newUser, this.props.history);
    }
    

    //console.log(newUser);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="wrapper fadeInDown">
        <h2 className="registration">Registration</h2>
        <div id="formContent">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="Registration-state">

              <CompOne
                type="text"
                id="name"
                fieldName="name"
                fieldPlaceholder="Name"
                onChange={this.onChange}
                value={this.state.name}
                error={errors.name}
                className={classnames("", { invalid: errors.name })}
              />
              <br />
              <span className="red-text">{errors.name}</span>
              <CompOne
                type="email"
                id="email"
                fieldName="email"
                fieldPlaceholder="E-Mail"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                className={classnames("", { invalid: errors.email })}
              />
              <br />
              <span className="red-text">{errors.email}</span>
              <CompOne
                type="password"
                id="password"
                fieldName="login"
                fieldPlaceholder="Password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                className={classnames("", { invalid: errors.password })}
              />
              <br />
              <span className="red-text">{errors.password}</span>
              <CompOne
                type="password"
                id="password2"
                fieldName="login"
                fieldPlaceholder="Confirm Password"
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                className={classnames("", { invalid: errors.password2 })}
              />
              <br />
              <p>{this.state.password2match}</p>
              <span className="red-text">{errors.password2}</span>
              <button className="inp" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
Registration.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(
  withRouter(Registration)
);

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
