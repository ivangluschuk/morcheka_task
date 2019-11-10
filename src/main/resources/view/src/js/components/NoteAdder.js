'use strict';

import React from "react";
import { api } from "../util/server.api.common.js";
import { auth } from "../util/server.api.auth.js";
import "./NoteAdder.css";

class NoteAdder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: ["", true],
      lastName: ["", true],
      address: ["", true],
      phone: ["", true],
    };

    this.handleAddNote = this.handleAddNote.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  async handleAddNote() {
    const firstName = this.state.firstName[0];
    const lastName = this.state.lastName[0];
    const address = this.state.address[0];
    const phone = this.state.phone[0];

    const note = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      phone: phone,
    };

    this.refs.firstName.value = "";
    this.refs.lastName.value = "";
    this.refs.address.value = "";
    this.refs.phone.value = "";

    await api.saveNote(note);
    this.props.onNoteAdd(note);

    this.setState({
      firstName: ["", true],
      lastName: ["", true],
      address: ["", true],
      phone: ["", true]
    });
  }

  handleLogout() {
    api.logout();
  }

  onFieldChange(fieldName, event) {
    const note = [event.target.value.trim()];
    this.setState({
      ["" + fieldName]: note
    });

    if (event.target.value.trim().length > 0) {
      note[1] = false;
      this.setState({
        [this.refs["" + fieldName]]: note
      });
    } else {
      note[1] = true;
      this.setState({
        [this.refs["" + fieldName]]: note
      });
    }
  }

  render() {
    const firstNameIsEmpty = this.state.firstName[1];
    const lastNameIsEmpty = this.state.lastName[1];
    const addressIsEmpty = this.state.address[1];
    const phoneIsEmpty = this.state.phone[1];
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
                onChange={this.onFieldChange.bind(this, "firstName")} 
                ref="firstName" />
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Last name" 
                className="table__input" 
                onChange={this.onFieldChange.bind(this, "lastName")} 
                ref="lastName"/>
            </td> 
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Address" 
                className="table__input" 
                onChange={this.onFieldChange.bind(this, "address")} 
                ref="address" />
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                placeholder="Phone" 
                className="table__input" 
                onChange={this.onFieldChange.bind(this, "phone")} 
                ref="phone" />
            </td>
            <td className="table__cell table__cell_button">
              <button
                type="button"
                className={"button button_table-add " + ( buttonMode ? "button_disable" : "button_enable button_enable_table-add")} 
                onClick={this.handleAddNote}
                disabled={buttonMode}>
                add
              </button>
            </td>
            <td className="table__cell table__cell_button">
              <button
                type="button"
                className={"button button_table-add button_enable"} 
                onClick={auth.logout}>
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