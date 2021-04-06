import React, { Component } from "react";
import ReactDOM from "react-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AdminReservationEditTable extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      reservationsCollection: [],
      tableName: []
    };
  }


  componentDidMount(){
     axios
      .get("https://ioproj2021.azurewebsites.net/tables/" + this.props.obj.tableID)
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
    //TODO: if admin - can't delete
    axios
      .delete(
        "https://ioproj2021.azurewebsites.net/reservation?reservationId=" +
          this.props.obj.reservationID
      )
      .then((res) => {
        console.log("User successfully deleted!");
        const users = res.data;
        this.setState({ users });
        this.props.history.push("about:blank");
        this.props.history.push("/admin-reservation-edit");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <tr>
        <td>{this.props.obj.reservationID}</td>
        <td>{this.state.tableName}</td>
        <td>{this.props.obj.isExpired + ""}</td>
        <td>{this.props.obj.userId}</td>
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

export default withRouter(AdminReservationEditTable);
