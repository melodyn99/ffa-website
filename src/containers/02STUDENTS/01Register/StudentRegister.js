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
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
import ErrorMessage from '../../../components/01General/ErrorMessage';
// import data from '../../data/09Account/EnrollmentHistory';

class BeforeStudentRegister extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div>

                報名須知
                <div className="sep-20"></div>

                PLEASE PROVIDE TEXT CONTENT

                <div className="sep-20"></div>

                <Button
                    className={classes.createButton}
                    onClick={() => this.props.handleAgree()}
                >Agree
                </Button>

            </div>
        )
    }
}


class StudentRegister extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            agree: false
        }
    }

    _handleAgree = () => {
        this.setState({
            agree: true
        })
    }

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n 
        } = this.props;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={0.8} className="border-bottom">
                        填写个人资料
                    </Grid>

                    <Grid item xs={12} >
                        （请以英文填写以下个栏）
                    </Grid>

                    <Grid item xs={2} >
                        姓（以英文填写）* :
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="lastName" type="text" placeholder="e.g. CHAN" maxLength="100" />
                        {errors.lastName && touched.lastName ? <ErrorMessage message={errors.lastName} /> : null}
                    </Grid>

                    <Grid item xs={2} >
                        名（以英文填写）* :
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="firstName" type="text" placeholder="e.g. Tai Man" maxLength="100" />
                        {errors.firstName && touched.firstName ? <ErrorMessage message={errors.firstName} /> : null}
                    </Grid>

                    <Grid item xs={2} >
                        中文姓名* :
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="chineseName" type="text" placeholder="e.g. 陈大满" maxLength="100" />
                        {errors.chineseName && touched.chineseName ? <ErrorMessage message={errors.chineseName} /> : null}
                    </Grid>

                    <Grid item xs={2} >
                        证件类别和号码 :
                    </Grid>
                    <Grid item xs={1}>
                        <select>
                            <option value="1">类别</option>
                            <option value="2">类别</option>
                            <option value="3">类别</option>
                            <option value="4">类别</option>
                        </select>
                    </Grid>
                    <Grid item xs={9}>
                        <Field name="idNumber" type="text" placeholder="" maxLength="100" />
                        {errors.idNumber && touched.idNumber ? <ErrorMessage message={errors.idNumber} /> : null}
                    </Grid>

                    <Grid item xs={2} >
                        出生日期* :
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="birthDate" type="text" placeholder="YYYY-MM-DD" maxLength="100" />
                        {errors.birthDate && touched.birthDate ? <ErrorMessage message={errors.birthDate} /> : null}
                    </Grid>

                    <Grid item xs={2} >
                        手提电话号码* :
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="contactNumber" type="text" placeholder="" maxLength="100" />
                        {errors.contactNumber && touched.contactNumber ? <ErrorMessage message={errors.contactNumber} /> : null}
                    </Grid>

                    <Grid item xs={2} >
                        设定登记电邮* :
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="contactEmail" type="text" placeholder="e.g. chantaiman@gmail.com" maxLength="100" />
                        {errors.contactEmail && touched.contactEmail ? <ErrorMessage message={errors.contactEmail} /> : null}
                    </Grid>

                    <Grid item xs={12} >
                        （作为登入网页之用）
                    </Grid>

                    <Grid item xs={2} >
                        确认电邮* :
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="emailConfirm" type="text" placeholder="e.g. chantaiman@gmail.com" maxLength="100" />
                        {errors.emailConfirm && touched.emailConfirm ? <ErrorMessage message={errors.emailConfirm} /> : null}
                    </Grid>

                    <Grid item xs={2} >
                        设定此户口密码* :
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="password" type="text" placeholder="" maxLength="100" />
                        {errors.password && touched.password ? <ErrorMessage message={errors.password} /> : null}
                    </Grid>

                    <Grid item xs={12} >
                        （密码须有8个子元组成，最少包含1个英文大写字母、1个英文小写字母及1个数字）：
                    </Grid>

                    <Grid item xs={2} >
                        确认密码* :
                    </Grid>
                    <Grid item xs={10}>
                        <Field name="passwordConfirm" type="text" placeholder="" maxLength="100" />
                        {errors.passwordConfirm && touched.passwordConfirm ? <ErrorMessage message={errors.passwordConfirm} /> : null}
                    </Grid>

                    <div className="sep-60"></div>

                    <Grid item xs={12} >
                        *必须填写
                    </Grid>

                    <div className="sep-60"></div>
                </Grid>
                <div>
                <FormControlLabel control={<Checkbox value="checkedterms" />} label="本人同意FFA及其机构成员使用我提供的个人资料，包括姓名、电话号码、手机号码、电邮地址、通讯地址及教育程度。提供有关FFA及其机构成员的任何课程、招生及活动推广资讯。" />
                {/* <Checkbox
                    value="checkedterms"
                    inputProps={{ 'aria-labelledby': '' } }
                /> */}
                </div>
                <div className="bottomControl clearfix">
                    <span className="right"><Button type="submit" className={classes.editButton}>提交</Button></span>
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
        const { classes
            // , t, i18n 
        } = this.props;

        const Schema = Yup.object().shape({
            lastName: Yup.string()
                .required('Last Name is required'),
            firstName: Yup.string()
                .required('First Name is required'),
            chineseName: Yup.string()
                .required('Chinese Name is required'),
            birthDate: Yup.string()
                .required('Birth Date is required'),
            contactNumber: Yup.string()
                .required('Contact Number is required'),
            contactEmail: Yup.string()
                .email('Contact Email must be a valid email')
                .required('Contact Email is required'),
            emailConfirm: Yup.string()
                .email('Confirm Email must be a valid email')
                .oneOf([Yup.ref('contactEmail'), null], "Does not match with Contact Email!")
                .required('Confirm Email is required'),
            password: Yup.string()
                .typeError('Password must be a valid string')
                .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, "Does not match Password requirements!")
                .required('Password is required'),
            passwordConfirm: Yup.string()
                .typeError('Confirm Password must be a valid string')
                .oneOf([Yup.ref('password'), null], "Does not match with Password!")
                .required('Confirm Password is required'),
        })

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">建立新帐户</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">

                                {this.state.agree ?
                                    <Formik
                                        initialValues={{
                                            lastName: '',
                                            firstName: '',
                                            chineseName: '',
                                            idNumber: '',
                                            birthDate: '',
                                            contactNumber: '',
                                            contactEmail: '',
                                            emailConfirm: '',
                                            password: '',
                                            passwordConfirm: '',
                                        }}
                                        validationSchema={Schema}
                                        onSubmit={this.handleSubmit}
                                        component={this.form}
                                    /> :
                                    <BeforeStudentRegister
                                        handleAgree={this._handleAgree}
                                        classes={classes}
                                    />
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StudentRegister.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(StudentRegister)));