// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class AllCourses extends Component {

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
                    <li><Link to={"/" + i18n.language + "/"} className="active">所有课程</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>战略课程</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>商品管理系列课程</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>设计应用系列课程</Link></li>
                    <li><Link to={"/" + i18n.language + "/"}>开发流程系列课程</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(AllCourses));
