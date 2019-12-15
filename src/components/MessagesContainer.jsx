import React from 'react';
import styles from '../styles/MessagesContainer.module.css';
import Message from './Message.jsx';
import FormInput from './FormInput.jsx';

export class MessagesContainer extends React.Component {
	constructor() {
		super();
		this.state = {
			messages: [],
			outerStyle: styles.hide,
			about: {},
		}

	    document.addEventListener('ChatSelected', this._onChatSelected.bind(this));
	    document.addEventListener('Hide', this._onHide.bind(this));
	    document.addEventListener('MessageSent', this._onMessageSent.bind(this));
	}

	createTrueMessages(key) {
		let trueMessages = [];
		let rowMessages = JSON.parse(localStorage.getItem(key)).messages;

		for (let i = 0; i < rowMessages.length; i++) {
			trueMessages.push(<Message message={{ text: rowMessages[i].text, time: rowMessages[i].time }} />);
		}

		let localState = this.state;
		localState.messages = trueMessages;
		this.setState(localState);
	}

	_onChatSelected(event) {
        let localState = this.state;
        localState.outerStyle = styles.show;
        localState.about = event.about;
        this.setState(localState);

        this.createTrueMessages(this.state.about.key);
    }

    _onHide() {
        let localState = this.state;
        localState.outerStyle = styles.hide;
        this.setState(localState);   
    }

    _onMessageSent(event) {
    	event.preventDefault();
    	//console.log(event);

		let data = JSON.parse(localStorage.getItem(this.state.about.key));
		data.messages.push({text: event.text, time: event.time, name: "User"});
		data.lastMessage = event.text;
		data.lastMessageTime = event.time;
    	localStorage.setItem(this.state.about.key, JSON.stringify(data));

    	let localState = this.state;
		localState.messages.push(<Message message={{ text: event.text, time: event.time }} />);
		this.setState(localState);
    }

	render() {
		return(
			<div className={ this.state.outerStyle }>
        		<div className={ styles.result }>
        			{ this.state.messages }
        		</div>
        		<FormInput />
    		</div>
		);
	}
}