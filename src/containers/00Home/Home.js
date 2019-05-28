import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import { withTranslation } from 'react-i18next';

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

        }, 100);
    }

    render() {
        // const { i18n } = this.props;

        return (
            <div>hello</div>
        );
    }
}

export default withTranslation()(Home);