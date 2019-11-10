'use strict';

import React from "react";
import "./Table.css";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editDisable: true,
      buttonMode: 0,
      nameIsEmpty: false,
      lastNameIsEmpty: false,
      addressIsEmpty: false,
      phone: false,
    };

    this.handleOnDelete = this.handleOnDelete.bind(this);
    this.handleOnEdit = this.handleOnEdit.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  };

  renderNotes = () => {
      return this.props.notes.map((note) => {
        
        return (
          <tr key={note.id} >
            <td className="table__cell">
              <input 
                type="text" 
                defaultValue={note.firstName} 
                className="table__input" 
                disabled={this.state.editDisable}
                onChange={this.onFieldChange.bind(this, note)}
                ref={`${note.id}:firstName`}/>
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                defaultValue={note.lastName} 
                className="table__input" 
                disabled={this.state.editDisable}
                onChange={this.onFieldChange.bind(this, note)}
                ref={`${note.id}:lastName`}/>
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                defaultValue={note.address} 
                className="table__input" 
                disabled={this.state.editDisable}
                onChange={this.onFieldChange.bind(this, note)}
                ref={`${note.id}:address`}/>
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                defaultValue={note.phone} 
                className="table__input" 
                disabled={this.state.editDisable}
                onChange={this.onFieldChange.bind(this, note)}
                ref={`${note.id}:phone`}/>
            </td>
            <td className="table__cell table__cell_button">
              <button 
                type="button"
                buttonMode="0"
                className={"button button_enable button_table"}
                onClick={this.handleOnEdit.bind(null, note)}
                ref={`${note.id}:edit`}>
                edit
              </button>
            </td>
            <td className="table__cell table__cell_button">
              <button type="button" 
                className="button button_enable button_table" 
                onClick={this.handleOnDelete.bind(null, note)} >
                delete
              </button>
            </td>
          </tr>  
      )}
    );
  };

  handleOnDelete(note) {
    this.props.onNoteDelete(note);
  };

  handleOnEdit(note) {
    this.refs[`${note.id}:firstName`].disabled = !this.refs[`${note.id}:firstName`].disabled;
    this.refs[`${note.id}:lastName`].disabled = !this.refs[`${note.id}:lastName`].disabled;
    this.refs[`${note.id}:address`].disabled = !this.refs[`${note.id}:address`].disabled;
    this.refs[`${note.id}:phone`].disabled = !this.refs[`${note.id}:phone`].disabled;

    if (this.refs[`${note.id}:edit`].buttonMode === 0) {
      this.refs[`${note.id}:edit`].className = "button button_enable button_table";
      this.refs[`${note.id}:edit`].buttonMode = "1";
      this.refs[`${note.id}:edit`].innerHTML = "edit";

      const firstName = this.refs[`${note.id}:firstName`].value;
      const lastName = this.refs[`${note.id}:lastName`].value;
      const address = this.refs[`${note.id}:address`].value;
      const phone = this.refs[`${note.id}:phone`].value;

      const newNote = {
        firstName: firstName,
        lastName: lastName,
        address: address,
        phone: phone,
        id: note.id
      };

      this.props.onNoteEdit(newNote);
    } else {
      this.refs[`${note.id}:edit`].className = "button button_enable button_table_edit";
      this.refs[`${note.id}:edit`].buttonMode = "0";
      this.refs[`${note.id}:edit`].innerHTML = "ok";
    }
  };

  onFieldChange(note) {
    const firstName = this.refs[`${note.id}:firstName`].value.length > 0;
    const lastName = this.refs[`${note.id}:lastName`].value.length > 0;
    const address = this.refs[`${note.id}:address`].value.length > 0;
    const phone = this.refs[`${note.id}:phone`].value.length > 0;

    const buttonMode = (firstName && lastName && address && phone);

    if (buttonMode) {
      this.refs[`${note.id}:edit`].disabled = false;
      this.refs[`${note.id}:edit`].className = "button button_enable button_table_edit";
    } else {
      this.refs[`${note.id}:edit`].disabled = true;
      this.refs[`${note.id}:edit`].className = "button button_table_disable";
    }
  };

  render() {
    return (
      <table className="table">
        <thead>
          <tr className="table__row">
            <th className="table__cell table__cell_th">Name</th>
            <th className="table__cell table__cell_th">last name</th>
            <th className="table__cell table__cell_th">Address</th>
            <th className="table__cell table__cell_th">Phone</th>
            <th className="table__cell table__cell_th">Edit</th>
            <th className="table__cell table__cell_th">Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.renderNotes()}
        </tbody>
      </table>
    );
  }
}

export default Table;