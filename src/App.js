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
import Home from './containers/01GENERAL/00Home/Home';

/*** STUDENT ***/

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
import CourseQandA from './containers/03SCHOOL/01Course/CourseQandA';
import CourseNotes from './containers/03SCHOOL/01Course/CourseNotes';
import CourseAssessment from './containers/03SCHOOL/01Course/CourseAssessment';

// Student Management
// import StudentManagement from './containers/02Student/StudentManagement';
import NewStudent from './containers/03SCHOOL/02Student/NewStudent';

// Enrollment Management
import EnrollmentManagement from './containers/03SCHOOL/03Enrollment/EnrollmentManagement';

// News Management
import NewsManagement from './containers/03SCHOOL/04News/NewsManagement';

// Activities Management
import ActivityManagement from './containers/03SCHOOL/05Activity/ActivityManagement';

// Resources Management
import ResourceManagementCourse from './containers/03SCHOOL/06Resource/ResourceManagementCourse';
import ResourceManagementHomework from './containers/03SCHOOL/06Resource/ResourceManagementHomework';

// My Alerts
import MyAlert from './containers/03SCHOOL/07Alert/MyAlert';

// Report
import Report from './containers/03SCHOOL/08Report/Report';

// Account
import RelatedCourses from './containers/03SCHOOL/09Account/RelatedCourses';
import EnrollmentHistory from './containers/03SCHOOL/09Account/EnrollmentHistory';
import NewAccount from './containers/03SCHOOL/09Account/NewAccount';


// Notes
import NotesTaking from './containers/03SCHOOL/09Notes/NotesTaking';
import NotesContent from './containers/03SCHOOL/09Notes/NotesContent';
import NewNoteTitle from './containers/03SCHOOL/09Notes/NewNoteTitle';
import NewNoteContent from './containers/03SCHOOL/09Notes/NewNoteContent';

// Scheduling
import Scheduling from './containers/02STUDENTS/10Schedule/Scheduling';

// Seating Plan
import SeatingPlan from './containers/03SCHOOL/01Course/11SeatingPlan/SeatingPlan';

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
                case 'home': {
                    return <Home />;
                }

                // Course
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
                case 'course-q-and-a': {
                    return <CourseQandA />;
                }
                case 'course-notes': {
                    return <CourseNotes />;
                }
                case 'course-assessment': {
                    return <CourseAssessment />;
                }


                // Student
                case 'new-student': {
                    return <NewStudent />;
                }


                // Enrollment
                case 'enrollment-management': {
                    return <EnrollmentManagement />;
                }

                // News
                case 'news-management': {
                    return <NewsManagement />;
                }

                // Activities
                case 'activities-management': {
                    return <ActivityManagement />;
                }

                // Resources
                case 'resources-management-course': {
                    return <ResourceManagementCourse />;
                }
                case 'resources-management-homework': {
                    return <ResourceManagementHomework />;
                }

                // My Alert
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

                // Scheduling
                case 'scheduling': {
                    return <Scheduling />;
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
