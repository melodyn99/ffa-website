import React, { Component } from 'react';

class TimePickerRange extends Component {
	render() {
		let x = 60; //minutes interval
		let tt = 0; // start time
		let ap = ['AM', 'PM']; // AM-PM
		let TimeOption = [];
		let default_selection;

		if (this.props.value !== undefined) {
			default_selection = this.props.value;
		}

		//loop to increment the time and push results in array
		let key = 1;
		for (let i = 0; tt < 24 * 60; i++) {

			// getting hours of day in 0-24 format
			let hh = Math.floor(tt / 60);
			// getting minutes of the hour in 0-55 format
			let mm = (tt % 60);
			// pushing data in array in [00:00 - 12:00 AM/PM format]
			let times = ("0" + (hh % 12)).slice(-2) + ':' + ("0" + mm).slice(-2) + " " + ap[Math.floor(hh / 12)];
			let val = (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;

			let Option;

			if (val === default_selection) {
				Option = <option value={val} selected key={"timepickerrange-" + key}>{times}</option>
			} else {
				Option = <option value={val} key={"timepickerrange-" + key}>{times}</option>
			}

			TimeOption.push(
				Option
			);

			tt = tt + x;
			key++;
		}

		return (
			TimeOption
		);
	}
}

class TimePicker extends Component {
	render() {
		return (
			<select
				className="whiteBg"
				onChange={(e) => (this.props.onChangeHandler !== undefined ? this.props.onChangeHandler(e.target.value) : null)}>
				<option value="">Time</option>
				<TimePickerRange value={this.props.value} />
			</select>
		)
	}
}

export default TimePicker;
