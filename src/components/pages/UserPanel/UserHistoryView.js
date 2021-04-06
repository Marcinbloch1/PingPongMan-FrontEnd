import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class UserHistoryView extends Component {
  constructor(props) {
    super(props);
    this.state = { reservationsCollection: [], tableName: [] };
  }

  componentDidMount() {
    axios
      .get(
        "https://ioproj2021.azurewebsites.net/tables/" + this.props.obj.tableID
      )
      .then((res) => {
        const reservations = res.data;
        //this.setState({ reservations });
        this.setState({ tableName: reservations.brand });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  deleteReservation() {
    axios
      .delete(
        "https://ioproj2021.azurewebsites.net/reservation?reservationId=" +
          this.props.obj.reservationID
      )
      .then((res) => {
        console.log("Reservation successfully deleted!");
        this.props.history.push("about:blank");
        this.props.history.push("/user-history");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <tr>
        <td>{this.state.tableName}</td>
        <td>{this.props.obj.isExpired + ""}</td>
        <td>{`${`${new Date(this.props.obj.from).getHours()}`.padStart(2, "0")}:${`${new Date( this.props.obj.from).getMinutes()}`.padStart(2, "0")}`}</td>
        <td>{`${`${new Date(this.props.obj.to).getHours()}`.padStart(2, "0")}:${`${new Date( this.props.obj.to).getMinutes()}`.padStart(2, "0")}`}</td>
        <td>
          {
            <Button
              onClick={this.deleteReservation.bind(this)}
              size="sm"
              variant="danger"
            >
              Delete
            </Button>
          }
        </td>
      </tr>
    );
  }
}

export default withRouter(UserHistoryView);
