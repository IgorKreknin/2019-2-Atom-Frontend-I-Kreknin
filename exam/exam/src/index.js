import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import styles from './Styles/mainStyles.module.css';
//import App from './App';
import AddButton from './Components/AddButton.jsx';
import WeatherContainer from './Components/WeatherContainer.jsx';
import * as serviceWorker from './serviceWorker';

localStorage.setItem('Locations', JSON.stringify([
		{
    		"id": 519188,
    		"name": "Novinki",
    		"country": "RU",
    		"coord": {
      			"lon": 37.666668,
      			"lat": 55.683334
        	}
  		},
  	    {
		  "id": 707860,
		  "name": "Hurzuf",
		  "country": "UA",
		  "coord": {
		    "lon": 34.283333,
		    "lat": 44.549999
		  }
		},
		{
    	"id": 1283710,
    	  "name": "Bāgmatī Zone",
    	  "country": "NP",
    	  "coord": {
      		"lon": 85.416664,
      		"lat": 28
    	  }
  		},
  		  {
  		    "id": 529334,
  		    "name": "Mar’ina Roshcha",
  		    "country": "RU",
  		    "coord": {
  		      "lon": 37.611111,
  		      "lat": 55.796391
  		    }
  		  },
  		  {
  		    "id": 1269750,
  		    "name": "Republic of India",
  		    "country": "IN",
  		    "coord": {
  		      "lon": 77,
  		      "lat": 20
  		    }
  		  },
  		  {
  		    "id": 1283240,
  		    "name": "Kathmandu",
  		    "country": "NP",
  		    "coord": {
  		      "lon": 85.316666,
  		      "lat": 27.716667
  		    }
  		  },
  		  {
  		    "id": 703363,
  		    "name": "Laspi",
  		    "country": "UA",
  		    "coord": {
  		      "lon": 33.733334,
  		      "lat": 44.416668
  		    }
  		  },
  		  {
  		    "id": 3632308,
  		    "name": "Merida",
  		    "country": "VE",
  		    "coord": {
  		      "lon": -71.144997,
  		      "lat": 8.598333
  		    }
  		  },
  		  {
  		    "id": 473537,
  		    "name": "Vinogradovo",
  		    "country": "RU",
  		    "coord": {
  		      "lon": 38.545555,
  		      "lat": 55.423332
  		    }
  		  },
  		  {
  		    "id": 384848,
  		    "name": "Qarah Gawl al ‘Ulyā",
  		    "country": "IQ",
  		    "coord": {
  		      "lon": 45.6325,
  		      "lat": 35.353889
  		    }
  		  },
	]));

ReactDOM.render(
	<div className={ styles.bodyStyle }>
		<WeatherContainer />
		<AddButton />
	</div>, 
	document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
