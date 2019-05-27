import React, { Component } from 'react';

class Features extends Component {
    render() {
        return (
            <ul className="attributes">
                {this.props.features.indexOf("PrivateCar") > -1 ? <li><img src={require('../../images/mobile/03_find_parking_space/icon_feature_2.png')} alt="" />Private Car</li> : ''}
                {this.props.features.indexOf("NoCovers") > -1 ? <li><img src={require('../../images/mobile/03_find_parking_space/icon_feature_4.png')} alt="" />No Covers</li> : ''}
                {this.props.features.indexOf("Headroom") > -1 ? <li><img src={require('../../images/mobile/03_find_parking_space/icon_feature_5.png')} alt="" />Headroom</li> : ''}
                {this.props.features.indexOf("Indoor") > -1 ? <li><img src={require('../../images/mobile/03_find_parking_space/icon_feature_2.png')} alt="" />Indoor</li> : ''}
            </ul>
        )
    }
}

export default Features;