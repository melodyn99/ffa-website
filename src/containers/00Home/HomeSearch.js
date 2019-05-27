import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import DatePicker from "react-datepicker";
import moment from "moment";

// import
// // PlacesAutocomplete,
// {
//     geocodeByAddress,
//     getLatLng,
// } from 'react-places-autocomplete';
// import LocationSearchInput from '../../components/04ListASpace/LocationSearchInput';

function HomeSearch(props) {
    let onDatepickerRef = (el) => {
        if (el && el.input) {
            el.input.readOnly = true;
        }
    }

    // let latLngHandler = (latLng, address) => {
    //     //console.log("StepOne", latLng);
    //     const data = {
    //         lat: latLng.lat,
    //         lng: latLng.lng,
    //         where: address
    //     };

    //     props.changeStateLevelTwoArray('search', data);
    // }

    return (
        <div className="wrapper-search">
            <div className="search clearfix">
                <div className="wrap clearfix">
                    <div className="oneThird left">
                        <div>
                            <h5>Type</h5>
                            <select value={props.type}
                                onChange={(e) => props.changeStateLevelTwo('search', 'type', e.target.value)}>
                                <option value="hourly">Hourly</option>
                                <option value="monthly">Monthly</option>
                                <option value="timeshare">Timeshare</option>
                            </select>
                            <div className="vertical-sep"></div>
                        </div>
                    </div>

                    <div className="sep-0 toShow"></div>

                    <div className="oneThird left">
                        <div>
                            <h5>When</h5>
                            <DatePicker
                                dateFormat="YYYY-MM-DD"
                                selected={props.search.DateStart === "" ? null : props.search.DateStart}
                                onChange={(e) => props.changeStateLevelTwo('search', 'DateStart', e)}
                                minDate={moment()}
                                maxDate={props.search.DateEnd ? moment(props.search.DateEnd) : null}
                                placeholderText="From"
                                ref={el => onDatepickerRef(el)}
                            />
                            <div className="vertical-sep"></div>
                        </div>
                    </div>
                    <div className="oneThird left">
                        <div>
                            <h5 className="toHide">&nbsp;</h5>
                            <DatePicker
                                dateFormat="YYYY-MM-DD"
                                selected={props.search.DateEnd === "" ? null : props.search.DateEnd}
                                onChange={(e) => props.changeStateLevelTwo('search', 'DateEnd', e)}
                                minDate={props.search.DateStart ? moment(props.search.DateStart) : moment()}
                                placeholderText="Until"
                                ref={el => onDatepickerRef(el)}
                            />
                        </div>
                    </div>
                    <div className="sep-0"></div>
                    <div className="sep-5"></div>
                    <div className="twoThird left">
                        <div>
                            <h5>Where</h5>
                            {/* <LocationSearchInput
                                placeholder="Please enter your location"
                                address={props.search.where}
                                handleChange={handleChange}
                                handleSelect={handleSelect}
                                latLngHandler={latLngHandler} /> */}

                            <input type="text" placeholder="Please enter your location"
                                onChange={(e) => props.changeStateLevelTwo('search', 'where', e.target.value)}
                                value={props.search.where}
                            />
                        </div>
                    </div>
                    <div className="oneThird left">
                        <div className="align-center">
                            <Link to="/" className="button special"
                                onClick={(e) => props.ApiSearch(e)}
                            >Search</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default withTranslation()(HomeSearch);
