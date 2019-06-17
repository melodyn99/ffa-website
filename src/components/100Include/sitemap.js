import React from 'react';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

function Sitemap(props) {
    const {
        // t,
        i18n } = props;

    return (
        <div className="wrapper-sitemap">
            <div className="sitemap clearfix">
                <ul>
                    <h2>Table views</h2>

                    <h3>Courses Management</h3>
                    <li><Link to={'/' + i18n.language + '/all-courses'}>All Courses (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/preparations'}>Preparations (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/materials'}>Materials (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-work'}>Course Work (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-management'}>Student Management (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-management-attendance'}>Student Management Attendance (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-management-homework'}>Student Management Homework (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-q-and-a'}>Course Q & A (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-notes'}>Course Notes (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-assessment'}>Course Assessment (done)</Link></li>

                    <h3>Enromment Management</h3>
                    <li><Link to={'/' + i18n.language + '/enrollment-management'}>Enrollment Management (done)</Link></li>

                    <h3>News Management</h3>
                    <li><Link to={'/' + i18n.language + '/news-management'}>News Management (done)</Link></li>

                    <h3>Activities Management</h3>
                    <li><Link to={'/' + i18n.language + '/activities-management'}>Activity Management (done)</Link></li>

                    <h3>Resources Management</h3>
                    <li><Link to={'/' + i18n.language + '/resources-management-course'}>Resource Management Course (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/resources-management-homework'}>Resource Management Homework (done)</Link></li>

                    <h3>Accounts</h3>
                    <li><Link to={'/' + i18n.language + '/related-courses'}>Related Courses (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/enrollment-history'}>Entrollment History (done)</Link></li>
                </ul>

                <ul>
                    <h2>Form views</h2>

                    <h3>Students Management</h3>
                    <li><Link to={'/' + i18n.language + '/new-student'}>New Student</Link></li>

                    <h3>Accounts</h3>
                    <li><Link to={'/' + i18n.language + '/new-account'}>New Account</Link></li>

                </ul>
            </div>
        </div >
    );
}

export default withTranslation()(Sitemap);