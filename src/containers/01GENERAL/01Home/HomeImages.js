// Essential for all components
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-doms';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
// import { Button } from '@material-ui/core';

// Material UI
import Grid from '@material-ui/core/Grid';

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
// import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils

// Children components
// import BreadCrumb from '../../../components/100Include/Breadcrumb';

class HomeImages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formSubmitted: false
        }
    }

    render() {
        // const { i18n,
        //     //classes 
        // } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">
                        <div className="wrapper-content">
                            <div className="content">
                                <Grid container spacing={16}>
                                    <Grid item xs={12} className="template-6">
                                        <img src={require('../../../images/1250x450.png')} alt="" />
                                    </Grid>
                                    <Grid item xs={6} className="template-5r">
                                        <img src={require('../../../images/600-400.png')} alt="" />
                                        <img src={require('../../../images/600x300.png')} alt="" />
                                    </Grid>
                                    <Grid item xs={6} className="template-5l">
                                        <img src={require('../../../images/600x300.png')} alt="" />
                                        <img src={require('../../../images/600-400.png')} alt="" />
                                    </Grid>
                                    
                                    {/* <Grid item xs={12}>
                                        <div className="topRow">
                                            <img src={require('../../../images/1250x450.png')} alt="" />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className="bottomRow">
                                        <div className="leftColumn">
                                            <img src={require('../../../images/600x300.png')} alt="" />
                                            <img src={require('../../../images/600-400.png')} alt="" />
                                        </div>
                                        <div className="rightColumn">
                                            <img src={require('../../../images/600-400.png')} alt="" />
                                            <img src={require('../../../images/600x300.png')} alt="" />
                                        </div>
                                        </div> */}
                                    {/* </Grid> */}
                                </Grid>
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
    // loginP: data => dispatch(login(data)),
    // verifyT: token => dispatch(verifyToken(token)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(HomeImages)));
