import React, { Component } from 'react';
// import {Redirect} from 'react-router'; hello
import './css/App.scss';
import { withTranslation } from 'react-i18next';

// import { bindActionCreators } from 'redux'; bye
import { connect } from 'react-redux';
// import * as AnimationsActionCreators from './actions/animations';

import querySearch from "stringquery";

import MobileMenu from './components/100Include/mobileMenu';
import Header from './components/100Include/header';
import Footer from './components/100Include/footer';
import Sitemap from './components/100Include/sitemap';

import * as HelperDesktopHandle from './utils/00JqueryControl/DesktopHandle';
import * as HelperMobileHandle from './utils/00JqueryControl/MobileHandle';
import * as HelperPopup from './utils/00JqueryControl/Popup';

/*** GENERAL ***/
// Home
import Home from './containers/01GENERAL/01Home/Home';

// Introduction
import SchoolIntroduction from './containers/01GENERAL/03Brand/SchoolIntroduction';
import SchoolAdvantage from './containers/01GENERAL/03Brand/SchoolAdvantage';
import SchoolLearning from './containers/01GENERAL/03Brand/SchoolLearning';

// Login
import LoginWithRegister from './containers/01GENERAL/02Login/LoginWithRegister';
import LoginNoRegister from './containers/01GENERAL/02Login/LoginNoRegister';


/*** STUDENT ***/
// Register
import StudentRegister from './containers/02STUDENTS/01Register/StudentRegister';
import StudentRegisterPersonalInformation from './containers/02STUDENTS/01Register/StudentRegisterPersonalInformation';
import StudentRegisterDocumentUpload from './containers/02STUDENTS/01Register/StudentRegisterDocumentUpload';
import StudentRegisterQuestionnaire from './containers/02STUDENTS/01Register/StudentRegisterQuestionnaire';
import StudentRegisterFee from './containers/02STUDENTS/01Register/StudentRegisterFee';
import StudentRegisterNotification from './containers/02STUDENTS/01Register/StudentRegisterNotification';

// Scheduling
import Scheduling from './containers/02STUDENTS/Schedule/Scheduling';


/*** SCHOOL ***/
// Course Management
import AllCourses from './containers/03SCHOOL/01Course/AllCourses';
import CourseInformation from './containers/03SCHOOL/01Course/CourseInformation';
import CoursePreparations from './containers/03SCHOOL/01Course/CoursePreparations';
import CourseMaterials from './containers/03SCHOOL/01Course/CourseMaterials';
import CourseWork from './containers/03SCHOOL/01Course/CourseWork';
import CourseStudentManagement from './containers/03SCHOOL/01Course/CourseStudentManagement';
import CourseStudentManagementAttendance from './containers/03SCHOOL/01Course/CourseStudentManagementAttendance';
import CourseStudentManagementHomework from './containers/03SCHOOL/01Course/CourseStudentManagementHomework';
import CourseAnnouncement from './containers/03SCHOOL/01Course/CourseAnnouncement';
import CourseQandA from './containers/03SCHOOL/01Course/CourseQandA';
import CourseReplyQandA from './containers/03SCHOOL/01Course/CourseReplyQandA';
import CourseNotes from './containers/03SCHOOL/01Course/CourseNotes';
import CourseNewNotes from './containers/03SCHOOL/01Course/CourseNewNotes';
import CourseAssessment from './containers/03SCHOOL/01Course/CourseAssessment';

// Student Management
import AllStudentsManagement from './containers/03SCHOOL/02Student/AllStudentsManagement';
import StudentInformation from './containers/03SCHOOL/02Student/StudentInformation';
import StudentRelatedCourses from './containers/03SCHOOL/02Student/StudentRelatedCourses';
import NewStudent from './containers/03SCHOOL/02Student/NewStudent';

// Enrollment Management
import EnrollmentManagement from './containers/03SCHOOL/03Enrollment/EnrollmentManagement';

// News Management
import NewsManagement from './containers/03SCHOOL/04News/NewsManagement';
import NewNews from './containers/03SCHOOL/04News/NewNews';

