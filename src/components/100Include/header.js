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

        return (
            <div className="wrapper-header">
                <div className="header">
                    <div className="mobile-menu-btn">MENU</div>

                    <div className="logo"></div>

                    <div className="desktop-menu clearfix">
                        <li><Link to={"/" + i18n.language + "/courses-management"}>课程管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/students-management"} className="active">学生管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/enrollment-management"}>报名管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/news-management"}>新闻管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/activities-management"}>活动管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/resources-management"}>资源管理</Link></li>
                        <li><Link to={"/" + i18n.language + "/my-alerts"}>我的提醒 (3)</Link></li>
                        <li><Link to={"/" + i18n.language + "/reports"}>项目报告</Link></li>
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
