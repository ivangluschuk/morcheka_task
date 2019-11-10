'use strict';

import React from "react";
import Table from "./Table.js";
import NoteAdder from "./NoteAdder.js";
import { api } from "../util/server.api.common.js";
import "./Crud.css";

class Crud extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
    };

    this.handleAddNote = this.handleAddNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
  }

  handleAddNote() {
    this.loadNotes();
  }

  async handleDeleteNote(note) {
    await api.deleteNoteById(note.id);
    this.loadNotes();
  }

  async handleEditNote(note) {
    await api.saveNote(note);
    this.loadNotes();
  }

  async loadNotes() {
    const notes = await api.getAllNotes();

    this.setState({
      notes: notes,
    });
  }

  render() {
    return (
      <div className="crud">
        <NoteAdder onNoteAdd={this.handleAddNote} />
        <Table 
          notes={this.state.notes} 
          onNoteDelete={this.handleDeleteNote} 
          onNoteEdit={this.handleEditNote} 
          login={this.state.login} />
      </div>
    );
  }

  componentWillMount() {
    this.loadNotes();
  }
}

export default Crud;