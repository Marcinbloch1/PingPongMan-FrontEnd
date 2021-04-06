import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../../../App.css";
import axios from "axios";

class UserGetData extends Component
{
    componentDidMount()
    {
        const { user } = this.props.auth;
        //TODO MAKE  API NOT A HARDCODED BULLCRAP
        axios
            //.get("http://localhost:3000/api/users/" + user.id)
            //.get("https://ioproj2021.azurewebsites.net/users/getUser?id=" + user.id)
            //.get("https://ioproj2021.azurewebsites.net/users/getUser/" + user.id)
            .get("https://ioproj2021.azurewebsites.net/users/" + user.id)
            .then((res) =>
            {
                const users = res.data;
                this.setState({ users });
                this.state = {
                    id: users.id,
                    name: users.name,
                    email: users.email,
                    password: users.password,
                    role: users.userRole,
                    errors: {}
                };


                console.log("STATE")

                console.log("NAME: " + this.state.name)
                console.log("EMAIL: " + this.state.email)
                console.log(this.state.password)
                console.log("ROLE: " + this.state.role)


                this.render = this.render.bind(this);
                this.props.history.push("about:blank");
                this.ParamSendTest = this.ParamSendTest.bind(this);
                this.ParamSendTest();

            })
            .catch(function (error)
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
        return <></>;
    }
}

UserGetData.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps)(UserGetData);
