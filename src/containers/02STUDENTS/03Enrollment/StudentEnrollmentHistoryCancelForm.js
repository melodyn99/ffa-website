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

class StudentEnrollmentHistoryCancelForm extends React.Component {

    // render() {
    // const { classes } = this.props;

    _handleInput = (value, key) => {
        console.log(value);
        this.setState({
            ...this.state,
            [key]: value
        })
    }

    _handleSelect = () => {

    }

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n 
        } = this.props;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1} >
                        学期
                        </Grid>
                    <Grid item xs={11}>
                        2019-01
                        </Grid>

                    <Grid item xs={1} >
                        上课城市
                        </Grid>
                    <Grid item xs={11}>
                        杭州
                        </Grid>

                    <Grid item xs={1} >
                        学科名称
                        </Grid>
                    <Grid item xs={11} >
                        战略课程
                        </Grid>

                    <Grid item xs={1} >
                        课程类型
                        </Grid>
                    <Grid item xs={11}>
                        大商品公开课程
                        </Grid>

                    <Grid item xs={1} >
                        课程编号
                        </Grid>
                    <Grid item xs={11}>
                        s1-001-DP-FFA
                        </Grid>

                    <Grid item xs={1} >
                        课程名称
                        </Grid>
                    <Grid item xs={11}>
                        品牌盈利模式
                        </Grid>

                    <Grid item xs={1} >
                        取消原因
                        </Grid>
                    <Grid item xs={11}>
                        <Field name="cancelReason" type="text" placeholder="个人日程冲突" maxLength="100" />
                        {errors.cancelReason && touched.cancelReason ? <ErrorMessage message={errors.cancelReason} /> : null}
                    </Grid>
                </Grid>
                <div className="bottomControl clearfix">
                    <Button className={classes.greyButton}
                        onClick={() => this.props.history.push('student-enrollment-history')}
                    >取消</Button>
                    <span className="right"><Button className={classes.blackButton}
                        onClick={() => this.props.history.push('student-enrollment-history-cancel-request')}
                    >提交 (click)</Button></span>
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
            cancelReason: Yup.string()
                .required('Cancel Reason is required'),
        })

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">报名历史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <Formik
                                    initialValues={{
                                        notesName: '',
                                        notesContent: '',
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

StudentEnrollmentHistoryCancelForm.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(StudentEnrollmentHistoryCancelForm))));
