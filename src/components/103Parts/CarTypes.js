import React, { Component } from 'react';

class CarTypes extends Component {
    render() {
        return (
            <ul className="carTypes clearfix">
                {this.props.carTypes.indexOf('Indoor') > -1 ? <li className="one"></li> : ''}
                {this.props.carTypes.indexOf('WithCovers') > -1 ? <li className="two"></li> : ''}
                {this.props.carTypes.indexOf('NoCovers') > -1 ? <li className="three"></li> : ''}
                {this.props.carTypes.indexOf('EV') > -1 ? <li className="four"></li> : ''}
            </ul>
        )
    }
}

export default CarTypes;
