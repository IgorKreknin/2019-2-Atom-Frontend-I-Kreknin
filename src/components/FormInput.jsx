import React from 'react';
import '../styles/FormInput.module.css';

export default class FormInput extends React.Component {
	constructor() {
		super();
		this.state = {
			value: "",
		}

		this._onChange = this._onChange.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
	}

	_onChange(event) {
    	this.setState({value: event.target.value});
  	}

  	_onSubmit(e) {
  		e.preventDefault();
  		this.setState({value: ""});	
  		let event = new Event('MessageSent');
  		event.text = this.state.value; 
  		let currentTime = new Date();
        event.time = `${currentTime.getHours() > 9 ? currentTime.getHours() : `0${currentTime.getHours()}`
                        }:${currentTime.getMinutes() > 9 ? currentTime.getMinutes() : `0${currentTime.getMinutes()}`}`;
        document.dispatchEvent(event);
  	}

	render() {
		return(
			<form onSubmit={this._onSubmit}>
				<input type="text" name="message" placeholder="Сообщение" value={this.state.value} onChange={this._onChange} />
			</form>
		);
	}
}