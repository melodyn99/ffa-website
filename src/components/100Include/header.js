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

    render() {
        const { //t, 
            i18n, classes } = this.props;

        let pathname = this.props.router.location.pathname,
            urlArray = pathname.split("/"),
            currentPath = urlArray[2];

        return (
            <div className="wrapper-header">
                <div className="header">
                    <div className="mobile-menu-btn">MENU</div>

                    <div className="logo"></div>

                    <ul className="desktop-menu general clearfix">
                        <li><Link to={"/" + i18n.language + "/login-with-register"} className={(currentPath === 'login-with-register') ? 'active' : ''}>入学</Link></li>
                        <li><Link to={"/" + i18n.language + "/"} className={(currentPath === '123') ? 'active' : ''}>品牌</Link>
                            <ul>
                                <li><Link to={"/" + i18n.language + "/school-introduction"} className={(currentPath === 'school-introduction') ? 'active' : ''}>学院简介</Link></li>
                                <li><Link to={"/" + i18n.language + "/school-advantage"} className={(currentPath === 'school-advantage') ? 'active' : ''}>在菲力尚学学习的优点</Link></li>
                                <li><Link to={"/" + i18n.language + "/school-learning"} className={(currentPath === 'school-learning') ? 'active' : ''}>学生学习相关介绍</Link></li>
                                <li><Link to={"/" + i18n.language + "/news"} className={(currentPath === 'news') ? 'active' : ''}>学院故事及新闻</Link></li>
                                <li><Link to={"/" + i18n.language + "/activities"} className={(currentPath === 'activities') ? 'active' : ''}>学院相关活动</Link></li>
                                <li><Link to={"/" + i18n.language + "/activities"} className={(currentPath === 'activities') ? 'active' : ''}>学院相關的企業發展和創新</Link></li>
                                <li><Link to={"/" + i18n.language + "/school-cases"} className={(currentPath === 'school-cases') ? 'active' : ''}>和学院合作的案例</Link></li>
                            </ul>

                        </li>
                    </ul>

                    <ul className="desktop-menu student clearfix">
                        <li><Link to={"/" + i18n.language + "/student-register-personal-information"} className={currentPath === 'student-register-personal-information' ? 'active' : ''}>报名申请</Link></li>
                        <li><Link to={"/" + i18n.language + "/student-course"} className={currentPath === '123' ? 'active' : ''}>我的课程</Link></li>
                        <li><Link to={"/" + i18n.language + "/"} className={currentPath === '123' ? 'active' : ''}>我的报名</Link></li>
                        <li><Link to={"/" + i18n.language + "/"} className={currentPath === '123' ? 'active' : ''}>我的提醒</Link></li>
                    </ul>

                    <ul className="desktop-menu clearfix">
                        <li><Link to={"/" + i18n.language + "/all-courses"} className={currentPath === 'all-courses' ? 'active' : ''}>课程管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/all-students-management"} className={(currentPath === 'all-students-management') || (currentPath === 'new-student') ? 'active' : ''}>学生管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/enrollment-management"} className={currentPath === 'enrollment-management' ? 'active' : ''}>报名管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/news-management"} className={(currentPath === 'news-management') || (currentPath === 'new-news') ? 'active' : ''}>新闻管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/activities-management"} className={(currentPath === 'activities-management') || (currentPath === 'new-activity') ? 'active' : ''}>活动管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/all-resources-management"}
                            className={(currentPath === 'all-resources-management')
                                || (currentPath === 'resources-management-course')
                                || (currentPath === 'resources-management-homework')
                                || (currentPath === 'new-material')
                                || (currentPath === 'new-homework')
                                || (currentPath === 'new-question') ? 'active' : ''}>资源管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/my-alerts"} className={currentPath === 'my-alerts' ? 'active' : ''}>我的提醒 (6)</Link></li>
                        <li><Link to={"/" + i18n.language + "/reports"} className={currentPath === 'reports' ? 'active' : ''}>项目报告</Link></li>
                        <li><Link to={"/" + i18n.language + "/related-courses"}
                            className={(currentPath === 'related-courses')
                                || currentPath === ('new-account') ? 'active' : ''}>账户管理</Link></li>
                    </ul>

                    <div className="desktop-control">
                        <Button
                            className={classes.silverButton}
                            onClick={() => this.props.history.push('student-register')}
                        >报名</Button>

                        <Button
                            className={classes.goldButton}
                            onClick={() => this.props.history.push('login-no-register')}
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
