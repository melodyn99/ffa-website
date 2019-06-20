// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
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
import { apiAuth } from '../../../Api/ApiAuth';
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';
import { login, verifyToken } from '../../../Redux/Action/authAction';

// Utils
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Children components
import BreadCrumb from '../../../components/100Include/breadcrumb';
// import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/Course';
import ErrorMessage from '../../../components/01General/ErrorMessage';
// import data from '../../data/09Account/EnrollmentHistory';

class LoginWithRegister extends React.Component {

    form = ({ values, errors, touched, handleChange }) => {
        const {
            // t,
            classes, i18n } = this.props;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={6}>
                        登入FFA网上报名系统
                    </Grid>
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
                    <Button type="submit" className={classes.blueButton} fullWidth={true} onClick={() => { this._signInAsync() }}>
                        登入
          </Button>
                </div>
                <div className="sep-40"></div>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={12} className="align-center">
                        首次登入前建立新账户
          </Grid>
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
                // console.log(res);
                this.props.loginP(res.access_token);
                this._getConference();
            })
        }
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
        const { classes
            // , t, i18n
        } = this.props;

        const Schema = Yup.object().shape({
            email: Yup.string()
                .email('Email has to be a valid email address')
                .required('Email is required'),
            password: Yup.string()
                .required('Password is required')
        })

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">报名</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <div className="narrow">
                                    <Formik
                                        initialValues={{
                                            email: 'admin@joyaether.test',
                                            password: 'abcd1234',
                                        }}
                                        validationSchema={Schema}
                                        onSubmit={this._signInAsync}
                                        component={this.form}
                                    />
                                    <div className="bottomControl clearfix">
                                        <Button className={classes.blackButton} fullWidth={true}
                                            onClick={() => this.props.history.push('student-register')}
                                        >建立新帐户</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginWithRegister.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    loginP: data => dispatch(login(data)),
    verifyT: token => dispatch(verifyToken(token)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(LoginWithRegister))));
