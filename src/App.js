import React, { Component } from 'react';
// import {Redirect} from 'react-router'; hello
import './css/App.scss';
import { withTranslation } from 'react-i18next';

// import { bindActionCreators } from 'redux'; bye
import { connect } from 'react-redux';
// import * as AnimationsActionCreators from './actions/animations';

import querySearch from "stringquery";

import MobileMenu from './components/100Include/MobileMenu';
import Header from './components/100Include/Header';
import Footer from './components/100Include/Footer';
import Sitemap from './components/100Include/Sitemap';
import HomePageTopBar from './components/100Include/HomePageTopBar';

import * as HelperDesktopHandle from './utils/00JqueryControl/DesktopHandle';
import * as HelperMobileHandle from './utils/00JqueryControl/MobileHandle';
import * as HelperPopup from './utils/00JqueryControl/Popup';

/*** GENERAL ***/
// Home
import Home from './containers/01GENERAL/01Home/Home';
import HomeImages from './containers/01GENERAL/01Home/HomeImages';

// Login
import LoginWithRegister from './containers/01GENERAL/02Login/LoginWithRegister';
import LoginNoRegister from './containers/01GENERAL/02Login/LoginNoRegister';

// Brand
import SchoolIntroduction from './containers/01GENERAL/03Brand/SchoolIntroduction';
import SchoolAdvantage from './containers/01GENERAL/03Brand/SchoolAdvantage';
import SchoolLearning from './containers/01GENERAL/03Brand/SchoolLearning';
import SchoolCase from './containers/01GENERAL/03Brand/SchoolCase';

// Admission
import AdmissionProcess from './containers/01GENERAL/06Admission/AdmissionProcess';
import AdmissionSubjectCatalog from './containers/01GENERAL/06Admission/AdmissionSubjectCatalog';
import AdmissionCourseCatalog from './containers/01GENERAL/06Admission/AdmissionCourseCatalog';
import AdmissionCourseInformation from './containers/01GENERAL/06Admission/AdmissionCourseInformation';

// News
import News from './containers/01GENERAL/04News/News';
import NewsDetail from './containers/01GENERAL/04News/NewsDetail';

// Activity
import Activity from './containers/01GENERAL/05Activity/Activity';
import ActivityDetail from './containers/01GENERAL/05Activity/ActivityDetail';


/*** STUDENT ***/
// Student Register
import StudentRegister from './containers/02STUDENTS/01Register/StudentRegister';
import StudentRegisterPersonalInformation from './containers/02STUDENTS/01Register/StudentRegisterPersonalInformation';
import StudentRegisterDocumentUpload from './containers/02STUDENTS/01Register/StudentRegisterDocumentUpload';
import StudentRegisterQuestionnaire from './containers/02STUDENTS/01Register/StudentRegisterQuestionnaire';
import StudentRegisterFee from './containers/02STUDENTS/01Register/StudentRegisterFee';
import StudentRegisterNotification from './containers/02STUDENTS/01Register/StudentRegisterNotification';

// Student Course
import StudentCourseDate from './containers/02STUDENTS/02Course/StudentCourseDate';
import StudentCourseInformation from './containers/02STUDENTS/02Course/StudentCourseInformation';
import StudentCourseAnnouncement from './containers/02STUDENTS/02Course/StudentCourseAnnouncement';

// Student Scheduling
import StudentScheduling from './containers/02STUDENTS/Schedule/StudentScheduling';

// Stuednt Enrollment
import StudentEnrollmentHistory from './containers/02STUDENTS/03Enrollment/StudentEnrollmentHistory';
import StudentEnrollmentHistoryForm from './containers/02STUDENTS/03Enrollment/StudentEnrollmentHistoryForm';
import StudentEnrollmentHistoryDetail from './containers/02STUDENTS/03Enrollment/StudentEnrollmentHistoryDetail';
import StudentEnrollmentHistoryCancelForm from './containers/02STUDENTS/03Enrollment/StudentEnrollmentHistoryCancelForm';
import StudentEnrollmentHistoryCancelRequest from './containers/02STUDENTS/03Enrollment/StudentEnrollmentHistoryCancelRequest';
import StudentEnrollmentHistoryCancelled from './containers/02STUDENTS/03Enrollment/StudentEnrollmentHistoryCancelled';

