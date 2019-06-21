// Essential for all components
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
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
import BreadCrumb from '../../../components/100Include/Breadcrumb';

class Activity extends Component {
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

                        <h2 className="pageTitle">学院故事及新闻</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <h5>活动标题</h5>
                                <h6>发出日期</h6>
                                <Grid container spacing={16}>
                                    <Grid item xs={12} className="template-7">
                                        <img src={require('../../../images/600-400.png')} alt=""/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p>This is Activities</p>
                                    </Grid>
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(Activity)));
