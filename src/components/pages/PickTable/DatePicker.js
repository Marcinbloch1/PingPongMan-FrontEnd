import React from "react";
import Select from "react-select";
import "../../Buttons/Button.css";
import CarbonDatePicker from "react-carbon-datepicker";

const options = [
  { value: 1, label: "00:30" },
  { value: 2, label: "01:00" },
  { value: 3, label: "01:30" },
  { value: 4, label: "02:00" },
  { value: 5, label: "02:30" },
  { value: 6, label: "03:00" },
  { value: 7, label: "03:30" },
  { value: 8, label: "04:00" },
  { value: 9, label: "04:30" },
  { value: 10, label: "05:00" },
  { value: 11, label: "05:30" },
  { value: 12, label: "06:00" },
  { value: 13, label: "06:30" },
  { value: 14, label: "07:00" },
];

export default class Datepicker extends React.Component {
  // state = { hours: null, pickedTable: -1, numberOfHours: 0 };
  constructor(props) {
    super(props);

    this.state = {
      hours: this.props.hours,
      numberOfHours: "1",
      currentDate: this.trimDate(new Date()),
      pickedHour: 1,
      loggedUser: this.props.loggedUser,
      selectedValue: null,
    };
  }

  trimDate = (date) => {
    // date - (date % (24 * 60 * 60 * 1000))
    let dateToChange = date;
    dateToChange.setHours(0);
    dateToChange.setMinutes(0);
    dateToChange.setSeconds(0);
    dateToChange.setMilliseconds(0);

    return dateToChange.getTime();
  };

  dateChanged = async (arg) => {
    this.props.dateChanged(arg);
  };

  pickHour = (ev) => {
    this.showModal();
    this.setState({ pickedHour: ev.target.getAttribute("number") });
  };

  //returns true if its ok
  checkSpan = (start, hHoursNumber, hoursTable) => {
    if (!Number.isFinite(+hHoursNumber) || +hHoursNumber <= 0) return false;

    if (+start + +hHoursNumber > hoursTable?.length) return false;

    const pickedHours = hoursTable.slice(+start, +start + +hHoursNumber);

    return !pickedHours.some((element) => element.busy === true);
  };

  closeModal = () => {
    const modal = document.querySelector(".reservation-modal2");
    const overlay = document.querySelector(".modal-overlay2");
    modal.classList.add("modal-hidden");
    overlay.classList.add("modal-hidden");
  };
  showModal = () => {
    const modal = document.querySelector(".reservation-modal2");
    const overlay = document.querySelector(".modal-overlay2");
    modal.classList.remove("modal-hidden");
    overlay.classList.remove("modal-hidden");
  };

  makeReservation = async () => {
    if (
      !this.checkSpan(
        this.state.pickedHour,
        this.state.numberOfHours,
        this.props.hours
      )
    ) {
      alert("Reservation failed");
      return;
    }

    this.closeModal();
    this.props.higherClose();

    const sendObj = {
      reservationID: "",
      tableID: this.props.tableID + "",
      userId: this.props.loggedUser.unique_name + "",
      isExpired: false,
      from:
        +this.props.currentDate + this.state.pickedHour * 1000 * 60 * 30 + "",
      to:
        +this.props.currentDate +
        this.state.pickedHour * 1000 * 60 * 30 +
        this.state.numberOfHours * 1000 * 60 * 30 +
        "",
    };

    const request = await fetch(
      "https://ioproj2021.azurewebsites.net/reservation",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendObj),
      }
    );
    console.log(request);

    alert("Reservation completed");
  };

  handleInputChange = (arg) => {
    this.setState({ selectedValue: arg, numberOfHours: arg.value });
  };

  render() {
    return (
      <div className="modal-date-container">
        <div className="modal-header-2">
          <div className="modal-date-picker">
            <CarbonDatePicker onChange={this.dateChanged} />
          </div>
        </div>
        <br></br> <br></br>
        <div className="modal-date-reservation">
          <table>
            <tbody>
              <tr>
                <th>Pick your hour</th>
              </tr>
              {this.props.hours?.map((current, index) => {
                return (
                  <tr key={index}>
                    <td
                      className={current.busy ? "date-busy" : "date-active"}
                      onClick={!current.busy ? this.pickHour : () => {}}
                      number={index}
                      key={index}
                    >
                      {current.date}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="reservation-modal2 modal-hidden">
          {this.props.loggedUser.unique_name ? (
            <div>
              <br></br>
              <br></br>
              Choose for how long do you want to reserve
              <br></br>
              <br></br>
              <br></br>
              <button onClick={this.makeReservation} className="btn">
                Make reservation
              </button>
              <Select
                className="basic-single"
                classNamePrefix="select"
                options={options}
                onChange={this.handleInputChange}
                value={this.state.selectedValue}
              />
            </div>
          ) : (
            <div>Please log in first</div>
          )}

          <button className="close-modal2" onClick={this.closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-overlay2 modal-hidden"></div>
      </div>
    );
  }
}
