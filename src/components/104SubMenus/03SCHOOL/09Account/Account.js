// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class RelatedCourses extends Component {

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
                    <li><Link to={"/" + i18n.language + "/account-information"} className={currentPath === 'account-information' ? 'active' : ''}>账户资料</Link></li>
                    <li><Link to={"/" + i18n.language + "/related-courses"} className={currentPath === 'related-courses' ? 'active' : ''}>相关课程</Link></li>
                    <li><Link to={"/" + i18n.language + "/account-access"} className={currentPath === 'account-access' ? 'active' : ''}>使用权限</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(RelatedCourses));
