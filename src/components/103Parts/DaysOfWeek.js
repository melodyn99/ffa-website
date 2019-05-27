import React, { Component } from 'react';

class DaysOfWeek extends Component {
    render() {
        return (
            <ul className="days-of-week clearfix">
                <li className={(this.props.active.indexOf('Mon') > -1) ? 'active' : ''}
                    onClick={(e) => this.props.handleDaysOfWeek('Mon')}>Mon</li>
                <li className={(this.props.active.indexOf('Tue') > -1) ? 'active' : ''}
                    onClick={(e) => this.props.handleDaysOfWeek('Tue')}>Tue</li>
                <li className={(this.props.active.indexOf('Wed') > -1) ? 'active' : ''}
                    onClick={(e) => this.props.handleDaysOfWeek('Wed')}>Wed</li>
                <li className={(this.props.active.indexOf('Thu') > -1) ? 'active' : ''}
                    onClick={(e) => this.props.handleDaysOfWeek('Thu')}>thu</li>
                <li className={(this.props.active.indexOf('Fri') > -1) ? 'active' : ''}
                    onClick={(e) => this.props.handleDaysOfWeek('Fri')}>Fri</li>
                <li className={(this.props.active.indexOf('Sat') > -1) ? 'active' : ''}
                    onClick={(e) => this.props.handleDaysOfWeek('Sat')}>Sat</li>
                <li className={(this.props.active.indexOf('Sun') > -1) ? 'active' : ''}
                    onClick={(e) => this.props.handleDaysOfWeek('Sun')}>Sun</li>
                <li className={(this.props.active.indexOf('PH') > -1) ? 'active' : ''}
                    onClick={(e) => this.props.handleDaysOfWeek('PH')}>PH</li>
            </ul>
        )
    }
}

export default DaysOfWeek;
