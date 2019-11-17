'use strict';

import React from 'react';
import './Login.css';

class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.toCrudPage(this.props.mode);
	}

	render() {
		const loginIsEmpty = this.props.state.login.empty;
		const passwordIsEmpty = this.props.state.password.empty;
		const infoMassageText = this.props.state.infoMassageText;
		const buttonMode = loginIsEmpty || passwordIsEmpty;

		return (
			<div>
				<form className="form">
					<fieldset className="form__fieldset">
						<legend>Sign up</legend>
						<input
							className="login"
							type="text"
							placeholder="login"
							value={this.props.state.login.text}
							autoFocus
							onChange={e => {
								this.props.onFieldChange(
									this.props.state.login,
									e.target.value.trim()
								);
							}}
						/>
						<input
							className="password"
							type="password"
							placeholder="password"
							value={this.props.state.password.text}
							onChange={e => {
								this.props.onFieldChange(
									this.props.state.password,
									e.target.value.trim()
								);
							}}
						/>
						<button
							className={
								'button button_up ' +
								(buttonMode ? 'button_disable' : 'button_enable')
							}
							type="button"
							onClick={this.props.login.bind(
								this,
								this.props.state.login.text,
								this.props.state.password.text
							)}
							disabled={buttonMode}
						>
							Log in
						</button>
						<button
							className="button button_enable"
							onClick={this.props.toRegisterPage.bind(this, this.props.mode)}
						>
							Sign up
						</button>
					</fieldset>
				</form>
				<p className="form-massage">{infoMassageText}</p>
			</div>
		);
	}
}

export default Login;
