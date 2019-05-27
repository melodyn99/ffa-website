import React, { Component } from 'react';

// Popup Contents
import MemberSettingsBookings from '../101Popup/MemberSettingsBookings';

class Popup extends Component {

    getPopupContent = (content) => {
        switch (content) {
            case 'MemberSettingsBookings': { return <MemberSettingsBookings />; }

            default: { return (<div>Oops...</div>); }
        }
    }

    render() {
        return (
            <div className="popup-plane">
                <div className="inner">
                    <div className="wrap">
                        <div className="content">
                            <div className="holder">

                                <div className="control"><span className="back"></span></div>

                                {this.getPopupContent(this.props.content)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Popup;
