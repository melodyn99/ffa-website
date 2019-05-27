import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { withTranslation } from 'react-i18next';

import Slider from "react-slick";

import HomeSearch from './HomeSearch';
// import HomeTop from './HomeTop';
import HomeMiddle from './HomeMiddle';
import HomeBottom from './HomeBottom';

import * as HelperLayoutHandle from '../../utils/00General/LayoutHandle';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as FindParkingSpaceActionCreators from '../../actions/findParkingSpace';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: {
                DateStart: '',
                DateEnd: '',
                type: 'hourly',
                where: '',
                lat: null,
                lng: null,

            },
            formSubmitted: false,
            verified: {
                0: true,
                2: true
            },
            wishlist: {
                1: true
            }
        }

        this.settingsBanner = {
            arrows: false,
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            autoplay: true,
            autoplaySpeed: 3000,
            slidesToShow: 1,
            slidesToScroll: 1
        };

        this.changeStateLevelTwo = this.changeStateLevelTwo.bind(this);
        this.changeStateLevelTwoArray = this.changeStateLevelTwoArray.bind(this);
    }

    componentDidMount = () => {
        // const storageData = JSON.parse(sessionStorage.getItem('state'));
        //console.log(storageData);

        // if (storageData) {
        //     this.setState(storageData)
        // }

        HelperLayoutHandle.LayoutHandle.homepage();
        window.addEventListener("resize", this.windowResize);
    }

    componentDidUpdate = () => {
        // sessionStorage.setItem('state', JSON.stringify(this.state));
        // console.log(this.state);
    }

    windowResize = () => {
        var resizeTimer;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            HelperLayoutHandle.LayoutHandle.homepage();
            HelperLayoutHandle.LayoutHandle.top();
        }, 100);
    }

    handleVerified = (id) => {
        this.setState({
            verified: {
                ...this.state.verified,
                [id]: !this.state.verified[id]
            }
        });
    }

    handleWishlist = (id) => {
        this.setState({
            wishlist: {
                ...this.state.wishlist,
                [id]: !this.state.wishlist[id]
            }
        });
    }

    changeStateLevelTwo = (data1, data2, value) => {
        this.setState({
            [data1]: {
                ...this.state[data1],
                [data2]: value
            }
        })
    }

    changeStateLevelTwoArray = (data1, dataArray) => {
        this.setState({
            [data1]: {
                ...this.state[data1],
                ...dataArray
            }
        })
    }

    handleToSearch = (e) => {
        e.preventDefault();
        console.log(this.state.search);
        this.setState({
            ...this.state,
            formSubmitted: true
        });
    }

    render() {
        const {i18n} = this.props;

        if (this.state.formSubmitted) {
            let search = {};
            for (let k in this.state.search) {
                let key = k,
                    value = this.state.search[k];
                if (value && value !== "") {
                    switch (k) {
                        case 'DateStart':
                            key = 'from';
                            value = this.state.search[k].format("YYYY-MM-DD");
                            break;
                        case 'DateEnd':
                            key = 'to';
                            value = this.state.search[k].format("YYYY-MM-DD");
                            break;
                        case 'type':
                            key = 'booking_type';
                            break;
                        case 'where':
                            key = 'address';
                            break;
                        default: key = ''
                    }
                    search[key] = value;
                }
            }

            let queryString = Object.keys(search).map(k => k + "=" + search[k]).join("&");
            return <Redirect to={"/" + i18n.language + "/findYourSpace?" + queryString} />
        }

        return (
            <div>
                <div className="wrapper-container home">

                    <Slider {...this.settingsBanner}>
                        <div className="banner bannerOne">
                            {/* <img src={require('../../images/desktop/banner/homepage_1.jpg')} alt="" /> */}
                        </div>
                        <div className="banner bannerTwo">
                            {/* <img src={require('../../images/desktop/banner/homepage_2.jpg')} alt="" /> */}
                        </div>
                        <div className="banner bannerThree">
                            {/* <img src={require('../../images/desktop/banner/homepage_3andDiscover.jpg')} alt="" /> */}
                        </div>
                    </Slider>

                    <div className="page-title"><h2 className="atHome">Find Parking <span className="sep-0"></span>in seconds</h2></div>

                    <div className="sep-0"></div>

                    <div className="containerMain no-padding no-background">

                        <HomeSearch
                            search={this.state.search}
                            changeStateLevelTwo={this.changeStateLevelTwo}
                            changeStateLevelTwoArray={this.changeStateLevelTwoArray}
                            ApiSearch={this.handleToSearch}
                        />

                        {/* Leave for Phase 2 */}
                        {/* <HomeTop
                            verified={this.state.verified}
                            handleVerified={this.handleVerified}
                            wishlist={this.state.wishlist}
                            handleWishlist={this.handleWishlist}
                            
                            
                        /> */}
                    </div>
                </div>

                <HomeMiddle />

                <HomeBottom />
            </div>
        );
    }
}

export default withTranslation()(Home);