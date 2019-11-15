'use strict';

import React from "react";
import Table from "../components/Table.js";
import NoteAdder from "../components/NoteAdder.js";
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import { crudActions } from '../actions/CrudActions.js';
import { noteAdderActions } from '../actions/NoteAdderActions.js';
import { tableActions } from '../actions/TableActions.js';

import "../components/Crud.css";

class Crud extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.crudActions.loadNotes();
  }

  render() {
    return (
      <div className="crud">
        <NoteAdder 
          addNote={this.props.noteAdderActions.addNote}
          onFieldChange={this.props.noteAdderActions.onFieldChange}
          logout={this.props.noteAdderActions.logout}
          loadNotes={this.props.crudActions.loadNotes}
          state={this.props.noteAdder}/>
        <Table 
          onFieldChange={this.props.tableActions.onFieldChange} 
          editNote={this.props.tableActions.editNote}
          deleteNote={this.props.tableActions.deleteNote} 
          loadNotes={this.props.crudActions.loadNotes}
          notes={this.props.crud.notes} 
          state={this.props.table}/> 
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
    crudActions: {
      loadNotes: function() { dispatch(crudActions.loadNotes.call(this)) }, 
    },
    noteAdderActions: {
      addNote: function(firstNameRef, lastNameRef, addressRef, phoneRef) { 
        dispatch(noteAdderActions.addNote.call(this, firstNameRef, lastNameRef, addressRef, phoneRef)) },
      onFieldChange: function(fieldName) { dispatch(noteAdderActions.onFieldChange.call(this, fieldName)) },
      logout: () => dispatch(noteAdderActions.logout()), 
    },
    tableActions: {
      deleteNote: function(note) { dispatch(tableActions.deleteNote.call(this, note)) },
      onFieldChange: function(note) { dispatch(tableActions.onFieldChange.call(this, note)) },
      editNote: function(note) { dispatch(tableActions.editNote.call(this, note)) },
    },
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Crud);

Crud.propTypes = {
  crud: PropTypes.shape({
    notes: PropTypes.array.isRequired,
  }).isRequired,

  noteAdder: PropTypes.shape({
    firstName: PropTypes.arrayOf(PropTypes.string.isRequired, PropTypes.bool.isRequired).isRequired,
    lastName: PropTypes.arrayOf(PropTypes.string.isRequired, PropTypes.bool.isRequired).isRequired,
    address: PropTypes.arrayOf(PropTypes.string.isRequired, PropTypes.bool.isRequired).isRequired,
    phone: PropTypes.arrayOf(PropTypes.string.isRequired, PropTypes.bool.isRequired).isRequired,
  }).isRequired,

  table: PropTypes.shape({
    editDisable: PropTypes.bool.isRequired,
    buttonMode: PropTypes.number.isRequired,
    nameIsEmpty: PropTypes.bool.isRequired,
    lastNameIsEmpty: PropTypes.bool.isRequired,
    addressIsEmpty: PropTypes.bool.isRequired,
    phone: PropTypes.bool.isRequired,
  }).isRequired,

  crudActions: PropTypes.shape({
    loadNotes: PropTypes.func.isRequired,
  }).isRequired,

  noteAdderActions: PropTypes.shape({
    addNote: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }).isRequired,

  tableActions: PropTypes.shape({
    deleteNote: PropTypes.func.isRequired,
    onFieldChange: PropTypes.func.isRequired,
    editNote: PropTypes.func.isRequired,
  }).isRequired,
};