// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class Course extends Component {

    render() {
        const { //t, 
            i18n } = this.props;

        let pathname = this.props.route.location.pathname,
            urlArray = pathname.split("/"),
            currentPath = urlArray[2];

        // console.log(currentPath);

        return (
            <div className="subMenu">
                <ul className="clearfix">
                    <li><Link to={"/" + i18n.language + "/course-information"} className={currentPath === 'course-information' ? 'active' : ''}>课程资料</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-preparations"} className={currentPath === 'course-preparations' ? 'active' : ''}>预先准备</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-materials"} className={currentPath === 'course-materials' ? 'active' : ''}>课程教材</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-work"} className={currentPath === 'course-work' ? 'active' : ''}>课程作业</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-student-management"} className={currentPath === 'course-student-management' ? 'active' : ''}>学生管理</Link></li>
                    <li><Link to={"/" + i18n.language + "/"} className={currentPath === '/' ? 'active' : ''}>课程公告</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-q-and-a"} className={currentPath === 'course-q-and-a' ? 'active' : ''}>课程问答</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-notes"} className={currentPath === 'course-notes' ? 'active' : ''}>及时记录</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-assessment"} className={currentPath === 'course-assessment' ? 'active' : ''}>课程评分</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(Course));
