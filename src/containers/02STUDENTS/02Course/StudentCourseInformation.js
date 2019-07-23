// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import PropTypes from 'prop-types';
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

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/02STUDENTS/02Course/StudentCourse';
// import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';

class StudentCourseInformation extends React.Component {

    render() {

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">S1-001品牌盈利模式</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                {/*TODO figure out how to put grey box next to text*/}
                                <Grid container spacing={16} alignItems="center">
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
                                </Grid>

                                <div className="sep-40"></div>

                                <Grid container spacing={16} alignItems="center">
                                <Grid item xs={1} >
                                    课程编号
                                </Grid>
                                <Grid item xs={11}>
                                    S1-001-DP-FFA
                                </Grid>

                                <Grid item xs={1} >
                                    课程名称
                                </Grid>
                                <Grid item xs={11}>
                                    品牌盈利模式
                                </Grid>
                                </Grid>

                                <div className="sep-40"></div>

                                <Grid container spacing={16} alignItems="center">
                                <Grid item xs={1} >
                                    课程地址
                                </Grid>
                                <Grid item xs={11}>
                                    杭州市江干区民心路88号钱江新城东方君悦
                                </Grid>
                                </Grid>

                                <div className="sep-40"></div>

                                <Grid container spacing={16} alignItems="center">
                                <Grid item xs={1} >
                                    课程简介
                                </Grid>
                                <Grid item xs={11}>
                                    常规商企展现品牌力，快反商企提升利润率，部门连动短平快进
                                </Grid>

                                <Grid item xs={1} >
                                    课程重点
                                </Grid>
                                <Grid item xs={11}>
                                    快时尚概述，常规商品企划，快反商品力规划，规范研究流程再造...
                                </Grid>

                                <Grid item xs={1} >
                                    课程收益
                                </Grid>
                                <Grid item xs={11}>
                                    课堂上老师将深入解释，你将收获更规范的快反运作...
                                </Grid>
                                </Grid>

                                <div className="sep-40"></div>

                                <Grid container spacing={16} alignItems="center">
                                <Grid item xs={1} >
                                    联系电邮
                                </Grid>
                                <Grid item xs={11}>
                                    info@fablead.com
                                </Grid>

                                <Grid item xs={1} >
                                    联系微信
                                </Grid>
                                <Grid item xs={11}>
                                    139 2242 9906
                                </Grid>

                                <Grid item xs={1} >
                                    联系电话
                                </Grid>
                                <Grid item xs={11}>
                                    139 2242 9906
                                </Grid>
                                </Grid>

                                <div className="sep-40"></div>

                                <Grid container spacing={16} alignItems="center">
                                <Grid item xs={1} >
                                    授课老师
                                </Grid>
                                <Grid item xs={11}>
                                    彭菲文
                                </Grid>
                                </Grid>

                                <div className="sep-40"></div>

                                <Grid container spacing={16} alignItems="center">
                                <Grid item xs={1} >
                                    老师简介
                                </Grid>
                                <Grid item xs={11}>
                                    专业专注于服装行业拥有超过30年的服装品牌
                                </Grid>
                                </Grid>

                                <div className="sep-40"></div>

                                <Grid container spacing={16} alignItems="center">
                                <Grid item xs={1} >
                                    课程费用
                                </Grid>
                                <Grid item xs={11}>
                                    $1,000（已付）
                                </Grid>
                                </Grid>

                                <div className="sep-40"></div>

                                <Grid container spacing={16} alignItems="center">
                                <Grid item xs={1} >
                                    课程状态
                                </Grid>
                                <Grid item xs={11}>
                                    课程进行中
                                </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StudentCourseInformation.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(StudentCourseInformation)));
