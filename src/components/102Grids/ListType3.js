import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';


import Verified from '../103Parts/Verified';
import Heart from '../103Parts/Heart';
import Reviews from '../103Parts/Reviews';
import CarTypes from '../103Parts/CarTypes';

function ListType3(props) {
    // const {t, i18n} = props;
    return (
        <div className="wrapper-ListType3">
            <div className="ListType3 clearfix">
                <div className="image" style={{ backgroundImage: `url(${require('../../images/mobile/General/dummy-img/img_milestone2.jpg')})` }}>
                    <Verified
                        id={props.id}
                        verified={props.verified}
                        handleVerified={props.handleVerified}
                    />
                    <Heart
                        id={props.id}
                        wishlist={props.wishlist}
                        handleWishlist={props.handleWishlist}
                    />
                </div>
                <div className="text">
                    <h3>Causeway Bay, COFCO Tower</h3>
                    <h3>262 Cloucester Road, Causeway Bay</h3>
                    <div className="sep-5"></div>
                    <span className="price">HKD 20 per hour</span> <span className="park">Day Park</span>
                    <div className="sep-10"></div>
                    <Reviews score={props.score} reviews={props.reviews} />
                    <div className="sep-5"></div>
                    <span className="owner">Max Cheung</span>
                    <div className="sep-10"></div>
                    <CarTypes carTypes={props.carTypes} />
                </div>

                <div className="sep-0"></div>

                <div className="information align-center">
                    <h4>Confirmed*</h4>
                    <dl className="clearfix">
                        <h5>Booking number</h5>
                        <dt>#B221508</dt>
                        <dd></dd>

                        <div className="sep-10"></div>

                        <h5>Booking period</h5>
                        <dt>from 2018-03-16 00:00 to 2018-03-17 00:00</dt>
                        <dd></dd>

                        <div className="sep-10"></div>

                        <h5>Fee type</h5>
                        <dt>Monthly parking</dt>
                        <dd></dd>

                        <div className="sep-10"></div>

                        <h5>Floor number</h5>
                        <dt>2/f</dt>
                        <dd></dd>

                        <div className="sep-10"></div>

                        <h5>Space number</h5>
                        <dt>246</dt>
                        <dd></dd>

                        <div className="sep-10"></div>

                        <h5>Total</h5>
                        <dt>HKD 3,200</dt>
                        <dd></dd>

                        <div className="sep-10"></div>

                        <h5>Owner's name</h5>
                        <dt className="short">Joe Lo (tel 6025 8669)</dt>
                        <dd className="short"><Link to="" className="button message">Message</Link></dd>

                        <div className="sep-10"></div>

                        <h5>Vehicle registration mark</h5>
                        <dt className="short">AB 2014</dt>
                        <dd className="short"><Link to="" className="button change">Change</Link></dd>

                        <div className="sep-20"></div>

                        <Link to="" className="button message">Button</Link>
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(ListType3);
