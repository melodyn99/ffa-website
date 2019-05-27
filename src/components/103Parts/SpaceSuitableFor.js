import React, { Component } from 'react';

class SpaceSuitableFor extends Component {
    render() {
        return (
            <ul className="attributes small-icon">
                {this.props.cartype.indexOf("PrivateCar") > -1 ? <li><img src={require('../../images/mobile/03_find_parking_space/icon_car_1.png')} alt="" />Private Car</li> : ''}
                {this.props.cartype.indexOf("Van") > -1 ? <li><img src={require('../../images/mobile/03_find_parking_space/icon_car_1.png')} alt="" />Van</li> : ''}
                {this.props.cartype.indexOf("Motorcycle") > -1 ? <li><img src={require('../../images/mobile/03_find_parking_space/icon_car_1.png')} alt="" />Motorcycle</li> : ''}
                {this.props.cartype.indexOf("Lorry") > -1 ? <li><img src={require('../../images/mobile/03_find_parking_space/icon_car_1.png')} alt="" />Lorry</li> : ''}
                {this.props.cartype.indexOf("Others") > -1 ? <li><img src={require('../../images/mobile/03_find_parking_space/icon_car_1.png')} alt="" />Others</li> : ''}
            </ul>
        )
    }
}

export default SpaceSuitableFor;