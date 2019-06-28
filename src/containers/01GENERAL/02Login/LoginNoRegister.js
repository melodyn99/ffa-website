// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Material UI
import Grid from '@material-ui/core/Grid';

// Api
import { apiAuth } from '../../../Api/ApiAuth';

// Redux
import { connect } from 'react-redux';
import { login, verifyToken, getUserInfo } from '../../../Redux/Action/authAction';

// Utils
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
// import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/Course';
import ErrorMessage from '../../../components/01General/ErrorMessage';
// import data from '../../data/09Account/EnrollmentHistory';

class LoginNoRegister extends React.Component {

    form = ({ values, errors, touched, handleChange }) => {
        const {
            // t,
            classes, i18n } = this.props;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={6}>登入FFA网上报名系统</Grid>
                    <Grid item xs={6} className="align-right">
                        <Link to={'/' + i18n.language + ''}>忘记密码</Link>
                    </Grid>

                    <Grid item xs={12}>
                        <Field name="email" type="email" placeholder="登记电邮地址" maxLength="100" />
                        {errors.email && touched.email ? <ErrorMessage message={errors.email} /> : null}
                    </Grid>

                    <Grid item xs={12}>
                        <Field name="password" type="password" placeholder="密码" maxLength="100" />
                        {errors.password && touched.password ? <ErrorMessage message={errors.password} /> : null}
                    </Grid>
                </Grid>
                <div className="bottomControl clearfix">
                    <Button type="submit" className={classes.blackButton} fullWidth={true} onClick={() => { this._signInAsync() }}>登入</Button>
                </div>
                <div className="sep-40"></div>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={4} className="align-left">
                        <div className="hints">
                            <h4>Super Admin Role</h4>
                            <p>superadmin@ffa.test</p>
                            <p>abcd1234</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} className="align-left">
                        <div className="hints">
                            <h4>Manager Role</h4>
                            <p>manager@ffa.test</p>
                            <p>abcd1234</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} className="align-left">
                        <div className="hints">
                            <h4>Officer Role</h4>
                            <p>officer@ffa.test</p>
                            <p>abcd1234</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} className="align-left">
                        <div className="hints">
                            <h4>Teacher Role</h4>
                            <p>teacher@ffa.test</p>
                            <p>abcd1234</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} className="align-left">
                        <div className="hints">
                            <h4>Student Role</h4>
                            <p>student@ffa.test</p>
                            <p>abcd1234</p>
                        </div>
                    </Grid>
                    <Grid item xs={4} className="align-left"></Grid>
                </Grid>
            </Form>
        )
    }

    _signInAsync = (values) => {
        //  TODO: research the double calling here
        // console.log(values);
        if (typeof (values) !== 'undefined') {
            let submitEmail = values.email;
            let submitPassword = values.password;

            apiAuth.authenticate(submitEmail, submitPassword).then((res) => {
                this.props.loginP(res.access_token);
                this._getUserInformation(res.access_token);
            })
        }
    };

    // _authenticate = (submitEmail, submitPassword) => {

    //     const cb = (obj) => {
    //         console.log("cb : ", obj);
    //     }
    //     const eCb = (obj) => {
    //         console.log("eCb : ", obj);
    //     }
    //     const params = {
    //         username: submitEmail,
    //         password: submitPassword,
    //         grant_type: 'password',
    //         audience: 'ffa.joyaether.com'
    //     };
    //     const access_token = null;

    //     console.log('params', params);

    //     apiAuth.authenticate(params, access_token, cb, eCb);
    // }

    _getUserInformation = (access_token) => {

        const cb = (obj) => {
            console.log("cb : ", obj);
            this.props.getUserInfoP(obj.body);
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        const params = null;

        apiAuth.getUserInformation(params, access_token, cb, eCb);
    }

    render() {
        // const { classes, t, i18n } = this.props;

        const Schema = Yup.object().shape({
            email: Yup.string()
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
        })

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">登入</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <div className="narrow">
                                    <Formik
                                        initialValues={{
                                            email: 'superadmin@ffa.test',
                                            password: 'abcd1234',
                                        }}
                                        validationSchema={Schema}
                                        onSubmit={this._signInAsync}
                                        component={this.form}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginNoRegister.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    loginP: data => dispatch(login(data)),
    getUserInfoP: data => dispatch(getUserInfo(data)),
    verifyT: token => dispatch(verifyToken(token)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(LoginNoRegister)));
