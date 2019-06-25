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
            // Login
            case 'login-with-register': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span>报名</span></div >);
            }
            case 'student-register-personal-information': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to={"/" + i18n.language +"/login-with-register"}>报名</Link></span> > <span>報名申請</span></div >);
            }
            case 'student-register-document-upload': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to={"/" + i18n.language +"/login-with-register"}>报名</Link></span> > <span>報名申請</span></div >);
            }
            case 'student-register-questionnaire': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to={"/" + i18n.language +"/login-with-register"}>报名</Link></span> > <span>報名申請</span></div >);
            }
            case 'student-register-fee': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to={"/" + i18n.language +"/login-with-register"}>报名</Link></span> > <span>報名申請</span></div >);
            }
            case 'student-register-notification': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to={"/" + i18n.language +"/login-with-register"}>报名</Link></span> > <span>報名申請</span></div >);
            }

            // Brand
            case 'school-introduction': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">品牌</Link></span> > <span>学院简介</span></div >);
            }
            case 'school-advantage': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">品牌</Link></span> > <span>在菲力尚学学习的优点</span></div >);
            }
            case 'school-learning': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">品牌</Link></span> > <span>学生学习相关介绍</span></div >);
            }
            case 'news': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">品牌</Link></span> > <span>学院故事及新闻</span></div >);
            }
            case 'news-detail': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">品牌</Link></span> > <span>学院故事及新闻</span></div >);
            }
            case 'activity': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">品牌</Link></span> > <span>学院相关的活动</span></div >);
            }
            case 'activity-detail': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">品牌</Link></span> > <span>学院相关的活动</span></div >);
            }
            case 'school-case': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">品牌</Link></span> > <span>和学院合作的案例</span></div >);
            }

            // Admission
            case 'admission-process': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span>入学申请流程</span></div >);
            }
            case 'admission-subject-catalog': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span>学科目录</span></div >);
            }
            case 'admission-course-catalog': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to={"/" + i18n.language +"/admission-subject-catalog"}>学科目录</Link></span> > <span>商品管理系列课程</span></div >);
            }
            case 'admission-course-information': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to={"/" + i18n.language +"/admission-subject-catalog"}>学科目录</Link></span> > <span><Link to={"/" + i18n.language +"/admission-course-catalog"}>商品管理系列课程</Link></span> > <span>快反商品力企划</span></div >);
            }

            
            /*** STUDENT ***/
            // Student Register
            case 'student-register': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">入学</Link></span> > <span><Link to={"/" + i18n.language + "/login-with-register"}>报名</Link></span> > <span>建立新账户</span></div>)
            }

            // Student Course
            case 'student-scheduling': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>我的课程</span></div>)
            }
            case 'student-course-information': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-scheduling">我的课程</Link></span> > <span>S1-001品牌盈利模式</span></div>)
            }
            case 'student-course-date': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-scheduling">我的课程</Link></span> > <span>S1-001品牌盈利模式</span></div>)
            }
            case 'student-course-announcement': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="student-scheduling">我的课程</Link></span> > <span>S1-001品牌盈利模式</span></div>)
            }

            // Student Enrollment
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

            // Student Alert
            case 'student-alert': {
                return (<div><span><Link to="/">主页</Link></span> / <span>我的提醒</span></div>)
            }

            /*** SCHOOL ***/
            // School Course Management  
            case 'school-all-course': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>课程管理</span></div>);
            }
            case 'school-course-information': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程资料</span></div>);
            }
            case 'school-course-preparation': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>预先准备</span></div>);
            }
            case 'school-course-material': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程教材</span></div>);
            }
            case 'school-course-work': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程作业</span></div>);
            }
            case 'school-course-student-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>学生管理</span></div>);
            }
            case 'school-course-student-management-attendance': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to="/">学生管理</Link></span> > <span>用户名：点名</span></div>);
            }
            case 'school-course-student-management-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to="/">学生管理</Link></span> > <span>用户名：作业</span></div>);
            }
            case 'school-course-announcement': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程公告</span></div>);
            }
            case 'school-course-q-and-a': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程问答</span></div>);
            }
            case 'school-course-note': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>及时记录</span></div>);
            }
            case 'school-course-new-note': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to={"/" + i18n.language + "/school-course-note"}>及时记录</Link></span> > <span>及时记录1</span></div>);
            }
            case 'school-note-taking': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to={"/" + i18n.language + "/school-course-note"}>及时记录</Link></span> > <span>及时记录1</span></div>);
            }
            case 'school-course-assessment': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-course"}>课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程评分</span></div>);
            }

            // School Student Management
            case 'school-new-student': {
                return (<div><span><Link to="/">主页</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-student-management"}>学生管理</Link></span> > <span>新增学生</span></div>)
            }
            case 'school-student-information': {
                return (<div><span><Link to="/">主页</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-student-management"}>学生管理</Link></span> > <span><Link to="/">陈大文</Link></span> > <span>学生资料</span></div>)
            }
            case 'school-student-related-course': {
                return (<div><span><Link to="/">主页</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-student-management"}>学生管理</Link></span> > <span><Link to="/">陈大文</Link></span> > <span>相关课程</span></div>)
            }

            // School Enrollment Management
            case 'school-enrollment-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>报名管理</span></div>);
            }

            // School News Management
            case 'school-news-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>新闻管理</span></div>);
            }
            case 'school-new-news': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>新闻管理</span></div>);
            }

            // School activity Management
            case 'school-activity-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>活动管理</span></div>);
            }
            case 'school-new-activity': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>活动管理</span></div>);
            }

            // School Resource Management
            case 'school-resource-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>资源库管理</span></div>);
            }
            case 'school-resource-management-course': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-resource-management"}>资源库管理</Link></span> > <span>课程教材</span></div>);
            }
            case 'school-resource-management-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-resource-management"}>资源库管理</Link></span> > <span>课程作业</span></div>);
            }
            case 'school-resource-course': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-resource-management"}>资源库管理</Link></span> > <span><Link to={"/" + i18n.language + "/school-resource-management-course"}>课程教材</Link></span> > <span>战略课程教材</span></div>);
            }
            case 'school-resource-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-resource-management"}>资源库管理</Link></span> > <span><Link to={"/" + i18n.language + "/school-resource-management-homework"}>课程作业</Link></span> > <span>战略课程作业</span></div>);
            }
            case 'school-new-material': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-resource-management"}>资源库管理</Link></span> > <span><Link to={"/" + i18n.language + "/school-resource-management-course"}>课程教材</Link></span> > <span>新增教材</span></div>);
            }
            case 'school-new-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-resource-management"}>资源库管理</Link></span> > <span><Link to={"/" + i18n.language + "/school-resource-management-homework"}>课程作业</Link></span> > <span>新增作业</span></div>);
            }
            case 'school-new-question': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-resource-management"}>资源库管理</Link></span> > <span><Link to={"/" + i18n.language + "/school-resource-management-homework"}>课程作业</Link></span> > <span><Link to={"/" + i18n.language + "/school-resource-homework"}>战略课程作业</Link></span> > <span>新增问题</span></div>);
            }

            // School Alert
            case 'school-alert': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>我的提醒(6)</span></div>);
            }

            // School Account
            case 'school-staff-related-course': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-staff-account-management"}>账户管理</Link></span> > <span><Link to="/">用户名</Link></span> > <span>账户资料</span></div>);
            }
            case 'school-staff-account-access': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-staff-account-management"}>账户管理</Link></span> > <span><Link to="/">用户名</Link></span> > <span>账户资料</span></div>);
            }
            case 'school-staff-account-information': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-staff-account-management"}>账户管理</Link></span> > <span><Link to="/">用户名</Link></span> > <span>账户资料</span></div>);
            }
            case 'school-all-staff-account-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>账户管理</span></div>);
            }
            case 'school-staff-new-account': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to={"/" + i18n.language + "/school-all-staff-account-management"}>账户管理</Link></span> > <span>新增账户</span></div>);
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
            <div className="Breadcrumb">
                {this.renderSwitch(currentPath)}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(Breadcrumb));
