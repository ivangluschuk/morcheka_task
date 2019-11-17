'use strict';

import React from 'react';
import './NoteAdder.css';

class NoteAdder extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const firstNameIsEmpty = this.props.state.firstName.empty;
		const lastNameIsEmpty = this.props.state.lastName.empty;
		const addressIsEmpty = this.props.state.address.empty;
		const phoneIsEmpty = this.props.state.phone.empty;
		const buttonMode =
			firstNameIsEmpty || lastNameIsEmpty || addressIsEmpty || phoneIsEmpty;

		return (
			<table className="table">
				<tbody>
					<tr>
						<td className="table__cell">
							<input
								type="text"
								placeholder="Name"
								className="table__input"
								value={this.props.state.firstName.text}
								onChange={e => {
									this.props.onFieldChange(
										this.props.state.firstName,
										e.target.value.trim()
									);
								}}
							/>
						</td>
						<td className="table__cell">
							<input
								type="text"
								placeholder="Last name"
								className="table__input"
								value={this.props.state.lastName.text}
								onChange={e => {
									this.props.onFieldChange(
										this.props.state.lastName,
										e.target.value.trim()
									);
								}}
							/>
						</td>
						<td className="table__cell">
							<input
								type="text"
								placeholder="Address"
								className="table__input"
								value={this.props.state.address.text}
								onChange={e => {
									this.props.onFieldChange(
										this.props.state.address,
										e.target.value.trim()
									);
								}}
							/>
						</td>
						<td className="table__cell">
							<input
								type="text"
								placeholder="Phone"
								className="table__input"
								value={this.props.state.phone.text}
								onChange={e => {
									this.props.onFieldChange(
										this.props.state.phone,
										e.target.value.trim()
									);
								}}
							/>
						</td>
						<td className="table__cell table__cell_button">
							<button
								type="button"
								className={
									'button button_table-add ' +
									(buttonMode
										? 'button_disable'
										: 'button_enable button_enable_table-add')
								}
								onClick={this.props.addNote.bind(this)}
								disabled={buttonMode}
							>
								add
							</button>
						</td>
						<td className="table__cell table__cell_button">
							<button
								type="button"
								className={'button button_table-add button_enable'}
								onClick={this.props.logout.bind(this)}
							>
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
