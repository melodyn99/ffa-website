import React from 'react';
import { withTranslation } from 'react-i18next';


import Verified from '../103Parts/Verified';
import Heart from '../103Parts/Heart';
import Reviews from '../103Parts/Reviews';

function GridType5(props) {
    // const {t, i18n} = props;
    return (
        <div className="GridType5">
            <div className="image" style={{ backgroundImage: `url(${require('../../images/mobile/General/dummy-img/img_media.jpg')})` }}>
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
            <div className="text clearfix">
                <h3>Causeway Bay, COFCO Tower</h3>
                <h3>262 Cloucester Road, Causeway Bay</h3>
                <div className="sep-10"></div>
                <Reviews score={4} reviews={100} />
            </div>
        </div>
    )
}

export default withTranslation()(GridType5);
