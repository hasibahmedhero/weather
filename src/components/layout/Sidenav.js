import React from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';


class Sidenav extends React.Component {
	
	
	state = {
		locations: [],
		networkError: false,
		searchValue: ""
	};


	componentDidMount = () => {
		window.M.Sidenav.init(document.querySelectorAll('.sidenav'));

		const apiUrl = 'https://www.metaweather.com/api/location/search/?lattlong=23.4956258,88.1001921';
		axios.get('https://cors-anywhere.herokuapp.com/' + apiUrl, {headers: {'Access-Control-Allow-Origin': '*'}})
			.then(res => {
				this.setState({locations: res.data});
			})
			.catch(err => {
				this.setState({locations: [], networkError: true});
			});
		
	}
	
	
	handleSearch = (event) => {
		event.preventDefault();
		
		const apiUrl = 'https://www.metaweather.com/api/location/search/?query=' + encodeURI(this.state.searchValue);
		axios.get('https://cors-anywhere.herokuapp.com/' + apiUrl, {headers: {'Access-Control-Allow-Origin': '*'}})
			.then(res => {
				this.setState({locations: res.data, networkError: false});
			})
			.catch(err => {
				this.setState({locations: [], networkError: true});
			});
	}
	
	handleChange = (event) => {
		event.preventDefault();
		this.setState({
			searchValue: event.target.value
		})
	}


	render() {
		const locations = this.state.locations.map(location => <li className="sidenav-close" key={location.woeid}><NavLink to={'/' + location.woeid}>{location.title}</NavLink></li>);
		
		const searchForm = <li key="search" className="location-search"><form onSubmit={this.handleSearch}><input placeholder="Search.." onChange={this.handleChange} value={this.state.searchValue} /></form></li>
		
		const failed = <li key="failed" style={{lineHeight:'160%', padding:'0 32px', color:'#FF5722'}}>Failed to load locations, check your internet connection...</li>
		
		return(
			<ul id="slide-out" className="sidenav">
				{searchForm}
				{this.state.networkError ? failed :
				(locations.length ? locations : <li key="no-location" style={{padding:'0 32px'}}>No location found...</li>)
				}
			</ul>
		);
	}
}



export default Sidenav