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

        console.log(currentPath);

        return (
            <div className="subMenu">
                <ul className="clearfix">
                    <li><Link to={"/" + i18n.language + "/"}>课程资料</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>预先准备</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>课程教材</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>课程作业</Link></li>
                    <li><Link to={"/" + i18n.language + "/"} className="active">学生管理</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>课程公告</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>课程问答</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>及时记录</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>课程评分</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(CourseStudentManagementAttendance));
