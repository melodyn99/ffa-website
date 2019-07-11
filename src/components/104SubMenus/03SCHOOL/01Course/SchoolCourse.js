// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
class SchoolCourse extends Component {

    render() {
        const { //t,
            i18n, auth } = this.props;

        let pathname = this.props.route.location.pathname,
            urlArray = pathname.split("/"),
            currentPath = urlArray[2];

        // console.log(currentPath);
        console.log('SchoolCourse_render(): ' + JSON.stringify(auth, null, 2));
        const conferenceId = auth.relatedDataId.conferenceId;

        return (
            <div className="subMenu">
                <ul className="clearfix">
                    <li><Link to={"/" + i18n.language + "/school-course-information/" + conferenceId} className={currentPath === 'school-course-information' ? 'active' : ''}>课程资料</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-course-preparation"} className={currentPath === 'school-course-preparation' ? 'active' : ''}>预先准备</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-course-material"} className={currentPath === 'school-course-material' ? 'active' : ''}>课程教材</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-course-work"} className={currentPath === 'school-course-work' ? 'active' : ''}>课程作业</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-course-student-management"} className={(currentPath === 'school-course-student-management') || (currentPath === 'school-course-student-management-attendance') || (currentPath === 'school-course-student-management-homework') ? 'active' : ''}>学生管理</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-course-announcement"} className={currentPath === 'school-course-announcement' ? 'active' : ''}>课程公告</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-course-q-and-a"} className={(currentPath === 'school-course-q-and-a') || (currentPath === 'school-course-reply-q-and-a') ? 'active' : ''}>课程问答</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-course-note/" + conferenceId} className={(currentPath === 'school-course-note') || (currentPath === 'school-course-new-note') || (currentPath === 'school-note-taking') ? 'active' : ''}>及时记录</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-course-assessment"} className={currentPath === 'school-course-assessment' ? 'active' : ''}>课程评分</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router,
    auth: state.auth
});
const mapDispatchToProps = dispatch => ({
    // loginP: data => dispatch(login(data)),
    // verifyT: token => dispatch(verifyToken(token)),
});
export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withRouter(SchoolCourse)));
