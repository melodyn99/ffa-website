// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

// Material UI
import Grid from '@material-ui/core/Grid';

// Redux
import { connect } from 'react-redux';
import { logout } from '../../Redux/Action/authAction';

class Header extends Component {

    changeLanguage = (param) => {
        switch (param) {
            case 'zh-HK':
                param = 'zh-HK';
                break;
            case 'en-US':
                param = 'en-US';
                break;
            default:
                param = 'zh-HK';
        }
        this.props.i18n.changeLanguage(param);
    }

    logout = () => {
        this.props.logoutP();
    }

    _handleRegister = (language, currentPath) => {
        if (typeof currentPath === 'undefined') {
            this.props.history.push(language + '/student-register');
        } else {
            this.props.history.push('student-register');
        }
    }

    _handleLogin = (language, currentPath) => {
        if (typeof currentPath === 'undefined') {
            this.props.history.push('/' + language + '/login-no-register');
        } else {
            this.props.history.push('/' + language + '/login-no-register');
        }

    }

    render() {
        const { //t,
            i18n, classes } = this.props;

        let pathname = this.props.router.location.pathname,
            urlArray = pathname.split("/"),
            currentPath = urlArray[2];

        return (
            <div className={"wrapper-header" + (currentPath === '' || typeof currentPath === 'undefined' ? ' home' : '')}>
                <div className="header">
                    <div className="mobile-menu-btn">MENU</div>

                    <h1 className="logo">
                        <Link to={"/" + i18n.language + '/'}><img src={require('../../images/600-400.png')} alt="" /></Link>
                    </h1>

                    <ul className={"desktop-menu clearfix" + (currentPath !== '' && typeof currentPath !== 'undefined' ? ' general' : '')}>
                        <li className={(currentPath === 'admission-process')
                            || (currentPath === 'login-with-register')
                            || (currentPath === 'admission-subject-catalog')
                            || (currentPath === 'admission-course-catalog')
                            || (currentPath === 'admission-course-information') ? 'active' : ''}><Link to={"/" + i18n.language + "/admission-process"}>入学</Link>
                            <ul className="first">
                                <div className="arrow">need image</div>
                                <div className="wrap">
                                    <li className={(currentPath === 'admission-process') ? 'active' : ''}><Link to={"/" + i18n.language + "/admission-process"}>入學申請流程</Link></li>
                                    <li className={(currentPath === 'admission-subject-catalog') ? 'active' : ''}><Link to={"/" + i18n.language + "/admission-subject-catalog"}>學科目錄</Link></li>
                                    <li className={(currentPath === 'login-with-register') ? 'active' : ''}><Link to={"/" + i18n.language + "/login-with-register"}>報名</Link></li>
                                </div>
                            </ul>
                        </li>
                        <li className={(currentPath === 'school-introduction')
                            || (currentPath === 'school-advantage')
                            || (currentPath === 'school-learning')
                            || (currentPath === 'news')
                            || (currentPath === 'activity')
                            || (currentPath === 'school-case') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-introduction"}>品牌</Link>
                            <ul className="second">
                                <div className="arrow">need image</div>
                                <div className="wrap">
                                    <li className={(currentPath === 'school-introduction') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-introduction"}>学院简介</Link></li>
                                    <li className={(currentPath === 'school-advantage') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-advantage"}>在菲力尚学学习的优点</Link></li>
                                    <li className={(currentPath === 'school-learning') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-learning"}>学生学习相关介绍</Link></li>
                                    <li className={(currentPath === 'news') ? 'active' : ''}><Link to={"/" + i18n.language + "/news"}>学院故事及新闻</Link></li>
                                    <li className={(currentPath === 'activity') ? 'active' : ''}><Link to={"/" + i18n.language + "/activity"}>学院相关活动</Link></li>
                                    <li className={(currentPath === 'activity') ? 'active' : ''}><Link to={"/" + i18n.language + "/activity"}>学院相關的企業發展和創新</Link></li>
                                    <li className={(currentPath === 'school-case') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-case"}>和学院合作的案例</Link></li>
                                </div>
                            </ul>
                        </li>
                    </ul>
                    {(currentPath !== '' && typeof currentPath !== 'undefined') &&
                        <ul className={"desktop-menu clearfix" + (currentPath !== '' ? ' student' : '')}>
                            <li className={(currentPath === 'student-register-personal-information')
                                || (currentPath === 'student-register')
                                || (currentPath === 'student-register-document-upload')
                                || (currentPath === 'student-register-questionnaire')
                                || (currentPath === 'student-register-fee')
                                || (currentPath === 'student-register-notification') ? 'active' : ''}><Link to={"/" + i18n.language + "/student-register-personal-information"}>报名申请</Link></li>
                            <li className={(currentPath === 'student-scheduling')
                                || (currentPath === 'student-course-information')
                                || (currentPath === 'student-course-date')
                                || (currentPath === 'student-course-announcement') ? 'active' : ''}><Link to={"/" + i18n.language + "/student-scheduling"}>我的课程</Link></li>
                            <li className={(currentPath === 'student-enrollment-history')
                                || (currentPath === 'student-enrollment-history-form')
                                || (currentPath === 'student-enrollment-history-detail')
                                || (currentPath === 'student-enrollment-history-cancel-form')
                                || (currentPath === 'student-enrollment-history-cancel-request')
                                || (currentPath === 'student-enrollment-history-cancelled') ? 'active' : ''}><Link to={"/" + i18n.language + "/student-enrollment-history"}>我的报名</Link></li>
                            <li className={currentPath === 'student-alert' ? 'active' : ''}><Link to={"/" + i18n.language + "/student-alert"}>我的提醒</Link></li>
                        </ul>
                    }
                    {(currentPath !== '' && typeof currentPath !== 'undefined') &&
                        <ul className={"desktop-menu clearfix" + (currentPath !== '' ? ' school' : '')}>
                            <li className={(currentPath === 'school-all-course')
                                || (currentPath === 'school-course-information')
                                || (currentPath === 'school-course-preparation')
                                || (currentPath === 'school-course-announcement')
                                || (currentPath === 'school-seating-plan')
                                || (currentPath === 'school-course-material')
                                || (currentPath === 'school-course-work')
                                || (currentPath === 'school-course-student-management')
                                || (currentPath === 'school-course-student-management-attendance')
                                || (currentPath === 'school-course-student-management-homework')
                                || (currentPath === 'school-course-announcement')
                                || (currentPath === 'school-course-q-and-a')
                                || (currentPath === 'school-course-reply-q-and-a')
                                || (currentPath === 'school-course-note')
                                || (currentPath === 'school-course-new-note')
                                || (currentPath === 'school-course-assessment') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></li>
                            <li className={(currentPath === 'school-all-student-management')
                                || (currentPath === 'school-student-information')
                                || (currentPath === 'school-student-related-course')
                                || (currentPath === 'school-new-student') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-all-student-management"}>学生管理</Link></li>
                            <li className={currentPath === 'school-enrollment-management' ? 'active' : ''}><Link to={"/" + i18n.language + "/school-enrollment-management"}>报名管理</Link></li>
                            <li className={(currentPath === 'school-news-management') || (currentPath === 'school-new-news') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-news-management"}>新闻管理</Link></li>
                            <li className={(currentPath === 'school-activity-management') || (currentPath === 'school-new-activity') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-activity-management"}>活动管理</Link></li>
                            <li className={(currentPath === 'school-resource-management')
                                || (currentPath === 'school-resource-management-course')
                                || (currentPath === 'school-all-resource-management')
                                || (currentPath === 'school-resource-management-homework')
                                || (currentPath === 'school-resource-course')
                                || (currentPath === 'school-resource-homework')
                                || (currentPath === 'school-new-material')
                                || (currentPath === 'school-new-homework')
                                || (currentPath === 'school-new-question') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-all-resource-management"}>资源管理</Link></li>
                            <li className={currentPath === 'school-alert' ? 'active' : ''}><Link to={"/" + i18n.language + "/school-alert"}>我的提醒 (6)</Link></li>
                            <li className={currentPath === 'school-report' ? 'active' : ''}><Link to={"/" + i18n.language + "/school-report"}>项目报告</Link></li>
                            <li className={(currentPath === 'school-staff-account-information')
                                || (currentPath === 'school-all-staff-account-management')
                                || (currentPath === 'school-staff-related-course')
                                || (currentPath === 'school-staff-account-access')
                                || (currentPath === 'school-staff-new-account') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-all-staff-account-management"}>账户管理</Link></li>
                        </ul>
                    }

                    <div className="desktop-control">
                        {(this.props.members.auth && typeof this.props.members.userInfo !== 'undefined')
                            ?
                            <Grid container spacing={16} alignItems="center">
                                <Grid item xs>
                                    <Grid item xs>你好!</Grid>
                                    <Grid item xs zeroMinWidth>
                                        <Typography noWrap>
                                            {this.props.members.userInfo.display_name}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item xs>
                                    <Grid item xs zeroMinWidth>
                                        <Typography noWrap>
                                            <Button
                                                className={classes.blackButton}
                                                onClick={() => this.logout()}
                                            >登出</Button>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            :
                            <Grid container spacing={16} alignItems="center">
                                <Grid item xs>
                                    <Button
                                        className={classes.silverButton}
                                        onClick={() => this._handleRegister(i18n.language, currentPath)}
                                    >报名</Button>
                                </Grid>
                                <Grid item xs>
                                    <Button
                                        className={classes.goldButton}
                                        onClick={() => this._handleLogin(i18n.language, currentPath)}
                                    >登入</Button>
                                </Grid>
                            </Grid>
                        }
                    </div>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    router: state.router,
    members: state.auth,
});

const mapDispatchToProps = dispatch => ({
    logoutP: () => dispatch(logout),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(Header))));
