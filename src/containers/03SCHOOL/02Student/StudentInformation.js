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

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/02Student/Student';
// import data from '../../data/09Account/EnrollmentHistory';

class StudentInformation extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className="wrapper-container-main">
          <div className="container-main">

            <h2 className="pageTitle">学生管理</h2>

            <div className="wrapper-content">
              <BreadCrumb />
              <SubMenu />
              <div className="content">
              <Grid container spacing={16} alignItems="center">
                <Grid item xs={1} >
                  姓
                </Grid>
                <Grid item xs={11}>
                  Chan
                </Grid>
                <Grid item xs={1} >
                  名
                </Grid>
                <Grid item xs={11}>
                  Tai Man
                </Grid>

                <Grid item xs={1} >
                  中文姓名
                </Grid>
                <Grid item xs={11}>
                  陈大文
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
                  XXXXXXXXX
                </Grid>

                <Grid item xs={1} >
                  出生日期
                </Grid>
                <Grid item xs={11}>
                  1980-10-31
                </Grid>

                <Grid item xs={1} >
                  公司
                </Grid>
                <Grid item xs={11}>
                  公司名称
                </Grid>

                <Grid item xs={1} >
                  公司地址
                </Grid>
                <Grid item xs={11}>
                  杭州
                </Grid>

                <Grid item xs={1} >
                  工作职位
                </Grid>
                <Grid item xs={11}>
                  经理
                </Grid>

                <Grid item xs={1} >
                  电邮
                </Grid>
                <Grid item xs={11}>
                  chan@g.com
                </Grid>

                <Grid item xs={1} >
                  微信
                </Grid>
                <Grid item xs={11}>
                  12345678
                </Grid>

                <Grid item xs={1} >
                  QQ
                </Grid>
                <Grid item xs={11}>
                  12345678
                </Grid>

                <Grid item xs={1} >
                  联络电话
                </Grid>
                <Grid item xs={11}>
                  1234567890
                </Grid>

                <Grid item xs={1} >
                  联络住址
                </Grid>
                <Grid item xs={11}>
                  杭州
                </Grid>
                <Grid item xs={12} >
                  {'\u00A0'}
                </Grid>

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
              <div className="bottomControl clearfix">
                <span className="right"><Button type="submit" className={classes.greyButton}>编辑学生</Button></span>
              </div>
            </Grid>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentInformation.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(StudentInformation)));
