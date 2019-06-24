// Essential for all components
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import { HeaderStyles } from '../../../utils/01MaterialJsStyles/00Common/header'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';
// import { Button } from '@material-ui/core';

// Api
import { apiAuth } from '../../../Api/ApiAuth';
import { apiConferences } from '../../../Api/ApiConferences';

// Material UI
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { login, verifyToken } from '../../../Redux/Action/authAction';

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
        const { i18n } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main home">
                        <Grid container spacing={16} alignItems="center" height="100%">
                            <Grid item xs={12}>
                                <img src={require('../../../images/600-400.png')} alt="" />
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                                <Link to={"/" + i18n.language + "/home-images"} className="dummy1">Go to Home Images page</Link>
                            </Grid>
                        </Grid>
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