// Activities Management
import ActivityManagement from './containers/03SCHOOL/05Activity/ActivityManagement';
import NewActivity from './containers/03SCHOOL/05Activity/NewActivity';

// Resources Management
import AllResourcesManagement from './containers/03SCHOOL/06Resource/AllResourcesManagement';
import ResourceManagementCourse from './containers/03SCHOOL/06Resource/ResourceManagementCourse';
import ResourceManagementHomework from './containers/03SCHOOL/06Resource/ResourceManagementHomework';
import ResourceCourse from './containers/03SCHOOL/06Resource/ResourceCourse';
import ResourceHomework from './containers/03SCHOOL/06Resource/ResourceHomework';
import NewMaterial from './containers/03SCHOOL//06Resource/NewMaterial';
import NewHomework from './containers/03SCHOOL//06Resource/NewHomework';
import NewQuestion from './containers/03SCHOOL//06Resource/NewQuestion';

// My Alerts
import MyAlert from './containers/03SCHOOL/07Alert/MyAlert';

// Report
import Report from './containers/03SCHOOL/08Report/Report';

// Account
import RelatedCourses from './containers/03SCHOOL/09Account/RelatedCourses';
import EnrollmentHistory from './containers/03SCHOOL/09Account/EnrollmentHistory';
import NewAccount from './containers/03SCHOOL/09Account/NewAccount';
import AccountAccess from './containers/03SCHOOL/09Account/AccountAccess';
import AccountInformation from './containers/03SCHOOL/09Account/AccountInformation';

// Notes
import NotesTaking from './containers/03SCHOOL/Notes/NotesTaking';
import NotesContent from './containers/03SCHOOL/Notes/NotesContent';
import NewNoteTitle from './containers/03SCHOOL/Notes/NewNoteTitle';
import NewNoteContent from './containers/03SCHOOL/Notes/NewNoteContent';

// Seating Plan
import SeatingPlan from './containers/03SCHOOL/01Course/SeatingPlan/SeatingPlan';

