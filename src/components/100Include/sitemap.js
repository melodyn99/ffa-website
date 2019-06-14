import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function Sitemap(props) {
    const { t,
        i18n } = props;

    return (
        <div className="wrapper-sitemap">
            <div className="sitemap">
                <ul>
                    <h2>Table views</h2>

                    <h3>Courses Management</h3>
                    <li><Link to={'/' + i18n.language + '/all-courses'}>All Courses</Link></li>
                    <li><Link to={'/' + i18n.language + '/preparations'}>Preparations</Link></li>
                    <li><Link to={'/' + i18n.language + '/materials'}>Materials</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-work'}>Course Work</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-management'}>Student Management</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-management-attendance'}>Student Management Attendance</Link></li>

                    <h3>Accounts</h3>
                    <li><Link to={'/' + i18n.language + '/related-courses'}>Related Courses</Link></li>
                    <li><Link to={'/' + i18n.language + '/enrollment-history'}>Entrollment History</Link></li>
                </ul>
            </div>
        </div >
    );
}

export default withTranslation()(Sitemap);