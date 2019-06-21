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
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
// import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
// import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
// import { Formik, Form } from 'formik';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
// import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';

class StudentEnrollmentHistoryDetail extends React.Component {

    render() {
        const { classes
            //, t, i18n 
        } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">报名历史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
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
                                <Grid item xs={11}>
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
                                    课程地址
                                </Grid>
                                <Grid item xs={11}>
                                    杭州市
                                </Grid>

                                <Grid item xs={1} >
                                    先修课程
                                </Grid>
                                <Grid item xs={11}>
                                    P1-001-DP-FFA, D1-001-DP-FFA
                                </Grid>

                                <Grid item xs={1} >
                                    报名开始
                                </Grid>
                                <Grid item xs={11}>
                                    2019 / 3 / 1
                                </Grid>

                                <Grid item xs={1} >
                                    报名结束
                                </Grid>
                                <Grid item xs={11}>
                                    2019 / 3 / 12
                                </Grid>

                                <Grid item xs={1} >
                                    课程名额
                                </Grid>
                                <Grid item xs={11}>
                                    10
                                </Grid>

                                <Grid item xs={1} >
                                    余下名额
                                </Grid>
                                <Grid item xs={11}>
                                    4
                                </Grid>

                                <Grid item xs={1} >
                                    课程学分
                                </Grid>
                                <Grid item xs={11}>
                                    1
                                </Grid>

                                <Grid item xs={1} >
                                    课程费用
                                </Grid>
                                <Grid item xs={11}>
                                    1000
                                </Grid>

                                <Grid item xs={1} >
                                    报名状态
                                </Grid>
                                <Grid item xs={11}>
                                    <div className="color-lightgreen">申请处理中</div>
                                    2019 / 3 / 2 上午9:30
                                </Grid>

                                <div className="sep-20"></div>

                                <Grid item xs={12} >
                                    课程日期和时间
                                </Grid>

                                <Grid item xs={12}>
                                    #1
                                </Grid>

                                <Grid item xs={1} >
                                    课程标题
                                </Grid>
                                <Grid item xs={11}>
                                    第1课 - 介绍
                                </Grid>

                                <Grid item xs={1} >
                                    课程日期
                                </Grid>
                                <Grid item xs={11}>
                                    2019 / 3 / 22 上午 9:00 - 下午 5:00
                                </Grid>

                                <Grid item xs={1} >
                                    授课地点
                                </Grid>
                                <Grid item xs={11}>
                                    新城东方君悦水星厅
                                </Grid>

                                <Grid item xs={1} >
                                    授课老师
                                </Grid>
                                <Grid item xs={11}>
                                    彭菲文
                                </Grid>

                                <Grid item xs={12}>
                                    #2
                                </Grid>

                                <Grid item xs={1} >
                                    课程标题
                                </Grid>
                                <Grid item xs={11}>
                                    第2课 - 案例研究
                                </Grid>

                                <Grid item xs={1} >
                                    课程日期
                                </Grid>
                                <Grid item xs={11}>
                                    2019 / 3 / 29 上午 9:00 - 下午 5:00
                                </Grid>

                                <Grid item xs={1} >
                                    授课地点
                                </Grid>
                                <Grid item xs={11}>
                                    新城东方君悦水星厅
                                </Grid>

                                <Grid item xs={1} >
                                    授课老师
                                </Grid>
                                <Grid item xs={11}>
                                    彭菲文
                                </Grid>
                            </Grid>
                            <div className="bottomControl clearfix">
                                <Button type="cancel" className={classes.greyButton}>取消</Button>
                                <span className="right"><Button className={classes.blackButton}
                                        onClick={() => this.props.history.push('student-enrollment-history-cancel-form')}
                                >申请取消</Button></span>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


StudentEnrollmentHistoryDetail.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(StudentEnrollmentHistoryDetail))));
