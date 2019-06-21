// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class Breadcrumb extends Component {

    renderSwitch = (currentPath) => {
        const { //t, 
            i18n } = this.props;
        // console.log('hello', currentPath);

        switch (currentPath) {

            /*** GENERAL ***/
            // Introduction
            case 'school-introduction': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">品牌</Link></span> > <span>学院简介</span></div >);
            }

            // Admission
            case 'admission-process': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span>入学申请流程</span></div >);
            }
            case 'admission-subject-catalog': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span>学科目录</span></div >);
            }
            case 'admission-course-catalog': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to="/admission-subject-catalog">学科目录</Link></span> > <span>商品管理系列课程</span></div >);
            }
            case 'admission-course-information': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to="/admission-subject-catalog">学科目录</Link></span> > <span><Link to="/admission-course-catalog">商品管理系列课程</Link></span> > <span>快反商品力企划</span></div >);
            }

            // Login
            case 'login-with-register': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span>报名</span></div >);
            }
            case 'student-register-personal-information': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to="/">报名</Link></span> > <span>報名申請</span></div >);
            }
            case 'student-register-document-upload': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to="/">报名</Link></span> > <span>報名申請</span></div >);
            }
            case 'student-register-questionnaire': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to="/">报名</Link></span> > <span>報名申請</span></div >);
            }
            case 'student-register-fee': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to="/">报名</Link></span> > <span>報名申請</span></div >);
            }
            case 'student-register-notification': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to="/">报名</Link></span> > <span>報名申請</span></div >);
            }

            /*** STUDENT ***/
            // Register
            case 'student-register': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to={"/" + i18n.language + "/login-with-register"}>报名</Link></span> > <span>建立新账户</span></div>)
            }

            // Course
            case 'student-course': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>我的课程</span></div>)
            }
            case 'student-course-information': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-course">我的课程</Link></span> > <span>S1-001品牌盈利模式</span></div>)
            }
            case 'student-course-date': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-course">我的课程</Link></span> > <span>S1-001品牌盈利模式</span></div>)
            }
            case 'student-course-announcements': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-course">我的课程</Link></span> > <span>S1-001品牌盈利模式</span></div>)
            }

            // Enrollment
            case 'student-enrollment-history': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>报名历史</span></div>)
            }
            case 'student-enrollment-history-form': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-enrollment-history">报名历史</Link></span> > <span>报名</span></div>)
            }
            case 'student-enrollment-history-detail': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-enrollment-history">报名历史</Link></span> > <span>报名</span></div>)
            }
            case 'student-enrollment-history-cancel-form': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-enrollment-history">报名历史</Link></span> > <span><Link to="student-enrollment-history-detail">报名</Link></span> > <span>申请取消</span></div>)
            }
            case 'student-enrollment-history-cancel-request': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-enrollment-history">报名历史</Link></span> > <span>报名</span></div>)
            }
            case 'student-enrollment-history-cancelled': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-enrollment-history">报名历史</Link></span> > <span>报名</span></div>)
            }

            // Alert
            case 'student-alerts': {
                return (<div><span><Link to="/">主页</Link></span> / <span>我的提醒</span></div>)
            }

            /*** SCHOOL ***/
            // Course Management  
            case 'all-courses': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>课程管理</span></div>);
            }
            case 'course-information': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程资料</span></div>);
            }
            case 'course-preparations': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>预先准备</span></div>);
            }
            case 'course-materials': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程教材</span></div>);
            }
            case 'course-work': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程作业</span></div>);
            }
            case 'course-student-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>学生管理</span></div>);
            }
            case 'course-student-management-attendance': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to="/">学生管理</Link></span> > <span>用户名：点名</span></div>);
            }
            case 'course-student-management-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to="/">学生管理</Link></span> > <span>用户名：作业</span></div>);
            }
            case 'course-q-and-a': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程问答</span></div>);
            }
            case 'course-notes': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>及时记录</span></div>);
            }
            case 'course-new-notes': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to={"/" + i18n.language + "/course-notes"}>及时记录</Link></span> > <span>及时记录1</span></div>);
            }
            case 'course-assessment': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-courses"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程评分</span></div>);
            }

            // Student Management
            case 'new-student': {
                return (<div><span><Link to="/">主页</Link></span> / <span><Link to={"/" + i18n.language + "/all-students-management"}>学生管理</Link></span> > <span>新增学生</span></div>)
            }
            case 'student-information': {
                return (<div><span><Link to="/">主页</Link></span> / <span><Link to={"/" + i18n.language + "/all-students-management"}>学生管理</Link></span> > <span><Link to="/">陈大文</Link></span> > <span>学生资料</span></div>)
            }
            case 'student-related-courses': {
                return (<div><span><Link to="/">主页</Link></span> / <span><Link to={"/" + i18n.language + "/all-students-management"}>学生管理</Link></span> > <span><Link to="/">陈大文</Link></span> > <span>相关课程</span></div>)
            }

            // Enrollment Management
            case 'enrollment-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>报名管理</span></div>);
            }

            // News Management
            case 'news-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>新闻管理</span></div>);
            }
            case 'new-news': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>新闻管理</span></div>);
            }

            // Activities Management
            case 'activities-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>活动管理</span></div>);
            }
            case 'new-activity': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>活动管理</span></div>);
            }

            // Resources Management
            case 'resources-management-course': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-resources-management"}>资源库管理</Link></span> > <span>课程教材</span></div>);
            }
            case 'resources-management-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-resources-management"}>资源库管理</Link></span> > <span>课程作业</span></div>);
            }
            case 'resources-course': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-resources-management"}>资源库管理</Link></span> > <span><Link to={"/" + i18n.language + "/resources-management-course"}>课程教材</Link></span> > <span>战略课程教材</span></div>);
            }
            case 'resources-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-resources-management"}>资源库管理</Link></span> > <span><Link to={"/" + i18n.language + "/resources-management-homework"}>课程作业</Link></span> > <span>战略课程作业</span></div>);
            }
            case 'new-material': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-resources-management"}>资源库管理</Link></span> > <span><Link to={"/" + i18n.language + "/resources-management-course"}>课程教材</Link></span> > <span>新增教材</span></div>);
            }
            case 'new-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-resources-management"}>资源库管理</Link></span> > <span><Link to={"/" + i18n.language + "/resources-management-homework"}>课程作业</Link></span> > <span>新增作业</span></div>);
            }
            case 'new-question': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/all-resources-management"}>资源库管理</Link></span> > <span><Link to={"/" + i18n.language + "/resources-management-homework"}>课程作业</Link></span> > <span><Link to="/">战略课程作业</Link></span> > <span>新增问题</span></div>);
            }

            // My Alerts
            case 'school-alerts': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>我的提醒(6)</span></div>);
            }

            // Account
            case 'related-courses': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/enrollment-history"}>账户管理</Link></span> > <span><Link to="/">用户名</Link></span> > <span>账户资料</span></div>);
            }
            case 'account-access': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/enrollment-history"}>账户管理</Link></span> > <span><Link to="/">用户名</Link></span> > <span>账户资料</span></div>);
            }
            case 'account-information': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/enrollment-history"}>账户管理</Link></span> > <span><Link to="/">用户名</Link></span> > <span>账户资料</span></div>);
            }
            case 'enrollment-history': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>账户管理</span></div>);
            }
            case 'new-account': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/enrollment-history"}>账户管理</Link></span> > <span>新增账户</span></div>);
            }

            default: {
                return (<div><span> <Link to="/">主頁</Link></span></div>);
            }
        }
    }

    render() {
        // const { t, i18n } = props;

        // console.log('hi', this.props.route.location.pathname);

        let pathname = this.props.route.location.pathname,
            urlArray = pathname.split("/"),
            currentPath = urlArray[2];

        // console.log(currentPath);

        return (
            <div className="breadcrumb">
                {this.renderSwitch(currentPath)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(Breadcrumb));
