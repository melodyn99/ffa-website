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
            urlArray = pathname.split("/"),
            currentPath = urlArray[2];

        return (
            <div className="wrapper-header">
                <div className="header">
                    <div className="mobile-menu-btn">MENU</div>

                    <div className="logo"></div>

                    <div className="desktop-menu clearfix">
                        <li><Link to={"/" + i18n.language + "/all-courses"} className={currentPath === 'all-courses' ? 'active' : ''}>课程管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/all-students-management"} className={currentPath === 'all-students-management' ? 'active' : ''}>学生管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/enrollment-management"} className={currentPath === 'enrollment-management' ? 'active' : ''}>报名管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/news-management"} className={currentPath === 'news-management' ? 'active' : ''}>新闻管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/activities-management"} className={currentPath === 'activities-management' ? 'active' : ''}>活动管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/resources-management-course"} className={currentPath === 'resources-management-course' ? 'active' : ''}>资源管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/my-alerts"} className={currentPath === 'my-alerts' ? 'active' : ''}>我的提醒 (6)</Link></li>
                        <li><Link to={"/" + i18n.language + "/reports"} className={currentPath === 'reports' ? 'active' : ''}>项目报告</Link></li>
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
