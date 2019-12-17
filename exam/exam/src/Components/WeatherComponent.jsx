import React from 'react'
import styles from '../Styles/WeatherComponent.module.css'


export default class WeatherComponent extends React.Component {
	constructor(props) {
		super();
		const { data } = props
		this.state = {
			city: data.city,
			location: data.location,
			temperature: data.temperature,
		}
	}

	render() {
		return(
			<div className={ styles.component }>
				<div className={ styles.main }>
					<div className={ styles.mainAbout }>
						<div className={ styles.mainAboutCity }>{ this.state.city }</div>
						<div className={ styles.mainAboutLocation }>{ this.state.location }</div>
					</div>
					<div className={ styles.mainTemperature }>
						<div className={ styles.mainTemperatureIcon }></div>
						<div className={ styles.mainTemperatureText }>{ this.state.temperature }</div>
					</div>
				</div>
				<div className={ styles.footer }>
					<div className={ styles.footerAbout }>Good weather</div>
					<div className={ styles.footerTemperature }>2/15</div>
				</div>
			</div>
		)
	}	
}