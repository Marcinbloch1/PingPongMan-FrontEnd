import React, { Component, useState, useEffect } from "react";
//import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { SubmitInput, SubmitInput1 } from "../../Buttons/SubmitInput";
import { logoutUser, getUser } from "../../../actions/authActions";
import { connect } from "react-redux";
import "../../../App.css";
import axios from "axios";

class UserAccount extends Component
{
    constructor(props)
    {
        super(props);
        const { user } = this.props.auth;
        this.DeleteAccount = this.DeleteAccount.bind(this);
        //TODO MAKE  API NOT A HARDCODED BULLCRAP
        axios
            //.get("http://localhost:3000/api/users/" + user.id)
            //.get("https://ioproj2021.azurewebsites.net/users/getUser?id=" + user.id)
            //.get("https://ioproj2021.azurewebsites.net/users/getUser/" + user.id)
            .get("https://ioproj2021.azurewebsites.net/users/" + user.unique_name)
            .then((res) =>
            {
                const users = res.data;
                this.setState({ users });
                this.state = {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    //password: users.password,
                    passwordSalt: users.passwordSalt,
                    passwordHash: users.passwordHash,
                    role: users.userRole,
                    errors: {}
                };


                console.log("STATE")

                console.log(this.state.name)
                console.log(this.state.email)
                console.log(this.state.password)
                console.log("ROLE: " + this.state.role)


                this.render = this.render.bind(this);
                this.ParamSendTest = this.ParamSendTest.bind(this);
            })
            .catch(function (error)
            {
                console.log(error);
            });
        /*
         * 
        const temp = this.props.getUser(user.id);

        this.state =
        {
            test: temp.data,
        }
        console.log(this.state.test);*/
    }
    onLogoutClick = (e) =>
    {
        e.preventDefault();
        this.props.logoutUser();
    };
    DeleteAccount()
    {
        //const { user } = this.props.auth;

        this.props.logoutUser();
        axios
            //TODO fix this hack
            //.delete("http://localhost:3000/api/users/" + user.id)
            .delete("https://ioproj2021.azurewebsites.net/users?id=" + this.state.id)
            .then((res) =>
            {
                console.log("User successfully deleted!");
                const users = res.data;
                this.setState({ users });
                this.props.history.push("/");
            })
            .catch((error) =>
            {
                console.log(error);
            });
    }
    ParamSendTest()
    {
        console.log("goin to user edit")
        this.props.history.push(
            {
                pathname: "/user-edit",
                state: this.state,
            });
    }

    render()
    {
        return (
            <>
                <div className="wrapper fadeInDown">
                    <h2>User Account</h2>
                    <div id="formContent">
                        <form action="about:blank" method="get">
                            <div className="UserEdit">
                                <SubmitInput
                                    link="/user-history"
                                    className="inp-accounts"
                                    value="View reservation history"
                                />
                                <button
                                    className="inp-accounts"
                                    onClick={this.ParamSendTest.bind(this)}
                                >EDIT   ACCOUNT</button>
                                <button className="inp-accounts" onClick={this.DeleteAccount.bind(this)}>
                                    DELETE ACCOUNT
                </button>
                                <button className="inp-accounts" onClick={this.onLogoutClick}>
                                    Logout
                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

UserAccount.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(UserAccount);


/*
 *
 * /*<SubmitInput
                                    link="/user-history"
                                    className="inp"
                                    value="View reservation history"
                                />
 * */

/*
 * <SubmitInput
                                    link="/user-edit"
                                    className="inp"
                                    value="Edit account data"
                                />
 * */