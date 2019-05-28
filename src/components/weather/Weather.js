import React from 'react';
import axios from 'axios';


class Weather extends React.Component {
	
	
	state = {
		weatherData: null,
		networkError: false
	};
	
	
	componentDidMount = () => {
		this.loadWeather(this.props.match.params.woeid);
		this.resetInterval(this.props.match.params.woeid);
		
	}
	
	componentWillReceiveProps = (newProps) => {
		this.setState({weatherData: null});
		this.loadWeather(newProps.match.params.woeid);
		this.resetInterval(newProps.match.params.woeid);
		
	}
	
	loadWeather = (woeid) => {
		const apiUrl = 'https://www.metaweather.com/api/location/' + woeid;
		axios.get('https://cors-anywhere.herokuapp.com/' + apiUrl, {headers: {'Access-Control-Allow-Origin': '*'}})
			.then(res => {
				this.setState({networkError:false, weatherData: res.data});
			})
			.catch(err => {
				this.setState({networkError: true});
			});
	}
	
	resetInterval = (woeid) => {
		if (window.timer) clearInterval(window.timer);
		window.timer = setInterval(() => {
			this.loadWeather(woeid);
		}, 300000);
	}
	
	render() {
		
		if (this.state.networkError) return <div className="center" style={{color:'#ff9800'}}>Failed to load data, please select your location from menu...</div>;
		
		else return (
				this.state.weatherData
				? 
				<div className="center">
					<span>{this.state.weatherData.title}</span>
					<h1>{this.state.weatherData.consolidated_weather[0].weather_state_name}</h1>
					<span>humidity: {this.state.weatherData.consolidated_weather[0].humidity} %</span>
				</div>
				:
				<div className="center">Loading....</div>
		);
	}
	
}
	

export default Weather