import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import Slider from "react-slick";

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as InviteeActionCreators from '../actions/invitee';

import data from '../../data/homeSlider';

class HomeMiddle extends Component {
    constructor(props) {
        super(props);

        // react slick settings
        this.settingsHot = {
            arrows: false,
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        this.settingsCustomer = {
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1,
            rtl: true
        };

        this.data = data;
    }

    render() {
        const { t, i18n } = this.props;
        
        return (
            <div className="wrapper-homeMiddle">
                <div className="wrapper-one">
                    <div className="one clearfix">
                        <div>
                            <div className="wrapper-benefitsOf">
                                <h3>{t("benefits:BenefitsofParkers.title-1")}<div className="sep-0"></div>{t("benefits:BenefitsofParkers.title-2")}</h3>
                                <ul className="benefitsOf clearfix">
                                    <div className="oneThird">
                                        <li>
                                            <div className="icon SearchBook"></div>
                                            <h5>{t("benefits:BenefitsofParkers.SEARCH&BOOK.title")}</h5>
                                            <p>{t("benefits:BenefitsofParkers.SEARCH&BOOK.content")}</p>
                                        </li>
                                    </div>
                                    <div className="oneThird">
                                        <li>
                                            <div className="icon Verified"></div>
                                            <h5>{t("benefits:BenefitsofParkers.VERIFIED.title")}</h5>
                                            <p>{t("benefits:BenefitsofParkers.VERIFIED.content")}</p>
                                        </li>
                                    </div>
                                    <div className="oneThird">
                                        <li>
                                            <div className="icon Guarantee"></div>
                                            <h5>{t("benefits:BenefitsofParkers.GUARANTEE.title")}</h5>
                                            <p>{t("benefits:BenefitsofParkers.GUARANTEE.content")}</p>
                                        </li>
                                    </div>
                                    <div className="full">
                                        <li>
                                            <Link to={"/" + i18n.language + "/benefits"} className="learnMore">Learn More</Link>
                                        </li>
                                    </div>
                                </ul>
                            </div>

                            <div className="wrapper-benefitsOf">
                                <h3>{t("benefits:BenefitsofOwners.title-1")}<div className="sep-0"></div>{t("benefits:BenefitsofOwners.title-2")}</h3>
                                <ul className="benefitsOf clearfix">
                                    <div className="oneThird">
                                        <li>
                                            <div className="icon Free"></div>
                                            <h5>{t("benefits:BenefitsofOwners.FREETOLIST.title")}</h5>
                                            <p>{t("benefits:BenefitsofOwners.FREETOLIST.content")}</p>
                                        </li>
                                    </div>
                                    <div className="oneThird">
                                        <li>
                                            <div className="icon GetPaid"></div>
                                            <h5>{t("benefits:BenefitsofOwners.GETPAID.title")}</h5>
                                            <p>{t("benefits:BenefitsofOwners.GETPAID.content")}</p>
                                        </li>
                                    </div>
                                    <div className="oneThird">
                                        <li>
                                            <div className="icon Insurance"></div>
                                            <h5>{t("benefits:BenefitsofOwners.INSURANCE.title")}</h5>
                                            <p>{t("benefits:BenefitsofOwners.INSURANCE.content")}</p>
                                        </li>
                                    </div>
                                    <div className="full">
                                        <li>
                                            <Link to={"/" + i18n.language + "/benefits"} className="learnMore">Learn More</Link>
                                        </li>
                                    </div>
                                </ul>
                            </div>

                            <div className="wrapper-howItWorks">
                                <h3>How it <div className="sep-0"></div>Works</h3>
                                <div className="howItWorks">
                                    <img src={require('../../images/m_homepage_how.jpg')} alt="" className="android" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper-two">
                    <div className="two clearfix">
                        <div>
                            <div className="wrapper-whatsHot align-right">
                                <h3 className="color-white">What's<div className="sep-0"></div> Hot</h3>
                                <div className="whatsHot align-center">
                                    <Slider {...this.settingsHot}>
                                        <div>
                                            <img src={require('../../images/m_homepage_whatshot.jpg')} alt="" />
                                        </div>
                                        <div>
                                            <img src={require('../../images/m_homepage_whatshot.jpg')} alt="" />
                                        </div>
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="wrapper-three">
                    <div className="three clearfix">
                        <div>
                            <div className="wrapper-ourCustomers align-right">
                                <h3 className="color-white">Our Customers<div className="sep-0"></div> Say</h3>
                                <div className="ourCustomers align-center">
                                    <Slider {...this.settingsCustomer}>
                                        {this.data
                                            .map((datum, i) =>
                                                <div key={i}>
                                                    <img src={require('../../images/m_homepage_customers.jpg')} alt="" />
                                                    <h4>{datum.Name}</h4>
                                                    <p>{datum.Comments}</p>
                                                    <h5>{datum.Location}</h5>
                                                </div>
                                            )
                                        }
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(HomeMiddle);
