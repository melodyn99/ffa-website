import React, { Component } from 'react';

class SocialShare extends Component {
    render() {
        return (
            <ul className="socialShare clearfix"><li>
                <a href={"/"} className="fb">&nbsp;</a></li><li>
                    <a href={"/"} className="ig">&nbsp;</a></li><li>
                    <a href={"/"} className="twitter">&nbsp;</a></li><li>
                    <a href={"/"} className="googlePlus">&nbsp;</a></li>
            </ul>
        )
    }
}

export default SocialShare;