// Student Alert
import StudentAlert from './containers/02STUDENTS/04Alert/StudentAlert';


/*** SCHOOL ***/
// School Course Management
import SchoolAllCourse from './containers/03SCHOOL/01Course/SchoolAllCourse';
import SchoolCourseInformation from './containers/03SCHOOL/01Course/SchoolCourseInformation';
import SchoolCoursePreparations from './containers/03SCHOOL/01Course/SchoolCoursePreparations';
import SchoolCourseMaterial from './containers/03SCHOOL/01Course/SchoolCourseMaterial';
import SchoolCourseWork from './containers/03SCHOOL/01Course/SchoolCourseWork';
import SchoolCourseStudentManagement from './containers/03SCHOOL/01Course/SchoolCourseStudentManagement';
import SchoolCourseStudentManagementAttendance from './containers/03SCHOOL/01Course/SchoolCourseStudentManagementAttendance';
import SchoolCourseStudentManagementHomework from './containers/03SCHOOL/01Course/SchoolCourseStudentManagementHomework';
import SchoolCourseAnnouncement from './containers/03SCHOOL/01Course/SchoolCourseAnnouncement';
import SchoolCourseQandA from './containers/03SCHOOL/01Course/SchoolCourseQandA';
import SchoolCourseReplyQandA from './containers/03SCHOOL/01Course/SchoolCourseReplyQandA';
import SchoolCourseNotes from './containers/03SCHOOL/01Course/SchoolCourseNotes';
import SchoolCourseNewNotes from './containers/03SCHOOL/01Course/SchoolCourseNewNotes';
import SchoolCourseAssessment from './containers/03SCHOOL/01Course/SchoolCourseAssessment';

// School Student Management
import SchoolStudentsManagement from './containers/03SCHOOL/02Student/SchoolStudentsManagement';
import SchoolStudentInformation from './containers/03SCHOOL/02Student/SchoolStudentInformation'; // this
import SchoolStudentRelatedCourses from './containers/03SCHOOL/02Student/SchoolStudentRelatedCourses'; // this
import SchoolNewStudent from './containers/03SCHOOL/02Student/SchoolNewStudent'; // this

// School Enrollment Management
import SchoolEnrollmentManagement from './containers/03SCHOOL/03Enrollment/SchoolEnrollmentManagement';

// School News Management
import SchoolNewsManagement from './containers/03SCHOOL/04News/SchoolNewsManagement';
import SchoolNewNews from './containers/03SCHOOL/04News/SchoolNewNews';

// School Activity Management
import SchoolActivityManagement from '././containers/03SCHOOL/05Activity/SchoolActivityManagement';
import SchoolNewActivity from './containers/03SCHOOL/05Activity/SchoolNewActivity';

// School Resources Management
import SchoolResourcesManagement from './containers/03SCHOOL/06Resource/SchoolResourcesManagement';
import SchoolResourcesManagementCourse from './containers/03SCHOOL/06Resource/SchoolResourcesManagementCourse';
import SchoolResourcesManagementHomework from './containers/03SCHOOL/06Resource/SchoolResourcesManagementHomework';
import SchoolResourcesCourse from './containers/03SCHOOL/06Resource/SchoolResourcesCourse';
import SchoolResourcesHomework from './containers/03SCHOOL/06Resource/SchoolResourcesHomework';
import SchoolNewMaterial from './containers/03SCHOOL/06Resource/SchoolNewMaterial';
import SchoolNewHomework from './containers/03SCHOOL/06Resource/SchoolNewHomework';
import SchoolNewQuestion from './containers/03SCHOOL/06Resource/SchoolNewQuestion';

// School Alert
import SchoolAlert from './containers/03SCHOOL/07Alert/SchoolAlert';

// School SchoolReport
import SchoolReport from './containers/03SCHOOL/08Report/SchoolReport';

