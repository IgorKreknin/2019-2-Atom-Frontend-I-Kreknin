import React from 'react';
import stylesMain from '../styles/HeaderMain.module.css';
import stylesChat from '../styles/HeaderChat.module.css';
import stylesUser from '../styles/HeaderUser.module.css';
import burger from '../assets/burger.svg';
import back from '../assets/back.svg';
import photo from '../assets/photo.svg'
import search from '../assets/search.svg';
import menu from '../assets/menu.svg';
import confirm from '../assets/confirm.svg';

var styles = stylesMain;

export class CustomHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            route: "main",
            name: "Messager",
        }

        this.backOnClick = this.backOnClick.bind(this);
        this.burgerOnClick = this.burgerOnClick.bind(this);

        document.addEventListener('ChatSelected', this._onChatSelected.bind(this));
    }

	_onChatSelected(event) {
        event.preventDefault();
        let localState = this.state;
        localState.route = "chat";
        localState.name = event.about.name;
        this.setState(localState);
    }

	backOnClick() {
		let localState = this.state;
        localState.route = "main";
        localState.name = "Messager";
        this.setState(localState);
        document.dispatchEvent(new Event('Hide'));
        document.dispatchEvent(new Event('ShowChats'));
	}

    burgerOnClick() {
        let localState = this.state;
        localState.route = "user";
        localState.name = "Edit profile";
        this.setState(localState);
        document.dispatchEvent(new Event('Hide'));
        document.dispatchEvent(new Event('ShowUserProfile'));   
    }

    render() {
        if (this.state.route === "chat"){
            styles = stylesChat;
        }
        if (this.state.route === "main"){
            styles = stylesMain;
        }
        if (this.state.route === "user"){
            styles = stylesUser;
        }

    	return (
    		<div className={styles.header}>
            	<div className={styles.burger}>
                	<img src={ burger } onClick={ this.burgerOnClick } className={ styles.icon } alt=""/>
            	</div>
            	<div className={styles.back}>
                	<img src={ back } onClick={ this.backOnClick } className={ styles.icon } alt="" />
            	</div>
            	<div className={styles.title}>
                	<img src={ photo } className={styles.photo} alt=""/>
                	<div className={styles.name}>{ this.state.name }</div>
            	</div>
            	<div className={styles.search}>
                	<img src={ search } className={ styles.icon } alt="" />
            	</div>
            	<div className={styles.menu}>
                	<img src={ menu } className={ styles.icon } alt=""/>
            	</div>
                <div className={styles.confirm} onClick={ function(){document.dispatchEvent(new Event('ConfirmChanges'))} }>
                    <img src={ confirm } className={ styles.icon } alt=""/>
                </div>
        	</div>
    	);
    }
}