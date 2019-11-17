'use strict';

import React from 'react';
import './Table.css';

class Table extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillReceiveProps(newProps) {
		if (newProps.notes.length !== this.props.notes.length) {
			this.props.loadTable(newProps.notes);
		}
	}

	renderNotes = () => {
		return this.props.state.rows.map((row, index) => {
			return (
				<tr key={row.note.id}>
					<td className="table__cell">
						<input
							type="text"
							defaultValue={row.note.firstName.text}
							className="table__input"
							disabled={row.editFieldDisable}
							onChange={e => {
								this.props.onFieldChange(
									e,
									this.props.state.rows,
									row.note.firstName,
									index
								);
							}}
						/>
					</td>
					<td className="table__cell">
						<input
							type="text"
							defaultValue={row.note.lastName.text}
							className="table__input"
							disabled={row.editFieldDisable}
							onChange={e => {
								this.props.onFieldChange(
									e,
									this.props.state.rows,
									row.note.lastName,
									index
								);
							}}
						/>
					</td>
					<td className="table__cell">
						<input
							type="text"
							defaultValue={row.note.address.text}
							className="table__input"
							disabled={row.editFieldDisable}
							onChange={e => {
								this.props.onFieldChange(
									e,
									this.props.state.rows,
									row.note.address,
									index
								);
							}}
						/>
					</td>
					<td className="table__cell">
						<input
							type="text"
							defaultValue={row.note.phone.text}
							className="table__input"
							disabled={row.editFieldDisable}
							onChange={e => {
								this.props.onFieldChange(
									e,
									this.props.state.rows,
									row.note.phone,
									index
								);
							}}
						/>
					</td>
					<td className="table__cell table__cell_button">
						<button
							type="button"
							buttonMode={row.buttonMode}
							disabled={row.editButtonDisable}
							className={row.className}
							onClick={this.props.editNote.bind(this, row, index)}
						>
							{row.innerHTML}
						</button>
					</td>
					<td className="table__cell table__cell_button">
						<button
							type="button"
							className="button button_enable button_table"
							onClick={this.props.deleteNote.bind(this, row.note)}
						>
							delete
						</button>
					</td>
				</tr>
			);
		});
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
				<tbody>{this.renderNotes()}</tbody>
			</table>
		);
	}
}

export default Table;
