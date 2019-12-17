import React from 'react'
import styles from '../Styles/AddButton.module.css'


export default class WeatherComponent extends React.Component {
	constructor() {
		super();
		this.state = {
			value: '',		
		}

		this._onAddButtonClick = this._onAddButtonClick.bind(this);
	}

	_onAddButtonClick() {
		return 0;
	}

	render() {
		return(
			<div>
				<span className={ styles.addButton } />
			</div>
		)
	}	
}