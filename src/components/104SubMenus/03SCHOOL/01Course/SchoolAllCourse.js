// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class SchoolAllCourse extends Component {

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
                    <li><Link to={"/" + i18n.language + "/school-all-course"} className={currentPath === 'school-all-course' ? 'active' : ''}>所有课程</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-all-course"} className={currentPath === 'course-a' ? 'active' : ''}>战略课程</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-all-course"} className={currentPath === 'course-b' ? 'active' : ''}>商品管理系列课程</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-all-course"} className={currentPath === 'course-c' ? 'active' : ''}>设计应用系列课程</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-all-course"} className={currentPath === 'course-d' ? 'active' : ''}>开发流程系列课程</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(SchoolAllCourse));
