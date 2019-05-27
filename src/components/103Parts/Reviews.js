import React, { Component } from 'react';

class Reviews extends Component {
    render() {
        return (
            <ul className="reviews">
                <li className={this.props.score >= 1 ? "active" : ""}></li>
                <li className={this.props.score >= 2 ? "active" : ""}></li>
                <li className={this.props.score >= 3 ? "active" : ""}></li>
                <li className={this.props.score >= 4 ? "active" : ""}></li>
                <li className={this.props.score >= 5 ? "active" : ""}></li>
                <span>{this.props.reviews}0 reviews</span>
            </ul>
        )
    }
}

export default Reviews;