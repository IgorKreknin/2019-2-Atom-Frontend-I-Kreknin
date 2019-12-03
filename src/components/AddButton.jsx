import React from 'react';
import styles from '../styles/AddButton.module.css';
import button from '../assets/pen.svg';

export class AddButton extends React.Component{
    constructor() {
        super();
        this.state = {
            outerStyle: styles.button,
        }

        document.addEventListener('Hide', this._onHide.bind(this));
        document.addEventListener('ShowChats', this._onShowChats.bind(this));
    }

	_onClick() {
        const name = prompt('Название нового чата: ');
        if (name === null || name === '') return;
        const date = new Date();
        const key = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
        const chatAbout = {
            key,
            name,
        };
        const chat = {
            messages: [],
            lastMessage: 'Этот чат пока пуст :(',
            lastMessageTime: `${date.getHours() > 9 ? date.getHours() : `0${date.getHours()}`
                                    }:${date.getMinutes() > 9 ? date.getMinutes() : `0${date.getMinutes()}`}`.replace('\n', ''),
            name,
        };
        localStorage.setItem(key, JSON.stringify(chat));
        let chats = JSON.parse(localStorage.getItem('chats'));
        if (chats === null) chats = [];
        chats.push(chatAbout);
        localStorage.setItem('chats', JSON.stringify(chats));
        document.dispatchEvent(new Event('NewChat'));
    }

    _onHide() {
        let localState = this.state;
        localState.outerStyle = styles.hide;
        this.setState(localState);
    }

    _onShowChats() {
        let localState = this.state;
        localState.outerStyle = styles.button;
        this.setState(localState);   
    }

    render() {
    	return (
    		<span className={ this.state.outerStyle }>
    	        <img src={ button } className={ styles.pen } onClick = { this._onClick } alt=""/>
    	    </span>
    	);
    }
}