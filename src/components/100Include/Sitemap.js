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
                    <li><Link to={'/' + i18n.language + '/school-all-courses'}>All Courses (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-course-preparations'}>Course Preparations (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-course-materials'}>Course Materials (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-course-work'}>Course Work (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-course-student-management'}>Course Student Management (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-course-student-management-attendance'}>Course Student Management Attendance (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-course-student-management-homework'}>Course Student Management Homework (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-course-q-and-a'}>Course Q & A (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-course-note'}>Course Note (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-course-assessment'}>Course Assessment (done)</Link></li>

                    <h3>Enrollment Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-enrollment-management'}>Enrollment Management (done)</Link></li>

                    <h3>News Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-news-management'}>News Management (done)</Link></li>

                    <h3>activity Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-activity-management'}>Activity Management (done)</Link></li>

                    <h3>Resource Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-resources-management'}>Resource Management Course (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-resources-management-homework'}>Resource Management Homework (done)</Link></li>

                    <h3>Accounts</h3>
                    <li><Link to={'/' + i18n.language + '/school-staff-related-course'}>Related Courses (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-staff-account-management'}>Entrollment History (done)</Link></li>
                </ul>

                <ul>
                    <h2>Form views</h2>

                    <h3>Courses Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-course-information'}>Course Information (Melody) (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-course-new-note'}>Course New Note (Melody) (done)</Link></li>

                    <h3>Students Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-new-student'}>New Student (Him) (done)</Link></li>

                    <h3>News Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-new-news'}>New News (Melody) (done)</Link></li>

                    <h3>activity Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-new-activity'}>New Activity (Melody) (done)</Link></li>

                    <h3>Resource Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-new-material'}>New Material (Melody) (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-new-homework'}>New Homework (Melody) (done)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-new-question'}>New Question (Melody) (done)</Link></li>

                    <h3>Accounts</h3>
                    <li><Link to={'/' + i18n.language + '/school-staff-new-account'}>New Account (Melody) (done)</Link></li>

                </ul>

                <div className="sep-20"></div>

                <ul>
                    <h2>New Pages</h2>

                    <h3>Courses Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-course-reply-q-and-a'}>Course Reply Q and A (Melody)</Link></li>

                    <h3>Student Account</h3>
                    <li><Link to={'/' + i18n.language + '/login-with-register'}>Login with Register (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/login-no-register'}>Login no Register (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-register'}>Student Register (Melody)</Link></li>

                    <h3>Student Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-student-school-staff-related-course'}>Student Related Courses (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-student-information'}>Student Information (Melody)</Link></li>

                    <h3>Resource Management</h3>
                    <li><Link to={'/' + i18n.language + '/school-resources-course'}>Resource Course (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-resources-homework'}>Resource Homework (Melody)</Link></li>

                    <h3>Accounts</h3>
                    <li><Link to={'/' + i18n.language + '/school-staff-account-access'}>Account Access (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-staff-account-information'}>Account Information (Melody)</Link></li>

                    <h3>Student UI Course</h3>
                    <li><Link to={'/' + i18n.language + '/student-course'}>Student Course (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-school-course-information'}>Student Course Information (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-course-date'}>Student Course Date (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-school-course-announcements'}>Student Course Announcements (Melody)</Link></li>

                    <h3>Student UI Enrollment</h3>
                    <li><Link to={'/' + i18n.language + '/student-enrollment-history'}>Student Enrollment History (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-enrollment-history-form'}>Student Enrollment History Form (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-enrollment-history-detail'}>Student Enrollment History Detail (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-enrollment-history-cancel-form'}>Student Enrollment History Cancel Form (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-enrollment-history-cancel-request'}>Student Enrollment History Cancel Request (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/student-enrollment-history-cancelled'}>Student Enrollment History Cancelled (Melody)</Link></li>

                    <h3>Student UI Alert</h3>
                    <li><Link to={'/' + i18n.language + '/student-alert'}>Student Alert (Melody)</Link></li>
                </ul>

                <ul>
                    <h2>New Pages</h2>

                    <h3>General</h3>
                    <li><Link to={'/' + i18n.language + '/school-introduction'}>School Introduction</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-advantage'}>School Advantage</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-learning'}>School Learning</Link></li>
                    <li><Link to={'/' + i18n.language + '/school-case'}>School Cases</Link></li>

                    <h3>Admission</h3>
                    <li><Link to={'/' + i18n.language + '/admission-process'}>Admission Process (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/admission-subject-catalog'}>Admission Subject Catalog (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/admission-course-catalog'}>Admission Course Catalog (Melody)</Link></li>
                    <li><Link to={'/' + i18n.language + '/admission-school-course-information'}>Admission Course Information (Melody)</Link></li>

                    <h3>Home</h3>
                    <li><Link to={'/' + i18n.language + '/home-images'}>Home Images (Melody)</Link></li>
                </ul>
            </div>
        </div >
    );
}

export default withTranslation()(Sitemap);