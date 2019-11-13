'use strict';

import React from "react";
import Table from "./Table.js";
import NoteAdder from "./NoteAdder.js";
import { connect } from 'react-redux';
import { handleAddNoteAdderForm } from '../actions/NoteAdderActions.js';
import { onFieldChangeNoteAdderForm } from '../actions/NoteAdderActions.js';
import { handleLogout } from '../actions/NoteAdderActions.js';
import { loadNotes } from '../actions/CrudActions.js';
import { handleAddNote } from '../actions/CrudActions.js';
import { handleDeleteNote } from '../actions/CrudActions.js';
import { handleEditNote } from '../actions/CrudActions.js';
import { onFieldChange } from '../actions/TableActions.js';
import { handleOnDelete } from '../actions/TableActions.js';
import { handleOnEdit } from '../actions/TableActions.js';

import "./Crud.css";

class Crud extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.loadNotes();
  }

  render() {
    return (
      <div className="crud">
        <NoteAdder 
          handleAddNote={this.props.handleAddNoteAdderForm}
          onFieldChange={this.props.onFieldChangeNoteAdderForm}
          handleLogout={this.props.handleLogout}
          loadNotes={this.props.loadNotes}
          state={this.props.noteAdder}/>
        <Table 
          notes={this.props.crud.notes} 
          state={this.props.table} 
          handleDeleteNote={this.props.handleDeleteNote} 
          onFieldChange={this.props.onFieldChange} 
          handleOnEdit={this.props.handleOnEdit}
          handleEditNote={this.props.handleEditNote}/>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    crud: store.crud,
    noteAdder: store.noteAdder,
    table: store.table,
  }
};

const mapDispatchToProps = dispatch => ({
    loadNotes: () => dispatch(loadNotes()),
    handleLogout: function() { dispatch(handleLogout.call(this)) },
    handleAddNoteAdderForm: function(firstName, lastName, address, phone, event) { 
        dispatch(handleAddNoteAdderForm.call(this, firstName, lastName, address, phone, event)) },
    onFieldChangeNoteAdderForm: function(fieldName, event) { 
        dispatch(onFieldChangeNoteAdderForm .call(this, fieldName, event)) },
    handleAddNote: function(note) { dispatch(handleAddNote.call(this, note)) },
    handleEditNote: function(note) { dispatch(handleEditNote.call(this, note)) },
    handleDeleteNote: function(note) { dispatch(handleDeleteNote.call(this, note)) },

    onFieldChange: function(note) { dispatch(onFieldChange.call(this, note)) },
    handleOnDelete: function(note) { dispatch(handleOnDelete.call(this, note)) },
    handleOnEdit: function(note) { dispatch(handleOnEdit.call(this, note)) },
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Crud);