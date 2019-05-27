import React, { Component } from 'react';

class Verified extends Component {
    render() {
        return (
            <span className={"verified " + (this.props.verified ? 'active' : '')}></span>
        )
    }
}

export default Verified;