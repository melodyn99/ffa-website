import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import Verified from '../103Parts/Verified';
import Heart from '../103Parts/Heart';
import Reviews from '../103Parts/Reviews';

function GridType3() {
    const {t} = props;

    return (
        <div className="GridType3">
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

                <div className="box">
                    <h4>Causeway Bay, COF Tower</h4>
                    <div className="price">$20 (per hour)</div>
                    <div className="sep-10"></div>
                    <Reviews score={4} reviews={100} />
                </div>
            </div>
        </div>
    )
}

export default withTranslation()(GridType3);
