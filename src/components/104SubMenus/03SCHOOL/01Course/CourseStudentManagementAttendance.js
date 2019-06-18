// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class CourseStudentManagementAttendance extends Component {

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
                    <li><Link to={"/" + i18n.language + "/course-information"}>课程资料</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-preparations"}>预先准备</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-materials"}>课程教材</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-work"}>课程作业</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-student-management"} className="active">学生管理</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>课程公告</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-q-and-a"}>课程问答</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-notes"}>及时记录</Link></li>
                    <li><Link to={"/" + i18n.language + "/course-assessment"}>课程评分</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(CourseStudentManagementAttendance));
