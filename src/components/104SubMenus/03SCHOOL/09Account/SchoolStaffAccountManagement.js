// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class SchoolStaffAccountManagement extends Component {

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
                    <li><Link to={"/" + i18n.language + "/school-staff-account-information"} className={currentPath === 'school-staff-account-information' ? 'active' : ''}>账户资料</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-staff-related-course"} className={currentPath === 'school-staff-related-course' ? 'active' : ''}>相关课程</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-staff-account-access"} className={currentPath === 'school-staff-account-access' ? 'active' : ''}>使用权限</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(SchoolStaffAccountManagement));
