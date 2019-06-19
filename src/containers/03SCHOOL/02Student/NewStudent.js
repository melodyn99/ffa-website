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
import ErrorMessage from '../../../components/01General/ErrorMessage';
// import data from '../../data/09Account/EnrollmentHistory';

class NewStudent extends React.Component {

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
            姓
          </Grid>
          <Grid item xs={11}>
            <Field name="surname" type="text" placeholder="Chan" maxLength="100" />
            {errors.surname && touched.surname ? <ErrorMessage message={errors.surname} /> : null}
          </Grid>
          <Grid item xs={1} >
            名
          </Grid>
          <Grid item xs={11}>
            <Field name="firstName" type="text" placeholder="Tai Man" maxLength="100" />
            {errors.firstName && touched.firstName ? <ErrorMessage message={errors.firstName} /> : null}
          </Grid>

          <Grid item xs={1} >
            中文姓名
          </Grid>
          <Grid item xs={11}>
            <Field name="fullName" type="text" placeholder="陈大文" maxLength="100" />
            {errors.fullName && touched.fullName ? <ErrorMessage message={errors.fullName} /> : null}
          </Grid>
          <Grid item xs={1} >
            性别
          </Grid>
          <Grid item xs={11}>
            <select>
              <option value="M">男</option>
              <option value="F">女</option>
            </select>
          </Grid>
          <Grid item xs={1} >
            证件号码
          </Grid>
          <Grid item xs={2}>
            <select>
              <option value="1">居民身份证</option>
              <option value="2">居民身份证</option>
            </select>
          </Grid>
          <Grid item xs={9}>
            <Field name="identifyAuthentication" type="text" placeholder="XXXXXXXXXXXXX888X" maxLength="100" />
            {errors.identifyAuthentication && touched.identifyAuthentication ? <ErrorMessage message={errors.identifyAuthentication} /> : null}
          </Grid>
          <Grid item xs={1} >
            出生日期
          </Grid>
          <Grid item xs={11}><Field name="birthDay" type="text" placeholder="1980-10-30" maxLength="100" />
            {errors.birthDay && touched.birthDay ? <ErrorMessage message={errors.birthDay} /> : null}
          </Grid>

          <Grid item xs={1} >
            公司
          </Grid>
          <Grid item xs={11}>
            <Field name="companyName" type="text" placeholder="公司名称" maxLength="100" />
            {errors.companyName && touched.companyName ? <ErrorMessage message={errors.companyName} /> : null}
          </Grid>

          <Grid item xs={1} >
            公司地址
          </Grid>
          <Grid item xs={11}>
            <Field name="companyAddress" type="text" placeholder="杭州" maxLength="100" />
            {errors.companyAddress && touched.companyAddress ? <ErrorMessage message={errors.companyAddress} /> : null}
          </Grid>

          <Grid item xs={1} >
            工作职位
          </Grid>
          <Grid item xs={11}>
            <Field name="workPosition" type="text" placeholder="经理" maxLength="100" />
            {errors.workPosition && touched.workPosition ? <ErrorMessage message={errors.workPosition} /> : null}
          </Grid>

          <Grid item xs={1} >
            电邮
          </Grid>
          <Grid item xs={11}>
            <Field name="contactEmail" type="text" placeholder="chan@g.com" maxLength="100" />
            {errors.contactEmail && touched.contactEmail ? <ErrorMessage message={errors.contactEmail} /> : null}
          </Grid>

          <Grid item xs={1} >
            微信
          </Grid>
          <Grid item xs={11}>
            <Field name="contactWechat" type="text" placeholder="12345678" maxLength="100" />
            {errors.contactWechat && touched.contactWechat ? <ErrorMessage message={errors.contactWechat} /> : null}
          </Grid>

          <Grid item xs={1} >
            QQ
          </Grid>
          <Grid item xs={11}>
            <Field name="contactQQ" type="text" placeholder="12345678" maxLength="100" />
            {errors.contactQQ && touched.contactQQ ? <ErrorMessage message={errors.contactQQ} /> : null}
          </Grid>

          <Grid item xs={1} >
            联络电话
          </Grid>
          <Grid item xs={11}>
            <Field name="contactNumber" type="text" placeholder="1234567890" maxLength="100" />
            {errors.contactNumber && touched.contactNumber ? <ErrorMessage message={errors.contactNumber} /> : null}
          </Grid>

          <Grid item xs={1} >
            联络住址
          </Grid>
          <Grid item xs={11}>
            <Field name="contactAddress" type="text" placeholder="杭州" maxLength="100" />
            {errors.contactAddress && touched.contactAddress ? <ErrorMessage message={errors.contactAddress} /> : null}
          </Grid>
          <Grid item xs={12} >
            {'\u00A0'}
          </Grid>
        </Grid>

        <Grid container spacing={16} alignItems="center">
          <Grid item xs={1} >
            学院
          </Grid>
          <Grid item xs={11}>
            <select>
              <option value="1">学院名称</option>
              <option value="2">学院名称</option>
              <option value="3">学院名称</option>
              <option value="4">学院名称</option>
            </select>
          </Grid>

          {/* <Grid item xs={1} >
            学科
          </Grid>
          <Grid item xs={11}>
            <select>
              <option value="1">战略课程</option>
              <option value="2">战略课程</option>
              <option value="3">战略课程</option>
              <option value="4">战略课程</option>
            </select>
          </Grid> */}

          <Grid item xs={1} >
            状态
          </Grid>
          <Grid item xs={11}>
            <select>
              <option value="1">正常</option>
              <option value="2">正常</option>
              <option value="3">正常</option>
              <option value="4">正常</option>
            </select>
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
    // const { classes } = this.props;
    const Schema = Yup.object().shape({
      surname: Yup.string()
        .required('Surname is required'),
      firstName: Yup.string()
        .required('First Name is required'),
      fullName: Yup.string()
        .required('Full Name is required'),
      identifyAuthentication: Yup.string()
        .required('Identify Authentication is required'),
      birthDay: Yup.string()
        .required('Birth Day is required'),
      companyName: Yup.string()
        .required('Company Name is required'),
      companyAddress: Yup.string()
        .required('Company Address is required'),
      workPosition: Yup.string()
        .required('Work Position is required'),
      contactEmail: Yup.string()
        .email('Contact Email must be a valid email')
        .required('Contact Email is required'),
      contactWechat: Yup.number()
        .typeError('Wechat number must be a valid phone number')
        .required('WeChat number is required'),
      contactQQ: Yup.number()
        .typeError('QQ number must be a number')
        .required('QQ number is required'),
      contactNumber: Yup.number()
        .typeError('Contact Number must be a valid phone number')
        .required('Contact Number is required'),
      contactAddress: Yup.string()
        .required('Contact Address is required'),
    })

    return (
      <div>
        <div className="wrapper-container-main">
          <div className="container-main">

            <h2 className="pageTitle">学生管理</h2>

            <div className="wrapper-content">
              <BreadCrumb />
              {/* <SubMenu /> */}
              <div className="content">
                <Formik
                  initialValues={{
                    surname: '',
                    firstName: '',
                    fullName: '',
                    identifyAuthentication: '',
                    birthDay: '',
                    companyName: '',
                    companyAddress: '',
                    workPosition: '',
                    contactEmail: '',
                    contactWechat: '',
                    contactQQ: '',
                    contactNumber: '',
                    contactAddress: '',
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

NewStudent.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(NewStudent)));