// School Account
import SchoolStaffRelatedCourse from './containers/03SCHOOL/09Account/SchoolStaffRelatedCourse';
import SchoolStaffAccountManagement from './containers/03SCHOOL/09Account/SchoolStaffAccountManagement';
import SchoolStaffNewAccount from './containers/03SCHOOL/09Account/SchoolStaffNewAccount';
import SchoolStaffAccountAccess from './containers/03SCHOOL/09Account/SchoolStaffAccountAccess';
import SchoolStaffAccountInformation from './containers/03SCHOOL/09Account/SchoolStaffAccountInformation';

// Notes
import SchoolNoteTaking from './containers/03SCHOOL/Notes/SchoolNoteTaking';
import SchoolNotesContent from './containers/03SCHOOL/Notes/SchoolNotesContent';
import SchoolNewNoteTitle from './containers/03SCHOOL/Notes/SchoolNewNoteTitle';
import SchoolNewNoteContent from './containers/03SCHOOL/Notes/SchoolNewNoteContent';

// Seating Plan
import SchoolSeatingPlan from './containers/03SCHOOL/01Course/SeatingPlan/SchoolSeatingPlan';

// 404
import PageNotFound from './containers/PageNotFound';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            debug: false
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

    getComponent = (currentURL, params) => {

        if (currentURL) {
            // console.log(params);

            switch (currentURL) {
                /*** GENERAL ***/
                // Home
                case 'home': {
                    return <Home />;
                }
                case 'home-images': {
                    return <HomeImages />;
                }

                // Login
                case 'login-with-register': {
                    return <LoginWithRegister />
                }
                case 'login-no-register': {
                    return <LoginNoRegister />
                }

                // Brand
                case 'school-introduction': {
                    return <SchoolIntroduction />
                }
                case 'school-advantage': {
                    return <SchoolAdvantage />
                }
                case 'school-learning': {
                    return <SchoolLearning />
                }
                case 'school-case': {
                    return <SchoolCase />
                }

                // Admission
                case 'admission-process': {
                    return <AdmissionProcess />;
                }
                case 'admission-subject-catalog': {
                    return <AdmissionSubjectCatalog />;
                }
                case 'admission-course-catalog': {
                    return <AdmissionCourseCatalog />;
                }
                case 'admission-course-information': {
                    return <AdmissionCourseInformation />;
                }

                // News
                case 'news': {
                    return <News />
                }
                case 'news-detail': {
                    return <NewsDetail />
                }

                // Activity
                case 'activity': {
                    return <Activity />
                }
                case 'activity-detail': {
                    return <ActivityDetail />
                }


                /*** STUDENT ***/
                // Student Register
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

                // Student Course
                case 'student-course-date': {
                    return <StudentCourseDate />
                }
                case 'student-course-information': {
                    return <StudentCourseInformation />
                }
                case 'student-course-announcement': {
                    return <StudentCourseAnnouncement />
                }

                // Student Scheduling
                case 'student-scheduling': {
                    return <StudentScheduling />;
                }

                // Student Enrollment
                case 'student-enrollment-history': {
                    return <StudentEnrollmentHistory />;
                }
                case 'student-enrollment-history-form': {
                    return <StudentEnrollmentHistoryForm />;
                }
                case 'student-enrollment-history-detail': {
                    return <StudentEnrollmentHistoryDetail />;
                }
                case 'student-enrollment-history-cancel-form': {
                    return <StudentEnrollmentHistoryCancelForm />;
                }
                case 'student-enrollment-history-cancel-request': {
                    return <StudentEnrollmentHistoryCancelRequest />;
                }
                case 'student-enrollment-history-cancelled': {
                    return <StudentEnrollmentHistoryCancelled />;
                }

                // Student Alert
                case 'student-alert': {
                    return <StudentAlert />;
                }


                /*** SCHOOL ***/
                // School Course Management  
                case 'school-all-course': {
                    return <SchoolAllCourse />;
                }
                case 'school-course-information': {
                    return <SchoolCourseInformation />
                }
                case 'school-course-preparations': {
                    return <SchoolCoursePreparations />;
                }
                case 'school-course-material': {
                    return <SchoolCourseMaterial />;
                }
                case 'school-course-work': {
                    return <SchoolCourseWork />;
                }
                case 'school-course-student-management': {
                    return <SchoolCourseStudentManagement />;
                }
                case 'school-course-student-management-attendance': {
                    return <SchoolCourseStudentManagementAttendance />;
                }
                case 'school-course-student-management-homework': {
                    return <SchoolCourseStudentManagementHomework />;
                }
                case 'school-course-announcement': {
                    return <SchoolCourseAnnouncement />
                }
                case 'school-course-q-and-a': {
                    return <SchoolCourseQandA />;
                }
                case 'school-course-reply-q-and-a': {
                    return <SchoolCourseReplyQandA />;
                }
                case 'school-course-notes': {
                    return <SchoolCourseNotes />;
                }
                case 'school-course-school-school-new-notes': {
                    return <SchoolCourseNewNotes />;
                }
                case 'school-course-assessment': {
                    return <SchoolCourseAssessment />;
                }

                // School Student Management
                case 'school-students-management': {
                    return <SchoolStudentsManagement />
                }
                case 'school-student-information': {
                    return <SchoolStudentInformation />
                }
                case 'school-student-related-courses': {
                    return <SchoolStudentRelatedCourses />
                }
                case 'school-new-student': {
                    return <SchoolNewStudent />;
                }

                // School Enrollment Management
                case 'school-enrollment-management': {
                    return <SchoolEnrollmentManagement />;
                }

                // School News Management
                case 'school-news-management': {
                    return <SchoolNewsManagement />;
                }
                case 'school-new-news': {
                    return <SchoolNewNews />;
                }

                // School activity Management
                case 'school-activity-management': {
                    return <SchoolActivityManagement />;
                }
                case 'school-new-activity': {
                    return <SchoolNewActivity />;
                }

                // School Resources Management
                case 'school-resources-management': {
                    return <SchoolResourcesManagement />;
                }
                case 'school-resources-management-course': {
                    return <SchoolResourcesManagementCourse />;
                }
                case 'school-resources-management-homework': {
                    return <SchoolResourcesManagementHomework />;
                }
                case 'school-resources-course': {
                    return <SchoolResourcesCourse />;
                }
                case 'school-resources-homework': {
                    return <SchoolResourcesHomework />;
                }
                case 'school-new-material': {
                    return <SchoolNewMaterial />;
                }
                case 'school-new-homework': {
                    return <SchoolNewHomework />;
                }
                case 'school-new-question': {
                    return <SchoolNewQuestion />;
                }

                // School Alert
                case 'school-alert': {
                    return <SchoolAlert />;
                }

                // School Reports
                case 'school-report': {
                    return <SchoolReport />;
                }

                // School Account
                case 'school-staff-related-course': {
                    return <SchoolStaffRelatedCourse />;
                }
                case 'school-staff-account-management': {
                    return <SchoolStaffAccountManagement />;
                }
                case 'school-staff-new-account': {
                    return <SchoolStaffNewAccount />
                }
                case 'school-staff-account-access': {
                    return <SchoolStaffAccountAccess />
                }
                case 'school-staff-account-information': {
                    return <SchoolStaffAccountInformation />
                }

                // Notes
                case 'school-note-taking': {
                    return <SchoolNoteTaking />;
                }
                case 'school-notes-content': {
                    return <SchoolNotesContent params={params} />;
                }
                case 'school-new-note': {
                    return <SchoolNewNoteTitle />
                }
                case 'school-new-note-content': {
                    return <SchoolNewNoteContent />
                }

                // Seating Plan
                case 'school-seating-plan': {
                    return <SchoolSeatingPlan />;
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

        let pathname = this.props.route.location.pathname,
            search = this.props.route.location.search,
            urlArray = pathname.split("/"),
            currentURL = urlArray[2],
            params = null;

        if (search !== "")
            params = querySearch(search);

        return (
            <div>
                <MobileMenu />

                <div id="wrap">
                    {(
                        (currentURL === '' || typeof currentURL === 'undefined')
                    ) &&
                        <HomePageTopBar />
                    }
                    <Header />

                    <div className="blackPlane"></div>

                    {this.getComponent(currentURL, params)}

                    {currentURL !== '' &&
                        <Footer />
                    }

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
