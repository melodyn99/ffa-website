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
                    <li><Link to={'/' + i18n.language + '/course-preparations'}>Course Preparations (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-materials'}>Course Materials (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-work'}>Course Work (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-student-management'}>Course Student Management (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-student-management-attendance'}>Course Student Management Attendance (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-student-management-homework'}>Course Student Management Homework (done)</Link></li>
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

                    <h3>Courses Management</h3>
                    <li><Link to={'/' + i18n.language + '/course-information'}>Course Information (Melody) (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/course-new-notes'}>Course New Notes (Melody) (done)</Link></li>

                    <h3>Students Management</h3>
                    <li><Link to={'/' + i18n.language + '/new-student'}>New Student ()</Link></li>

                    <h3>News Management</h3>
                    <li><Link to={'/' + i18n.language + '/new-news'}>New News ()</Link></li>

                    <h3>Activities Management</h3>
                    <li><Link to={'/' + i18n.language + '/new-activity'}>New Activity ()</Link></li>

                    <h3>Resources Management</h3>
                    <li><Link to={'/' + i18n.language + '/new-material'}>New Material ()</Link></li>
                    <li><Link to={'/' + i18n.language + '/new-homework'}>New Homework (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/new-question'}>New Question (Melody)</Link></li>

                    <h3>Accounts</h3>
                    <li><Link to={'/' + i18n.language + '/new-account'}>New Account (Melody) (done)</Link></li>

                </ul>
                <div className="sep-20"></div>
                <ul>
                    <h2>New Pages</h2>

                    <h3>Student Account</h3>
                    <li><Link to={'/' + i18n.language + '/student-register'}>Student Register (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-login'}>Student Login (Melody)</Link></li>
                </ul>
            </div>
        </div >
    );
}

export default withTranslation()(Sitemap);