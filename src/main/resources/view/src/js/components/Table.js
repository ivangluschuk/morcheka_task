'use strict';

import React from "react";
import "./Table.css";

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  renderNotes = () => {
      return this.props.notes.map((note) => {
        return (
          <tr key={note.id} >
            <td className="table__cell">
              <input 
                type="text" 
                defaultValue={note.firstName} 
                className="table__input" 
                disabled={this.props.state.editDisable}
                onChange={this.props.onFieldChange.bind(this, note)}
                ref={`${note.id}:firstName`}/>
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                defaultValue={note.lastName} 
                className="table__input" 
                disabled={this.props.state.editDisable}
                onChange={this.props.onFieldChange.bind(this, note)}
                ref={`${note.id}:lastName`}/>
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                defaultValue={note.address} 
                className="table__input" 
                disabled={this.props.state.editDisable}
                onChange={this.props.onFieldChange.bind(this, note)}
                ref={`${note.id}:address`}/>
            </td>
            <td className="table__cell">
              <input 
                type="text" 
                defaultValue={note.phone} 
                className="table__input" 
                disabled={this.props.state.editDisable}
                onChange={this.props.onFieldChange.bind(this, note)}
                ref={`${note.id}:phone`}/>
            </td>
            <td className="table__cell table__cell_button">
              <button 
                type="button"
                buttonMode="0"
                className={"button button_enable button_table"}
                onClick={this.props.editNote.bind(this, note)}
                ref={`${note.id}:edit`}>
                edit
              </button>
            </td>
            <td className="table__cell table__cell_button">
              <button type="button" 
                className="button button_enable button_table" 
                onClick={this.props.deleteNote.bind(this, note)} >
                delete
              </button>
            </td>
          </tr>  
      )}
    );
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