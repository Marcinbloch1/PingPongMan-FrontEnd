import React from "react";
import "../../../App.css";
import tablePro from "../../../images/table-pro.png";
import tableNormal from "../../../images/table-normal.png";
import tableNormalP from "../../../images/table-normalP.png";
// import tableNormalP from "../../images/table-normalp.png";
import tableProP from "../../../images/table-prop.png";

export default class Table extends React.Component {
  pickTable = (e) => {
    const table = e.target.closest(".table");
    const id = table.getAttribute("data");
    this.props.reserveTable(id);
  };

  nameType = (number) => {
    switch (number) {
      case 0:
        return "NORMAL TABLE";

      case 1:
        return "NORMAL+ TABLE";

      case 2:
        return "PRO TABLE";

      case 3:
        return "PRO+ TABLE";

      default:
        return "HYPER TABLE";
    }
  };

  imgChooser = (type) => {
    switch (type) {
      case 0:
        return tableNormal;

      case 1:
        return tableNormalP;

      case 2:
        return tablePro;

      case 3:
        return tableProP;

      default:
        return tableNormal;
    }
  };
  render() {
    return (
      <div onClick={this.pickTable} className="table" data={this.props.info.id}>
        <div className="table-number">TABLE {this.props.info.number + 1}</div>
        <div className="table-img">
          <img src={this.imgChooser(this.props.info.type)} />
        </div>
        <div className="table-type">{this.nameType(this.props.info.type)}</div>
        <div className="table-type">{this.props.info.brand.slice(0, 10)}</div>
      </div>
    );
  }
}
