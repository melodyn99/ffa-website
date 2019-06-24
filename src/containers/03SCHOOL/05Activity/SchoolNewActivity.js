// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
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
// import { apiAuth } from '../../Api/ApiAuth';
// import { apiConferences } from '../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import ErrorMessage from '../../../components/01General/ErrorMessage';
// import data from '../../data/09Account/EnrollmentHistory';

class SchoolNewActivity extends React.Component {

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n 
        } = this.props;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1} >
                        活动标题
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="activityName" type="text" placeholder="活动1" maxLength="100" />
                        {errors.activityName && touched.activityName ? <ErrorMessage message={errors.activityName} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        活动内容
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="activityContent" type="text" placeholder="活动内容1" maxLength="100" />
                        {errors.activityContent && touched.activityContent ? <ErrorMessage message={errors.activityContent} /> : null}
                    </Grid>

                    <Grid item xs={12} >
                        活动图片
                    </Grid>
                </Grid>
                <div className="bottomControl clearfix">
                    <Button className={classes.greyButton}
                        onClick={() => this.props.history.push('school-activities-management')}
                    >取消</Button>
                    <span className="right"><Button type="submit" className={classes.blackButton}>确认</Button></span>
                </div>
            </Form>
        )
    }

    handleSubmit = (values, { setFieldError }) => {
        // call api
        // TODO
        console.log('GREAT!');
    }

   render() {
       // const { classes } = this.props;

       const Schema = Yup.object().shape({
            activityName: Yup.string()
                .required('Activity Name is required'),
            activityContent: Yup.string()
                .required('Activity Content is required')
        })

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">
 
                        <h2 className="pageTitle">活动管理</h2>
 
                        <div className="wrapper-content">
                            <BreadCrumb />
 
                            <div className="content">
                                 <Formik
                                     initialValues={{
                                         activityName: '',
                                         activityContent: '',
                                     }}
                                     validationSchema={Schema}
                                     onSubmit={this.handleSubmit}
                                     component={this.form}
                                 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchoolNewActivity.propTypes = {
   classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   auth: state.auth
});

const mapDispatchToProps = dispatch => ({
   // loginP: data => dispatch(login(data)),
   // verifyT: token => dispatch(verifyToken(token)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolNewActivity))));