// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Redux
import { connect } from 'react-redux';

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

    _handleRegister = (language, currentPath) => {
        if (typeof currentPath === 'undefined') {
            this.props.history.push(language + '/student-register');
        } else {
            this.props.history.push('student-register');
        }
    }

    _handleLogin = (language, currentPath) => {
        if (typeof currentPath === 'undefined') {
            this.props.history.push(language + '/login-no-register');
        } else {
            this.props.history.push('login-no-register');
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
                        <li className={(currentPath === 'login-with-register') ? 'active' : ''}><Link to={"/" + i18n.language + "/login-with-register"}>入学</Link>
                            <ul className="first">
                                <div className="arrow">need image</div>
                                <div className="wrap">
                                    <li className={(currentPath === 'admission-process') ? 'active' : ''}><Link to={"/" + i18n.language + "/admission-process"}>入學申請流程</Link></li>
                                    <li className={(currentPath === 'admission-subject-catalog') ? 'active' : ''}><Link to={"/" + i18n.language + "/admission-subject-catalog"}>學科目錄</Link></li>
                                    <li className={(currentPath === 'login-with-register') ? 'active' : ''}><Link to={"/" + i18n.language + "/login-with-register"}>報名</Link></li>
                                </div>
                            </ul>
                        </li>
                        <li className={(currentPath === '123') ? 'active' : ''}><Link to={"/" + i18n.language + "/"}>品牌</Link>
                            <ul className="second">
                                <div className="arrow">need image</div>
                                <div className="wrap">
                                    <li className={(currentPath === 'school-introduction') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-introduction"}>学院简介</Link></li>
                                    <li className={(currentPath === 'school-advantage') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-advantage"}>在菲力尚学学习的优点</Link></li>
                                    <li className={(currentPath === 'school-learning') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-learning"}>学生学习相关介绍</Link></li>
                                    <li className={(currentPath === 'news') ? 'active' : ''}><Link to={"/" + i18n.language + "/news-catalog"}>学院故事及新闻</Link></li>
                                    <li className={(currentPath === 'activities') ? 'active' : ''}><Link to={"/" + i18n.language + "/activities-catalog"}>学院相关活动</Link></li>
                                    <li className={(currentPath === 'activities') ? 'active' : ''}><Link to={"/" + i18n.language + "/activities-catalog"}>学院相關的企業發展和創新</Link></li>
                                    <li className={(currentPath === 'school-cases') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-cases"}>和学院合作的案例</Link></li>
                                </div>
                            </ul>
                        </li>
                    </ul>
                    {(currentPath !== '' && typeof currentPath !== 'undefined') &&
                        <ul className={"desktop-menu clearfix" + (currentPath !== '' ? ' student' : '')}>
                            <li className={currentPath === 'student-register-personal-information' ? 'active' : ''}><Link to={"/" + i18n.language + "/student-register-personal-information"}>报名申请</Link></li>
                            <li className={currentPath === 'student-scheduling' ? 'active' : ''}><Link to={"/" + i18n.language + "/student-scheduling"}>我的课程</Link></li>
                            <li className={currentPath === 'student-enrollment-history' ? 'active' : ''}><Link to={"/" + i18n.language + "/student-enrollment-history"}>我的报名</Link></li>
                            <li className={currentPath === 'student-alerts' ? 'active' : ''}><Link to={"/" + i18n.language + "/student-alerts"}>我的提醒</Link></li>
                        </ul>
                    }
                    {(currentPath !== '' && typeof currentPath !== 'undefined') &&
                        <ul className={"desktop-menu clearfix" + (currentPath !== '' ? ' school' : '')}>
                            <li className={currentPath === 'school-all-courses' ? 'active' : ''}><Link to={"/" + i18n.language + "/school-all-courses"}>课程管理</Link></li>
                            <li className={(currentPath === 'school-students-management') || (currentPath === 'school-new-student') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-students-management"}>学生管理</Link></li>
                            <li className={currentPath === 'school-enrollment-management' ? 'active' : ''}><Link to={"/" + i18n.language + "/school-enrollment-management"}>报名管理</Link></li>
                            <li className={(currentPath === 'school-news-management') || (currentPath === 'school-new-news') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-news-management"}>新闻管理</Link></li>
                            <li className={(currentPath === 'school-activities-management') || (currentPath === 'school-new-activity') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-activities-management"}>活动管理</Link></li>
                            <li className={(currentPath === 'school-resources-management')
                                || (currentPath === 'school-resources-management')
                                || (currentPath === 'school-resources-management-homework')
                                || (currentPath === 'school-new-material')
                                || (currentPath === 'school-new-homework')
                                || (currentPath === 'school-new-question') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-resources-management"}>资源管理</Link></li>
                            <li className={currentPath === 'school-alerts' ? 'active' : ''}><Link to={"/" + i18n.language + "/school-alerts"}>我的提醒 (6)</Link></li>
                            <li className={currentPath === 'school-reports' ? 'active' : ''}><Link to={"/" + i18n.language + "/school-reports"}>项目报告</Link></li>
                            <li className={(currentPath === 'school-account-information') || (currentPath === 'school-new-account') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-account-management"}>账户管理</Link></li>
                        </ul>
                    }

                    <div className="desktop-control">
                        <Button
                            className={classes.silverButton}
                            onClick={() => this._handleRegister(i18n.language, currentPath)}
                        >报名</Button>

                        <Button
                            className={classes.goldButton}
                            onClick={() => this._handleLogin(i18n.language, currentPath)}
                        >登入</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        members: state.auth,
        router: state.router
    }
);

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps)(withStyles(combinedStyles)(withRouter(Header))));
