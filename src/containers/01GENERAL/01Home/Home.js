// Essential for all components
import React, { Component } from 'react';
import Slider from "react-slick";
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
// import { Button } from '@material-ui/core';

// Api
import { apiAuth } from '../../../Api/ApiAuth';

// Material UI
// import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { login, verifyToken } from '../../../Redux/Action/authAction';
import { relative } from 'path';

// Utils

// Children components
// import BreadCrumb from '../../../components/100Include/Breadcrumb';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formSubmitted: false
        }
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.windowResize);
    }

    windowResize = () => {
        var resizeTimer;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // do something
        }, 100);
    }

    _signInAsync = async () => {
        apiAuth.authenticate('admin@joyaether.test', 'abcd1234').then((res) => {
            // console.log(res);
            this.props.loginP(res.access_token);
            this._getUserInfo();
        })
    };

    _getUserInfo = () => {

        const cb = (obj) => {
            console.log("cb : ", obj);
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        const params = null;

        apiAuth.getUserInfo(params, this.props.auth.token, cb, eCb);
    }

    render() {
        // const { i18n } = this.props;
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            appendDots: dots => (
                <div
                  style={{
                    backgroundColor: "transparent",
                    position:"relative"
                  }}
                >
                  <ul style={{ margin: "0px" }}> {dots} </ul>
                </div>
              ),
        }

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main home">
                        <Slider {...settings}>
                            <div>
                                <img src={require('../../../images/600-400.png')} alt="" />
                            </div>
                            <div>
                                <img src={require('../../../images/600-400.png')} alt="" />
                            </div>
                            <div>
                                <img src={require('../../../images/600-400.png')} alt="" />
                            </div>
                            <div>
                                <img src={require('../../../images/600-400.png')} alt="" />
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    loginP: data => dispatch(login(data)),
    verifyT: token => dispatch(verifyToken(token)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(Home)));
