// Essential for all components
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import { HeaderStyles } from '../../utils/01MaterialJsStyles/00Common/header'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Api
import { apiAuth } from '../../Api/ApiAuth';
import { apiConferences } from '../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';
import { login, verifyToken } from '../../Redux/Action/authAction';

// Utils

// Children components
import BreadCrumb from '../../components/100Include/breadcrumb';

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
        const params = null;

        apiConferences.getConferenceFullList(params, this.props.auth.token, cb, eCb);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">報名歷史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <Button
                                    className={classes.createButton}
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
