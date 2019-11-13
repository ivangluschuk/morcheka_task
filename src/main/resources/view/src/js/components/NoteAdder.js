'use strict';

import React from "react";
import "./NoteAdder.css";

class NoteAdder extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const firstNameIsEmpty = this.props.state.firstName[1];
    const lastNameIsEmpty = this.props.state.lastName[1];
    const addressIsEmpty = this.props.state.address[1];
    const phoneIsEmpty = this.props.state.phone[1];
    const buttonMode = (firstNameIsEmpty || lastNameIsEmpty || addressIsEmpty || phoneIsEmpty);

    return (
      <table className="table">
        <tbody>
          <tr>
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Name"
                className="table__input" 
                onChange={this.props.onFieldChange.bind(this, "firstName")} 
                ref="firstName" />
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Last name" 
                className="table__input" 
                onChange={this.props.onFieldChange.bind(this, "lastName")} 
                ref="lastName"/>
            </td> 
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Address" 
                className="table__input" 
                onChange={this.props.onFieldChange.bind(this, "address")} 
                ref="address" />
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Phone" 
                className="table__input" 
                onChange={this.props.onFieldChange.bind(this, "phone")} 
                ref="phone" />
            </td>
            <td className="table__cell table__cell_button">
              <button
                type="button"
                className={"button button_table-add " + ( buttonMode ? "button_disable" : "button_enable button_enable_table-add")} 
                onClick={this.props.handleAddNote.bind(this, "firstName", "lastName", "address", "phone")}
                disabled={buttonMode}>
                add
              </button>
            </td>
            <td className="table__cell table__cell_button">
              <button
                type="button"
                className={"button button_table-add button_enable"} 
                onClick={this.props.handleLogout.bind(this)}>
                logout
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default NoteAdder;