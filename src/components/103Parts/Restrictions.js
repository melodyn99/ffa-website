import React, { Component } from 'react';

class Restrictions extends Component {
    render() {
        switch (this.props.restrictions) {
            case 'RestrictionsNo':
                return <p>No</p>
            case 'owner':
                return <p>For owners in this building</p>
            case 'OwnersParkers':
                return <p>For owners and parkers in this buiding</p>
            case 'VisitorsOnly':
                return <p>Visitors Only</p>
            default:
                return <p>No Restrictions</p>
        }
    }
}

export default Restrictions;