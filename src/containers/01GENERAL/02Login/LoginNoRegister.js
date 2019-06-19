// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

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
import BreadCrumb from '../../../components/100Include/breadcrumb';
// import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/Course';
// import ErrorMessage from '../../../components/01General/ErrorMessage';
// import data from '../../data/09Account/EnrollmentHistory';

class LoginNoRegister extends React.Component {

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n 
        } = this.props;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={2} >
                        学期
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="email" type="text" placeholder="5号厅" maxLength="100" />
                        {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    </Grid>

                    <Grid item xs={2} >
                        上课城市
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="password" type="text" placeholder="5号厅" maxLength="100" />
                        {errors.password && touched.password ? <div>{errors.password}</div> : null}
                    </Grid>
                </Grid>
                <div className="bottomControl clearfix">
                    <Button type="submit" className={classes.editButton}>提交</Button>
                    {/* <span className="right"><Button type="submit" className={classes.editButton}>編輯</Button></span> */}
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
            courseCode: Yup.string()
                .required('Course Code is required'),
            courseName: Yup.string()
                .required('Course Name is required')
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
                                            courseCode: '',
                                            courseName: '',
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
    // loginP: data => dispatch(login(data)),
    // verifyT: token => dispatch(verifyToken(token)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(LoginNoRegister)));