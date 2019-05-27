import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';


class ListType4 extends Component {
    render() {
        return (
            <div className={"ListType4 clearfix " + (this.props.count === 0 ? 'first' : '')}>
                <div className="border-box clearfix">
                    <div className="control clearfix">
                        <div className="number">3</div>
                        <div className="arrow"></div>
                    </div>

                    <div className="wrap clearfix">
                        <div className="image" style={{ backgroundImage: `url(${require('../../images/mobile/General/dummy-img/img_milestone2.jpg')})` }}></div>
                        <div className="text">
                            <h4>Joe Lo</h4>
                            <div className="sep-5"></div>
                            <h3>Causeway Bay, COFCO Tower <br />262 Cloucester Road, Causeway Bay</h3>
                        </div>
                    </div>
                    <div className="details">
                        <span className="dateTime">11/12 Mon 14:04</span>
                        <div className="sep-10"></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet feugiat nibh, at commodo libero.</p>

                        <div className="align-center">
                            <Link to="/" className="button">Read more</Link>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default withTranslation()(ListType4);
