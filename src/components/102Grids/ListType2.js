import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';


import Verified from '../103Parts/Verified';
import Heart from '../103Parts/Heart';
import Reviews from '../103Parts/Reviews';
import CarTypes from '../103Parts/CarTypes';

function ListType2(props) {
    const {
        //t,
        i18n
    } = props;

    return (
        <div className={"ListType2 clearfix " + (props.count === 0 ? 'first' : '')}>
            <div className="image" style={{ backgroundImage: `url(${require("../../images/mobile/General/dummy-img/img2.jpg")})` }}>
                <Verified
                    id={props.id}
                    verified={props.verified}
                />
                <Heart
                    id={props.id}
                    wishlist={props.wishlist}
                    handleWishlist={props.handleWishlist}
                />
            </div>
            <div className="text">
                <h3>{props.space.data.title}</h3>
                <h4>{props.space.data.address}</h4>
                {props.lowestPrice &&
                    <div className="sep-5"></div>
                }
                {props.lowestPrice &&
                    <div className="price">HKD {props.lowestPrice} per hour <div className="instantBooking"></div></div>
                }
                <div className="sep-10"></div>
                <Reviews score={props.score} reviews={props.reviews} />
                <div className="sep-10"></div>
                <CarTypes carTypes={props.carTypes} />
                <Link to={"/" + i18n.language + "/spaceOne/" + props.spaceID} className="button">Book Now</Link>
            </div>
        </div>
    )
}

export default withTranslation()(ListType2);
