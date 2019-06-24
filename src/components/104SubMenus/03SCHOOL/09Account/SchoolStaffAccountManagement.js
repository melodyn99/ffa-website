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
                    <li><Link to={"/" + i18n.language + "/school-account-management"} className={currentPath === 'school-account-management' ? 'active' : ''}>全部</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-account-management"} className={currentPath === '' ? 'active' : ''}>老师</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-account-management"} className={currentPath === '' ? 'active' : ''}>课程人员</Link></li>
                    <li><Link to={"/" + i18n.language + "/school-account-management"} className={currentPath === '' ? 'active' : ''}>管理员</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(SchoolStaffAccountManagement));
