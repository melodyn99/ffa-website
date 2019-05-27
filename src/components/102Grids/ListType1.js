import React from 'react';
import { withTranslation } from 'react-i18next';


import Verified from '../103Parts/Verified';
import Heart from '../103Parts/Heart';
import Reviews from '../103Parts/Reviews';
import CarTypes from '../103Parts/CarTypes';

function ListType1(props) {
    // const {t, i18n} = props;
    return (
        <div className="ListType1 clearfix">
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
                <div className="sep-10"></div>
                <span className="price">HKD 20 per hour</span> <span className="park">Day Park</span>
                <div className="sep-10"></div>
                <Reviews score={2} reviews={100} />
                <div className="sep-10"></div>
                <span className="owner">Max Cheung</span>
                <div className="sep-10"></div>
                <CarTypes carTypes={props.carTypes} />
            </div>
        </div>
    )
}

export default withTranslation()(ListType1);
