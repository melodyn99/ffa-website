// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class EnrollmentHistory extends Component {

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
                    <li><Link to={"/" + i18n.language + "/"} className="active">全部</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>老师</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>课程人员</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>管理员</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(EnrollmentHistory));
