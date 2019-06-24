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
import SubMenu from '../../../components/104SubMenus/03SCHOOL/09Account/SchoolStudentAccountManagement';
// import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';

class SchoolStaffAccountInformation extends React.Component {

    render() {
        const { classes
            //, t, i18n 
        } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">账户管理</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <Grid container spacing={16} alignItems="center">
                                    <Grid item xs={1} >
                                        姓*
                                </Grid>
                                    <Grid item xs={11}>
                                        彭
                                </Grid>

                                    <Grid item xs={1} >
                                        名*
                                </Grid>
                                    <Grid item xs={11}>
                                        菲文
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
                                        98765432
                                </Grid>

                                    <Grid item xs={1} >
                                        电邮*
                                </Grid>
                                    <Grid item xs={11}>
                                        teacher@email.com
                                </Grid>

                                    <Grid item xs={1} >
                                        微信
                                </Grid>
                                    <Grid item xs={11}>
                                        12345678
                                </Grid>

                                    <Grid item xs={1} >
                                        省市区
                                </Grid>
                                    <Grid item xs={11}>
                                    </Grid>

                                    <Grid item xs={1} >
                                        联络住址
                                </Grid>
                                    <Grid item xs={11}>
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
                                    <span className="right"><Button className={classes.greyButton}
                                        onClick={() => this.props.history.push('school-staff-account-information')}
                                    >编辑账户</Button></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchoolStaffAccountInformation.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolStaffAccountInformation))));
