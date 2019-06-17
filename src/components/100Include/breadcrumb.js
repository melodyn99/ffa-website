// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class Breadcrumb extends Component {

    renderSwitch = (currentPath) => {

        console.log('hello', currentPath);

        switch (currentPath) {

            // Course
            case 'all-courses': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>课程管理</span></div>);
            }
            case 'preparations': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>预先准备</span></div>);
            }
            case 'materials': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程教材</span></div>);
            }
            case 'course-work': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程作业</span></div>);
            }
            case 'student-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>学生管理</span></div>);
            }
            case 'student-management-attendance': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to="/">学生管理</Link></span> > <span>用户名：点名</span></div>);
            }
            case 'student-management-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to="/">学生管理</Link></span> > <span>用户名：作业</span></div>);
            }
            case 'course-q-and-a': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程问答</span></div>);
            }
            case 'course-notes': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>及时记录</span></div>);
            }
            case 'course-assessment': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span>课程评分</span></div>);
            }

            // Student
            case 'new-student': {
                return (<div><span><Link to="/">主页</Link></span> / <span><Link to="/">学生管理</Link></span> > <span>新增学生</span></div>)
            }

            // Enrollment
            case 'enrollment-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>报名管理</span></div>);
            }

            // News
            case 'news-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>新闻管理</span></div>);
            }

            // Activities
            case 'activities-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>活动管理</span></div>);
            }

            // Resources
            case 'resources-management-course': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">资源库管理</Link></span> > <span>课程教材</span></div>);
            }
            case 'resources-management-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">资源库管理</Link></span> > <span>课程作业</span></div>);
            }
            case 'new-material': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">资源库管理</Link></span> > <span><Link to="/">课程教材</Link></span> > <span>新增教材</span></div>);
            }
            case 'new-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">资源库管理</Link></span> > <span><Link to="/">课程作业</Link></span> > <span>新增作业</span></div>);
            }
            case 'new-question': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">资源库管理</Link></span> > <span><Link to="/">课程作业</Link></span> > <span><Link to="/">战略课程作业</Link></span> > <span>新增问题</span></div>);
            }

            // Account
            case 'related-courses': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">账户管理</Link></span> > <span><Link to="/">用户名</Link></span> > <span>账户资料</span></div>);
            }
            case 'enrollment-history': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>账户管理</span></div>);
            }
            case 'new-account': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">账户管理</Link></span> > <span>新增账户</span></div>);
            }
            
            case 'my-alerts': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">報名歷史</Link></span> > <span>報名123</span></div>);
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
