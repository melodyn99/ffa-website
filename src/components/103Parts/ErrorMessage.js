import React, { Component } from 'react';

class ErrorMessage extends Component {
    render(){
        return(
            <span className="errorMessage">{ this.props.message }</span>
        )
    }
}

export default ErrorMessage;