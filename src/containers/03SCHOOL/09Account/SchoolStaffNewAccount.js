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

class SchoolStaffNewAccount extends React.Component {

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n 
        } = this.props;
    
        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1} >
                        姓*
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="lastName" type="text" placeholder="赵" maxLength="100" />
                        {errors.lastName && touched.lastName ? <ErrorMessage message={errors.lastName} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        名*
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="firstName" type="text" placeholder="小红" maxLength="100" />
                        {errors.firstName && touched.firstName ? <ErrorMessage message={errors.firstName} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        账户类型*
                    </Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">老师</option>
                            <option value="2">老师</option>
                            <option value="3">老师</option>
                            <option value="4">老师</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >
                        性别*
                    </Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="boy">男</option>
                            <option value="girl">女</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >
                        联络电话*
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="contactNumber" type="text" placeholder="12345678" maxLength="100" />
                        {errors.contactNumber && touched.contactNumber ? <ErrorMessage message={errors.contactNumber} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        电邮*
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="contactEmail" type="text" placeholder="abc@gmail.com" maxLength="100" />
                        {errors.contactEmail && touched.contactEmail ? <ErrorMessage message={errors.contactEmail} />: null}
                    </Grid>

                    <Grid item xs={1} >
                        微信
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="contactWechat" type="text" placeholder="12345678" maxLength="100" />
                        {errors.contactWechat && touched.contactWechat ? <ErrorMessage message={errors.contactWechat} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        省市区
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="area" type="text" placeholder="" maxLength="100" />
                        {errors.area && touched.area ? <ErrorMessage message={errors.area} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        联络住址
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="contactAddress" type="text" placeholder="" maxLength="100" />
                        {errors.contactAddress && touched.contactAddress ? <ErrorMessage message={errors.contactAddress} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        状态*
                    </Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="worker">在职</option>
                            <option value="student">学生</option>
                            <option value="unemployed">无工作</option>
                        </select>
                    </Grid>
                </Grid>
                <div className="bottomControl clearfix">
                    <Button className={classes.greyButton}
                        onClick={() => this.props.history.push('school-account-management')}
                    >取消</Button>
                    <span className="right"><Button className={classes.blackButton}
                        onClick={() => this.props.history.push('school-account-information')}
                    >确认 (CLICK ME)</Button></span>
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
        // const { classes, t, i18n } = this.props;

        const Schema = Yup.object().shape({
            lastName: Yup.string()
                .required('Last Name is required'),
            firstName: Yup.string()
                .required('First Name is required'),
            contactNumber: Yup.number()
                .typeError('Contact Number must be a valid phone number')
                .required('Contact Number is required'),
            contactEmail: Yup.string()
                .email('Contact Email must be a valid email')
                .required('Contact Email is required'),
        })

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">账户管理</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <Formik
                                    initialValues={{
                                        lastName: '',
                                        firstName: '',
                                        accountType: '',
                                        gender: '',
                                        contactNumber: '',
                                        contactEmail: '',
                                        contactWechat: '',
                                        area: '',
                                        contactAddress: '',
                                        status: '',
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

SchoolStaffNewAccount.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolStaffNewAccount))));
