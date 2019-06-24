// Essential for all components
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Redux
import { connect } from 'react-redux';

class StudentRegister extends Component {

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
                    <li><Link to={"/" + i18n.language + "/student-register-personal-information"} className={currentPath === 'student-register-personal-information' ? 'active' : ''}>个人资料</Link></li>
                    <li><Link to={"/" + i18n.language + "/student-register-document-upload"} className={currentPath === 'student-register-document-upload' ? 'active' : ''}>上载文件</Link></li>
                    <li><Link to={"/" + i18n.language + "/student-register-questionnaire"} className={currentPath === 'student-register-questionnaire' ? 'active' : ''}>问卷调查</Link></li>
                    <li><Link to={"/" + i18n.language + "/student-register-fee"} className={currentPath === 'student-register-fee' ? 'active' : ''}>缴付费用</Link></li>
                    <li><Link to={"/" + i18n.language + "/student-register-notification"} className={currentPath === 'student-register-notification' ? 'active' : ''}>录取通知</Link></li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(StudentRegister));