import React from 'react';
import { withTranslation } from 'react-i18next';

import Verified from '../103Parts/Verified';
import Heart from '../103Parts/Heart';
import Reviews from '../103Parts/Reviews';
import CarTypes from '../103Parts/CarTypes';

function GridType1(props) {
    // const {t} = props;
    return (
        <div className="GridType1">
            <div className="image" style={{ backgroundImage: `url(${require('../../images/mobile/General/dummy-img/img_milestone2.jpg')})` }}>
                <Verified
                    id={props.id}
                    verified={props.verified}
                    handleVerified={props.handleVerified} />
                <Heart
                    id={props.id}
                    wishlist={props.wishlist}
                    handleWishlist={props.handleWishlist} />
                <div className="box">
                    <h4>Causeway Bay, COF Tower</h4>
                    <Reviews score={4} reviews={100} />
                </div>
            </div>
            <div className="text">
                <span className="price">HKD 20 per hour</span>
                <div className="sep-5"></div>
                <span className="owner">Max Cheung</span>
                <div className="sep-5"></div>
                <CarTypes carTypes={props.carTypes} />
            </div>
        </div>
    )
}

export default withTranslation()(GridType1);
