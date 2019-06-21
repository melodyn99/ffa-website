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
            <div className={"wrapper-header" + (currentPath === '' ? ' home' : '')}>
                <div className="header">
                    <div className="mobile-menu-btn">MENU</div>

                    <h1 className="logo">
                        <Link to={"/" + i18n.language + '/'}><img src={require('../../images/600-400.png')} alt="" /></Link>
                    </h1>

                    <ul className={"desktop-menu clearfix" + (currentPath !== '' ? ' general' : '')}>
                        <li className={(currentPath === 'login-with-register') ? 'active' : ''}><Link to={"/" + i18n.language + "/login-with-register"}>入学</Link>
                            <ul className="first">
                                <div className="arrow">need image</div>
                                <div className="wrap">
                                    <li className={(currentPath === 'school-introduction') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-introduction"}>入學申請流程</Link></li>
                                    <li className={(currentPath === '/') ? 'active' : ''}><Link to={"/" + i18n.language + "/"}>學科目錄</Link></li>
                                    <li className={(currentPath === 'student-register') ? 'active' : ''}><Link to={"/" + i18n.language + "/student-register"}>報名</Link></li>
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
                                    <li className={(currentPath === 'news') ? 'active' : ''}><Link to={"/" + i18n.language + "/news"}>学院故事及新闻</Link></li>
                                    <li className={(currentPath === 'activities') ? 'active' : ''}><Link to={"/" + i18n.language + "/activities"}>学院相关活动</Link></li>
                                    <li className={(currentPath === 'activities') ? 'active' : ''}><Link to={"/" + i18n.language + "/activities"}>学院相關的企業發展和創新</Link></li>
                                    <li className={(currentPath === 'school-cases') ? 'active' : ''}><Link to={"/" + i18n.language + "/school-cases"}>和学院合作的案例</Link></li>
                                </div>
                            </ul>
                        </li>
                    </ul>
                    {(currentPath !== '') &&
                        <ul className={"desktop-menu clearfix" + (currentPath !== '' ? ' student' : '')}>
                            <li className={currentPath === 'student-register-personal-information' ? 'active' : ''}><Link to={"/" + i18n.language + "/student-register-personal-information"}>报名申请</Link></li>
                            <li className={currentPath === '123' ? 'active' : ''}><Link to={"/" + i18n.language + "/student-course"}>我的课程</Link></li>
                            <li className={currentPath === '123' ? 'active' : ''}><Link to={"/" + i18n.language + "/"}>我的报名</Link></li>
                            <li className={currentPath === '123' ? 'active' : ''}><Link to={"/" + i18n.language + "/"}>我的提醒</Link></li>
                        </ul>
                    }
                    {(currentPath !== '') &&
                        <ul className={"desktop-menu clearfix" + (currentPath !== '' ? ' school' : '')}>
                            <li className={currentPath === 'all-courses' ? 'active' : ''}><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></li>
                            <li className={(currentPath === 'all-students-management') || (currentPath === 'new-student') ? 'active' : ''}><Link to={"/" + i18n.language + "/all-students-management"}>学生管理</Link></li>
                            <li className={currentPath === 'enrollment-management' ? 'active' : ''}><Link to={"/" + i18n.language + "/enrollment-management"}>报名管理</Link></li>
                            <li className={(currentPath === 'news-management') || (currentPath === 'new-news') ? 'active' : ''}><Link to={"/" + i18n.language + "/news-management"}>新闻管理</Link></li>
                            <li className={(currentPath === 'activities-management') || (currentPath === 'new-activity') ? 'active' : ''}><Link to={"/" + i18n.language + "/activities-management"}>活动管理</Link></li>
                            <li className={(currentPath === 'all-resources-management')
                                || (currentPath === 'resources-management-course')
                                || (currentPath === 'resources-management-homework')
                                || (currentPath === 'new-material')
                                || (currentPath === 'new-homework')
                                || (currentPath === 'new-question') ? 'active' : ''}><Link to={"/" + i18n.language + "/all-resources-management"}>资源管理</Link></li>
                            <li className={currentPath === 'my-alerts' ? 'active' : ''}><Link to={"/" + i18n.language + "/my-alerts"}>我的提醒 (6)</Link></li>
                            <li className={currentPath === 'reports' ? 'active' : ''}><Link to={"/" + i18n.language + "/reports"}>项目报告</Link></li>
                            <li className={(currentPath === 'related-courses') || (currentPath === 'new-account') ? 'active' : ''}><Link to={"/" + i18n.language + "/related-courses"}>账户管理</Link></li>
                        </ul>
                    }

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
