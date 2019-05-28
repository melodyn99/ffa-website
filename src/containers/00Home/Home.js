import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import { withTranslation } from 'react-i18next';

import { CommonStyles } from '../../utils/01MaterialJsStyles/common'
import { HeaderStyles } from '../../utils/01MaterialJsStyles/header'
import combineStyles from '../../utils/01MaterialJsStyles/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import BreadCrumb from '../../components/100Include/breadcrumb';

import { apiAuth } from '../../Api/ApiAuth';
import { apiConferences } from '../../Api/ApiConferences';

import { connect } from 'react-redux';
import { login, verifyToken } from '../../Redux/Action/authAction';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formSubmitted: false
        }
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
            // do something
        }, 100);
    }

    _signInAsync = async () => {
        // await AsyncStorage.setItem('userToken', 'abc');
        apiAuth.authenticate('admin@joyaether.test', 'abcd1234').then((res) => {
            console.log(res);
            this.props.loginP(res.access_token);

            this._getConference();
        })
    };

    _getConference = () => {

        const cb = (obj) => {
            console.log("cb : ", obj);
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        apiConferences.getConferenceFullList(this.props.auth.token, cb, eCb);
    }

    render() {
        // const { i18n } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">報名歷史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <Button
                                    className={this.props.classes.createButton}
                                    onClick={() => { this._signInAsync() }}
                                >Hello</Button>
                            </div>
                        </div>

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

const combinedStyles = combineStyles(CommonStyles, HeaderStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(Home)));
