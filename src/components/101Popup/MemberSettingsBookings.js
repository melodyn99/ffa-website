import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MemberSettingsBookings extends Component {
    render() {
        return (
            <div>
                <div className="wrapper align-center">
                    <h4>Fee type</h4>

                    <div className="wrap align-left clearfix">
                        <div className="fifty">
                            <div>
                                <div className="radioFive">
                                    <div>
                                        <input type="radio" name="feeType" id="Monthly" />
                                        <label htmlFor="Monthly"></label>
                                    </div>
                                    <label htmlFor="Monthly">Monthly</label>
                                </div>
                            </div>
                        </div>
                        <div className="fifty">
                            <div>
                                <div className="radioFive">
                                    <div>
                                        <input type="radio" name="feeType" id="Hourly" />
                                        <label htmlFor="Hourly"></label>
                                    </div>
                                    <label htmlFor="Hourly">Hourly</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wrap align-left clearfix">
                        <div className="fifty">
                            <div>
                                <div className="radioFive">
                                    <div>
                                        <input type="radio" name="feeType" id="Timeshare" />
                                        <label htmlFor="Timeshare"></label>
                                    </div>
                                    <label htmlFor="Timeshare">Timeshare</label>
                                </div>
                            </div>
                        </div>
                        <div className="fifty">
                            <div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sep-40"></div>

                <div className="wrapper align-center">
                    <h4>Status</h4>

                    <div className="wrap align-left clearfix">
                        <div className="fifty">
                            <div>
                                <div className="radioFive">
                                    <div>
                                        <input type="radio" name="status" id="BookingFinished" />
                                        <label htmlFor="BookingFinished"></label>
                                    </div>
                                    <label htmlFor="BookingFinished">Booking finished</label>
                                </div>
                            </div>
                        </div>
                        <div className="fifty">
                            <div>
                                <div className="radioFive">
                                    <div>
                                        <input type="radio" name="status" id="Confirmed" />
                                        <label htmlFor="Confirmed"></label>
                                    </div>
                                    <label htmlFor="Confirmed">Confirmed</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="wrap align-left clearfix">
                        <div className="fifty">
                            <div>
                                <div className="radioFive">
                                    <div>
                                        <input type="radio" name="status" id="RequestCalcelled" />
                                        <label htmlFor="RequestCalcelled"></label>
                                    </div>
                                    <label htmlFor="RequestCalcelled">Request calcelled</label>
                                </div>
                            </div>
                        </div>
                        <div className="fifty">
                            <div>
                                <div className="radioFive">
                                    <div>
                                        <input type="radio" name="status" id="RequestExpired" />
                                        <label htmlFor="RequestExpired"></label>
                                    </div>
                                    <label htmlFor="RequestExpired">Request expired</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="sep-40"></div>

                <div className="wrapper align-center">

                    <div className="wrap align-left clearfix">
                        <div className="fifty">
                            <div>
                                <Link to="/" className="button">Apply</Link>
                            </div>
                        </div>
                        <div className="fifty">
                            <div>
                                <Link to="/" className="button grey">Reset</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default MemberSettingsBookings;
