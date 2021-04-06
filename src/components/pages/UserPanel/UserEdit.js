import React, { Component, useState } from "react";
import "../../../App.css";
import { TempUserForDemo } from "../../Navbar/AccountDropdownMenuItems";
import { SubmitInput } from "../../Buttons/SubmitInput";
import validator from "validator";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import axios from "axios";

class UserEdit extends Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            id: this.props.location.state.id,
            name: this.props.location.state.name,
            email: this.props.location.state.email,
            passwordSalt: this.props.location.state.passwordSalt,
            passwordHash: this.props.location.state.passwordHash,
            role: this.props.location.state.role
        };
        console.log("USER EDIT TEST")
        console.log("ID " + this.state.id)
        console.log("name: " + this.state.name)
        console.log("email: " + this.state.email)
        console.log("passwd: " + this.state.password)
        console.log("Role: " + this.state.role)
    }


    checkEmail = (e) =>
    {
        if (validator.isEmail(e.target.value)) this.isEmailCorrect = true;
        else this.isEmailCorrect = false;
        console.log(e.target.value);
    };
    checkName = (e) =>
    {
        if (validator.isAlpha(e.target.value)) this.isNameCorrect = true;
        else this.isNameCorrect = false;
        console.log(e.target.value);
    };
    GetUser()
    {
        console.log("GETTIN'");
        //axios.get("https://ioproj2021.azurewebsites.net/users/getUser/" + this.state.id)
        axios.get("https://ioproj2021.azurewebsites.net/users/" + this.state.id)
            //axios.get("https://ioproj2021.azurewebsites.net/users/getUser/" + "6036db9b2d1c0d514ece4c69")
            //axios.get("https://localhost:3000/users" + this.state.id)
            .then((res) =>
            {
                console.log("USER SUCCESS");
                const user_res = res.data
                /*this.state = {
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    password: res.password //TODO USUN�� BO TO TYLKO POGL�DOWO
                }*/
                this.state = {
                    id: user_res.id,
                    name: user_res.name,
                    email: user_res.email,
                    passwordSalt: user_res.passwordSalt, //TODO USUN�� BO TO TYLKO POGL�DOWO
                    passwordHash: user_res.passwordHash,
                    role: user_res.userRole,
                }
                console.log("user id: " + user_res.id)
                console.log(user_res.name)
                console.log(user_res.email)
                console.log(user_res.passwordHash)
                console.log(user_res.role)
            }).catch((error) =>
            {
                console.log(error);
            });
        console.log(this.state.email)
    }

    UpdateUser()
    {

        const updatedUser = {
            id: this.state.id,
            name: this.state.name,
            email: this.state.email,
            passwordSalt: this.state.passwordSalt,
            passwordHash: this.state.passwordHash,
            userRole: this.state.role,
        };
        console.log("UPDATING USER")
        console.log(updatedUser)
        axios
            //.put("https://ioproj2021.azurewebsites.net/updateUser/", updatedUser)
            .put("https://ioproj2021.azurewebsites.net/users/", updatedUser)
            .then((res) =>
            {
                console.log(res.data);
                console.log("User successfully Updated");

            })
            .catch((error) =>
            {
                console.log(error);
            });
        this.props.history.push("/user-account");

    }
    onChange = (e) =>
    {
        this.setState({ [e.target.id]: e.target.value });
        console.log(e.target.id);
        console.log(e.target.value);
    };
    render()
    {
        console.log("PRINTIN'")
        return (
            <>
                <div className="wrapper fadeInDown">
                    <h2>Edit your data</h2>
                    <div id="formContent">
                        <form action="" method="get" /*onSubmit={this.UpdateUser}*/>
                            <div className="UserEdit" >
                                <label>Name</label>
                                <CompOne
                                    fieldType="text"
                                    fieldId="name"
                                    fieldName="name"
                                    /*fieldPlaceholder = { this.state.name }*/
                                    fieldValue={this.state.name}
                                    onChange={this.onChange}
                                />
                                <br></br>
                                <label>E-mail</label>
                                <CompOne
                                    fieldType="text"
                                    fieldId="email"
                                    fieldName="email"
                                    /*fieldPlaceholder={this.state.email}*/
                                    fieldValue={this.state.email}
                                    onChange={this.onChange}
                                />
                                <br></br>
                                <button className="inp" name="yeet" onClick={this.UpdateUser.bind(this)} >CHANGE DATA</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

UserEdit.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

function CompOne(props)
{
    return (
        <React.Fragment>
            <label>{props.label}</label>
            <br />
            <input
                type={props.fieldType}
                id={props.fieldId}
                name={props.fieldName}
                class={props.className}
                value={props.fieldValue}
                placeholder={props.fieldPlaceholder}
                onChange={props.onChange}
            />
        </React.Fragment>
    );
}

export default connect(mapStateToProps, { logoutUser })(UserEdit);


/*
 * <SubmitInput link="/" className="inp" value="Change Data" />
*/
