import React, { Component } from 'react';

import PlacesAutocomplete, {
	// geocodeByAddress,
	// getLatLng,
} from 'react-places-autocomplete';

import { GoogleApiWrapper } from 'google-maps-react';

class LocationSearchInput extends Component {

	render() {
		const searchOptions = {
			componentRestrictions: {
				country: 'hk',
			},
			types: ['address']
		}

		return (

			<PlacesAutocomplete
				className={this.props.className}
				placeholder={this.props.placeholder}
				value={this.props.address}
				onChange={this.props.handleChange}
				onSelect={this.props.handleSelect}
				searchOptions={searchOptions}
			>
				{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
					<div className="location-search-input">
						<input
							{...getInputProps({
								placeholder: 'Enter a location',
								className: (typeof(this.props.className) !== "undefined" ? this.props.className : "") + ' location-search-input',
							})}
						/>
						<div className="autocomplete-dropdown-container">
							{loading && <div>Loading...</div>}
							{suggestions.map(suggestion => {
								const className = suggestion.active
									? 'suggestion-item suggestion-item--active'
									: 'suggestion-item';
								// inline style for demonstration purpose
								const style = suggestion.active
									? { backgroundColor: '#fafafa', cursor: 'pointer' }
									: { backgroundColor: '#ffffff', cursor: 'pointer' };
								return (
									<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style,
										})}
									>
										<span>{suggestion.description}</span>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</PlacesAutocomplete>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: 'xxxx',
	language: 'en-us'
})(LocationSearchInput);