import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import "../../../App.css";
import Datepicker from "./DatePicker.js";
import Table from "./Table.js";

class Reservation extends React.Component {
  state = { didLoad: false, data: null };

  constructor(props) {
    super(props);

    // const { user } = this.props.auth;
    this.state = {
      ...this.state,
      loggedUser: this.props.auth.user,
      currentDate: this.trimDate(new Date()),
      tableID: "",
    };
    this.loadTables();
  }
  loadTables = async () => {
    try {
      const response = await fetch(
        "https://ioproj2021.azurewebsites.net/tables"
      );
      const data = await response.json();
      const tables = data.map((current, index) => {
        return {
          type: current.advancementLevel,
          number: index,
          id: current.tableID,
          brand: current.brand,
        };
      });

      this.setState({ didLoad: true, data: tables });
      console.log(tables);
    } catch (error) {
      console.log("loading tables - request failed ");
    }
  };
  trimDate = (date) => {
    // date - (date % (24 * 60 * 60 * 1000))
    let dateToChange = date;
    dateToChange.setHours(0);
    dateToChange.setMinutes(0);
    dateToChange.setSeconds(0);
    dateToChange.setMilliseconds(0);

    return dateToChange.getTime();
  };

  dateChanged = async (newDate) => {
    console.log(newDate);
    this.setState({ currentDate: newDate });
    this.makeDatesReq(this.state.tableID, newDate);
  };

  makeDatesReq = async (tableID, date) => {
    try {
      const response = await fetch(
        `https://ioproj2021.azurewebsites.net/reservation/${tableID}/${date}`
      );

      const data = await response.json();

      this.generate(data);
    } catch (error) {
      console.log("loading taken resereqest failed");
    }
  };
  generate = (recivedData) => {
    const openingHour = 8;
    const closingHour = 22;
    const timeArray = [];

    const pairs = recivedData.map((curr) => {
      return {
        from:
          new Date(+curr.from).getHours() * 2 +
          new Date(+curr.from).getMinutes() / 30,
        to:
          new Date(+curr.to).getHours() * 2 +
          new Date(+curr.to).getMinutes() / 30,
      };
    });

    for (let i = 0; i < 24; i++) {
      timeArray.push({
        date: `${`${i}`.padStart(2, "0")}:00`,
        busy: i < openingHour || i > closingHour,
      });

      timeArray.push({
        date: `${`${i}`.padStart(2, "0")}:30`,
        busy: i < openingHour || i > closingHour,
      });
    }

    pairs.forEach((element) => {
      for (let i = element.from; i < element.to; i++) {
        timeArray[i].busy = true;
      }
    });

    this.setState({ hours: timeArray });
  };

  reserveTable = async (id) => {
    this.setState({ tableID: id });

    await this.makeDatesReq(id, this.state.currentDate);

    this.showModal();
  };

  showModal = () => {
    const modal = document.querySelector(".reservation-modal");
    const overlay = document.querySelector(".modal-overlay");

    modal.classList.remove("modal-hidden");
    overlay.classList.remove("modal-hidden");
  };

  closeModal = () => {
    const modal = document.querySelector(".reservation-modal");
    const overlay = document.querySelector(".modal-overlay");

    modal.classList.add("modal-hidden");
    overlay.classList.add("modal-hidden");
  };

  render() {
    if (this.state.didLoad) {
      return (
        <div className="reservations">
          <div className="reservation-modal modal-hidden">
            <Datepicker
              tableID={this.state.tableID}
              hours={this.state.hours}
              higherClose={this.closeModal}
              loggedUser={this.state.loggedUser}
              dateChanged={this.dateChanged}
              currentDate={this.state.currentDate}
            />
            <button onClick={this.closeModal} className="close-modal">
              &times;
            </button>
          </div>
          <div className="modal-overlay modal-hidden"></div>

          <div className="reservation-header">Choose your table</div>
          <div className="table-container">
            {this.state.data.map((curr) => {
              return (
                <Table
                  reserveTable={this.reserveTable}
                  key={curr.id}
                  info={curr}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return <div style={{ color: "red", fontSize: 40 }}>LOADING DATA...</div>;
    }
  }
}
Reservation.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps)(withRouter(Reservation));
