import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as AnimationsActionCreators from '../../actions/animations';

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
            i18n } = this.props;

        let pathname = this.props.router.location.pathname,
            urlArray = pathname.split("/");

        // console.log(urlArray[2]);

        return (
            <div className="wrapper-header">
                <div className="header">
                    <div className="mobile-menu-btn">MENU</div>

                    <div className="logo"></div>

                    <div className="desktop-menu clearfix">
                        <li><Link to={"/" + i18n.language + "/all-courses"} className={urlArray[2] === 'all-courses' ? 'active' : ''}>课程管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/student-management"} className={urlArray[2] === 'student-management' ? 'active' : ''}>学生管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/enrollment-management"} className={urlArray[2] === 'enrollment-management' ? 'active' : ''}>报名管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/news-management"} className={urlArray[2] === 'news-management' ? 'active' : ''}>新闻管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/activities-management"} className={urlArray[2] === 'activities-management' ? 'active' : ''}>活动管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/resources-management-course"} className={urlArray[2] === 'resources-management-course' ? 'active' : ''}>资源管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/my-alerts"} className={urlArray[2] === 'my-alerts' ? 'active' : ''}>我的提醒 (3)</Link></li>
                        <li><Link to={"/" + i18n.language + "/reports"} className={urlArray[2] === 'reports' ? 'active' : ''}>项目报告</Link></li>
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

export default withTranslation()(connect(mapStateToProps)(Header));
