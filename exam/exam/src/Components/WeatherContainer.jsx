import React from 'react'
import WeatherComponent from './WeatherComponent.jsx';

export default class WeatherContainer extends React.Component {
	constructor() {
		super();

		this.state = {
			components: [],
			value: '',
		}

		this._onSubmit = this._onSubmit.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount() {
		navigator.geolocation.getCurrentPosition(function(position){
			let src = "https://mars.priver.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=b6907d289e10d714a6e88b30761fae22";
			fetch(src)
				.then(function(response){return response.json()}.bind(this))
				.then(function(data){
					console.log(data);
				}.bind(this))
		}.bind(this))
	}

	_onSubmit(event){
		event.preventDefault();

		let src = "https://mars.priver.org/data/2.5/weather?q=" +  this.state.value + "&appid=b6907d289e10d714a6e88b30761fae22";

		console.log(src);

		let localState = this.state;
		localState.value = '';
		this.setState(localState);

		fetch(src).then(response => response.json()).then(function(data){
			console.log(data);
		})
	}

	_onChange(event){
		let localState = this.state;
		localState.value = event.target.value;
		this.setState(localState);
	}

	render() {
		return (
			<div>
				<form onSubmit={ this._onSubmit }>
					<input type='text' value={ this.state.value } onChange={ this._onChange }/>
					<input type='submit' />
				</form>
				<div>
					<WeatherComponent data={{ 'city': "Москва", 'temperature': "23", 'location': "Россия" }} />
					<WeatherComponent data={{ 'city': "Дубна", 'temperature': "21", 'location': "Россия" }} />
					<WeatherComponent data={{ 'city': "Саратов", 'temperature': "10", 'location': "Россия" }} />
				</div>
			</div>
		)
	}
}