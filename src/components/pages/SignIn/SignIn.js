//import React from 'react';
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../../App.css";
import { SubmitInput } from "../../Buttons/SubmitInput";
import "./SignIn.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import classnames from "classnames";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/user-account");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/user-account"); // push user to dashboard when they login
    }

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

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="wrapper fadeInDown">
        <h2 className="sign-in">Sign in</h2>
        <div id="formContent">
          <form noValidate onSubmit={this.onSubmit}>
            <div className="Logowanie-zabawa-zielone">
              <CompOne
                type="email"
                id="email"
                fieldName="email"
                fieldPlaceholder="Email"
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound,
                })}
              />
              <br />
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
              <CompOne
                type="password"
                id="password"
                fieldName="password"
                fieldPlaceholder="Password"
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                className={classnames("", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
              <br />
              <span className="red-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
              <button className="inp" type="submit">
                Log In
              </button>
            </div>
          </form>
          <div id="formFooter">
            <Link to="/Registration">
              Register!
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(SignIn);

//export default SignIn;
//export default function SignIn2() {

// onChange = e => {
//     this.setState({[e.target.id]: e.target.value});
// };

// return (
//     <div className="wrapper fadeInDown">
//         <h2 className='sign-in'>Sign in</h2>
//         <div id="formContent">
//             <form action="about:blank" method="get">
//                 <div className="Logowanie-zabawa-zielone">
//                     <CompOne fieldType="text" fieldId="login" fieldName="login" fieldPlaceholder="Login"/>
//                     <CompOne fieldType="password" fieldId="password" fieldName="login" fieldPlaceholder="Password"/>
//                     <SubmitInput link='/' className='inp' value='Log In' />
//                 </div>
//             </form>
//             <div id="formFooter" >
//                 <Link to='/' id='aContent' className='space'>
//                     Forgot password?
//                 </Link>
//                 <Link to='/Registration' className='space'>
//                     Register!
//                 </Link>
//             </div>
//         </div>
//     </div>
//  );
//}

export function CompOne(props) {
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
