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
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span></div>);
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
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to="/">学生管理</Link></span> > <span>陈大文：点名</span></div>);
            }
            case 'student-management-homework': {
                return (<div><span><Link to="/">主頁</Link></span> / <span><Link to="/">课程管理</Link></span> > <span><Link to="/">S1-001 品牌盈利模式</Link></span> > <span><Link to="/">学生管理</Link></span> > <span>陈大文：作业</span></div>);
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

            // Enrollment
            case 'enrollment-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>报名历史</span></div>);
            }

            // News
            case 'news-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>新闻管理</span></div>);
            }

            // Activities
            case 'activities-management': {
                return (<div><span><Link to="/">主頁</Link></span> / <span>活动管理</span></div>);
            }
            

            default: {
                return (<div><span> <Link to="/">主頁</Link></span></div>);
            }
        }
    }

    render() {
        // const { t, i18n } = props;

        let pathname = this.props.route.location.pathname,
            urlArray = pathname.split("/"),
            currentPath = urlArray[2];

        console.log(currentPath);

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
