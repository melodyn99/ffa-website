import React, { Component } from 'react';

class Heart extends Component {
    render() {
        return (
            <span className={"heart " + (this.props.wishlist[this.props.id] ? 'active' : '')}
                onClick={(e) => this.props.handleWishlist(this.props.id)}
            ></span>
        )
    }
}

export default Heart;