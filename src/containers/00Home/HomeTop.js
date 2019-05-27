import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as InviteeActionCreators from '../actions/invitee';

import GridType3 from '../../components/102Grids/GridType3';

function Block (props) {
    return (
        <GridType3
            id={props.id}
            verified={props.verified}
            handleVerified={props.handleVerified}
            wishlist={props.wishlist}
            handleWishlist={props.handleWishlist}
        />
    )
}

function Cluster (props) {
    let rows = [];
    for (let i = 0; i < 3; i++) {
        rows.push(
            <div className={"oneThird left " + (i > 0 ? 'toHide' : '')} key={i} >
                <Block
                    key={i}
                    id={i}
                    verified={props.verified}
                    handleVerified={props.handleVerified}
                    wishlist={props.wishlist}
                    handleWishlist={props.handleWishlist}
                />
            </div>
        )
    }
    return (rows);
}

function Hot (props) {
    const {i18n} = props;

    return (
        <div>
            <div className="wrapper-hot">
                <div className="hot clearfix">
                    <Cluster
                        verified={props.verified}
                        handleVerified={props.handleVerified}
                        wishlist={props.wishlist}
                        handleWishlist={props.handleWishlist}
                    />

                    <div className="full left">
                        <div className="align-right">
                            <Link to={"/" + i18n.language + "/hotSpaces"} className="moreHotSpaces">More hot spaces</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function HomeTop(props) {
    return (
        <div className="wrapper-tabs">
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Hot Spaces">
                    <Hot
                        verified={props.verified}
                        handleVerified={props.handleVerified}
                        wishlist={props.wishlist}
                        handleWishlist={props.handleWishlist}


                    />
                </Tab>
                <Tab eventKey={2} title="Your Recent History">
                    <Hot
                        verified={props.verified}
                        handleVerified={props.handleVerified}
                        wishlist={props.wishlist}
                        handleWishlist={props.handleWishlist}
                    />
                </Tab>
            </Tabs>
        </div>
    )
}

// const mapStateToProps = (state) => (
// 	{
// 	}
// );

export default withTranslation()(HomeTop);
// connect(mapStateToProps)(Home);
