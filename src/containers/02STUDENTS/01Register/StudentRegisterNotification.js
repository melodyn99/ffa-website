// Essential for all components
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Material UI
import Grid from '@material-ui/core/Grid';

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
// import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { Form } from 'formik';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/02STUDENTS/01Register/StudentRegister';

class StudentRegisterNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formSubmitted: false
        }
    }

    componentDidMount = () => {

    }

    navigationTo = (url) => {
        // const data = {
        //     ...this.props.auth.relatedData.course,
        //     conferenceId: '',
        // }

        // this.props.setRelatedCourseDataP(data);
        this.props.history.push(url);
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">报名申请</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <Form>
                                    <Grid container spacing={8} alignItems="stretch">
                                        <Grid item xs={1}>
                                            <div className="underline">录取通知</div>
                                        </Grid>
                                        <Grid item xs={12}>&nbsp;</Grid>

                                        <Grid item xs={12}>
                                            录取通知讯息，缴费通知讯息，成功录取状态等。
                                        </Grid>
                                    </Grid>
                                    <div className="bottomControl clearfix">
                                        <Button onClick={() => { this.navigationTo('student-register-fee') }} className={classes.blackButton}>上一步</Button>
                                    </div>
                                </Form>
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

});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(StudentRegisterNotification))));