// 404
import PageNotFound from './containers/PageNotFound';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            debug: true
        }
    }

    componentDidMount = () => {
        HelperDesktopHandle.DesktopHandle.init();
        HelperMobileHandle.MobileHandle.init();
        HelperMobileHandle.MobileHandle.containersSize();
        HelperPopup.Popup.init();
        HelperPopup.Popup.containersSize();
        window.addEventListener("resize", this.windowResize);
    }

    componentDidUpdate = () => {
        window.scrollTo(0, 0);
        HelperPopup.Popup.init();
    }

    windowResize = () => {
        HelperDesktopHandle.DesktopHandle.resetDesktopMenu();
        HelperDesktopHandle.DesktopHandle.maxHeightDesktopMenu();
        HelperMobileHandle.MobileHandle.containersSize();
        HelperPopup.Popup.containersSize();
    }

    // change URL
    renderSwitch = (route) => {
        let pathname = route.location.pathname,
            search = route.location.search,
            urlArray = pathname.split("/"),
            params = null;

        if (search !== "")
            params = querySearch(search);

        return this.getComponent(urlArray, params);
    }

    getComponent = (urlArray, params) => {
        // let language = urlArray[1],
        let component = urlArray[2];

        if (component) {
            // console.log(params);

            switch (component) {
                /*** GENERAL ***/
                // Home
                case 'home': {
                    return <Home />;
                }

                // School Introduction
                case 'school-introduction': {
                    return <SchoolIntroduction />
                }
                case 'school-advantage': {
                    return <SchoolAdvantage />
                }
                case 'school-learning': {
                    return <SchoolLearning />
                }

                // Login
                case 'login-with-register': {
                    return <LoginWithRegister />
                }
                case 'login-no-register': {
                    return <LoginNoRegister />
                }

                /*** STUDENT ***/
                // Register
                case 'student-register': {
                    return <StudentRegister />
                }
                case 'student-register-personal-information': {
                    return <StudentRegisterPersonalInformation />
                }
                case 'student-register-document-upload': {
                    return <StudentRegisterDocumentUpload />
                }
                case 'student-register-questionnaire': {
                    return <StudentRegisterQuestionnaire />
                }
                case 'student-register-fee': {
                    return <StudentRegisterFee />
                }
                case 'student-register-notification': {
                    return <StudentRegisterNotification />
                }

                // Scheduling
                case 'scheduling': {
                    return <Scheduling />;
                }

                /*** SCHOOL ***/
                // Course Management  
                case 'all-courses': {
                    return <AllCourses />;
                }
                case 'course-information': {
                    return <CourseInformation />
                }
                case 'course-preparations': {
                    return <CoursePreparations />;
                }
                case 'course-materials': {
                    return <CourseMaterials />;
                }
                case 'course-work': {
                    return <CourseWork />;
                }
                case 'course-student-management': {
                    return <CourseStudentManagement />;
                }
                case 'course-student-management-attendance': {
                    return <CourseStudentManagementAttendance />;
                }
                case 'course-student-management-homework': {
                    return <CourseStudentManagementHomework />;
                }
                case 'course-announcement': {
                    return <CourseAnnouncement />
                }
                case 'course-q-and-a': {
                    return <CourseQandA />;
                }
                case 'course-reply-q-and-a': {
                    return <CourseReplyQandA />;
                }
                case 'course-notes': {
                    return <CourseNotes />;
                }
                case 'course-new-notes': {
                    return <CourseNewNotes />;
                }
                case 'course-assessment': {
                    return <CourseAssessment />;
                }

                // Student Management
                case 'all-students-management': {
                    return <AllStudentsManagement />
                }
                case 'student-information': {
                    return <StudentInformation />
                }
                case 'student-related-courses': {
                    return <StudentRelatedCourses />
                }
                case 'new-student': {
                    return <NewStudent />;
                }

                // Enrollment Management
                case 'enrollment-management': {
                    return <EnrollmentManagement />;
                }

                // News Management
                case 'news-management': {
                    return <NewsManagement />;
                }
                case 'new-news': {
                    return <NewNews />;
                }

                // Activities Management
                case 'activities-management': {
                    return <ActivityManagement />;
                }
                case 'new-activity': {
                    return <NewActivity />;
                }

                // Resources Management
                case 'all-resources-management': {
                    return <AllResourcesManagement />;
                }
                case 'resources-management-course': {
                    return <ResourceManagementCourse />;
                }
                case 'resources-management-homework': {
                    return <ResourceManagementHomework />;
                }
                case 'resources-course': {
                    return <ResourceCourse />;
                }
                case 'resources-homework': {
                    return <ResourceHomework />;
                }
                case 'new-material': {
                    return <NewMaterial />;
                }
                case 'new-homework': {
                    return <NewHomework />;
                }
                case 'new-question': {
                    return <NewQuestion />;
                }

                // Alert
                case 'my-alerts': {
                    return <MyAlert />;
                }

                // Report
                case 'reports': {
                    return <Report />;
                }

                // Account
                case 'related-courses': {
                    return <RelatedCourses />;
                }
                case 'enrollment-history': {
                    return <EnrollmentHistory />;
                }
                case 'new-account': {
                    return <NewAccount />
                }
                case 'account-access': {
                    return <AccountAccess />
                }
                case 'account-information': {
                    return <AccountInformation />
                }

                // Notes Taking
                case 'notes-taking': {
                    return <NotesTaking />;
                }
                case 'notes-content': {
                    return <NotesContent params={params} />;
                }
                case 'new-note': {
                    return <NewNoteTitle />
                }
                case 'new-note-content': {
                    return <NewNoteContent />
                }

                // Seating Plan
                case 'seating-plan': {
                    return <SeatingPlan />;
                }

                default: {
                    return <PageNotFound />;
                }
            }
        } else {
            return <Home />
        }
    }

    render() {
        // console.log(this.props.route.location.pathname);

        return (
            <div>
                <MobileMenu />

                <div id="wrap">
                    <Header />

                    <div className="blackPlane"></div>

                    {this.renderSwitch(this.props.route)}

                    <Footer />

                    {this.state.debug &&
                        <Sitemap />
                    }
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(App));
