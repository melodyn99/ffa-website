import React, { Component } from 'react';

class AccessType extends Component {
    render() {
        switch (this.props.accesstype) {
            case 'AccessCard':
                return <p>Access card / device</p>
            case 'OctopusCard':
                return <p>Octopus Card</p>
            case 'AccessTypeNo':
                return <p>No access card / device reqired</p>
            default:
                return <p>No access card / device reqired</p>
        }
    }
}

export default AccessType;