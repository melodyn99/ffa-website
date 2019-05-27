import React, { Component } from 'react';

class Tags extends Component {
    render() {
        return (
            <ul className="tags clearfix">
                {this.props.tags.indexOf('NearEntrance') > -1 ? <li>Near entrance</li> : ''}
                {this.props.tags.indexOf('WideLoad') > -1 ? <li>Wide Load</li> : ''}
                {this.props.tags.indexOf('NearElevatorLift') > -1 ? <li>Near Elevator / Lift</li> : ''}
                {this.props.tags.indexOf('NearStairs') > -1 ? <li>Near Stairs</li> : ''}
                {this.props.tags.indexOf('NearBlock') > -1 ? <li>Near Block</li> : ''}
                {this.props.tags.indexOf('CorneredSpace') > -1 ? <li>Cornered Space</li> : ''}
            </ul>
        )
    }
}

export default Tags;