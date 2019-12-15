import React from 'react';
import styles from '../styles/Message.module.css';


export default class Message extends React.Component {
	constructor(props) {
		super();
		const { message } = props;
		this.state = {
			owner: "",
			text: message.text,
			time: message.time,
			attachments: [],
		}
	}

	render() {
		return(
			<div className={ styles.message }>
    			<div className={ styles.messageText }>{ this.state.text }</div>
    			<div className={ styles.messageTime }>{ this.state.time }</div>
			</div>
		);
	}
}