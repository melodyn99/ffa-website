import React, { Component } from 'react';
// import {Redirect} from 'react-router'; hello
import './css/App.scss';
import { withTranslation } from 'react-i18next';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as AnimationsActionCreators from './actions/animations';

import querySearch from "stringquery";

import MobileMenu from './components/100Include/mobileMenu';
import Header from './components/100Include/header';
import Footer from './components/100Include/footer';

import * as HelperDesktopHandle from './utils/00JqueryControl/DesktopHandle';
import * as HelperMobileHandle from './utils/00JqueryControl/MobileHandle';
import * as HelperPopup from './utils/00JqueryControl/Popup';

// Home
import Home from './containers/00Home/Home';

// Course Management
import CourseManagement from './containers/01Course/CourseManagement';

// Student Management
import StudentManagement from './containers/02Student/StudentManagement';

// Enrollment Management
import EnrollmentManagement from './containers/03Enrollment/EnrollmentManagement';

// News Management
import NewsManagement from './containers/04News/NewsManagement';

// Activities Management
import ActivityManagement from './containers/05Activity/ActivityManagement';

// Resources Management
import ResourceManagement from './containers/06Resource/ReourceManagement';

// My Alerts
import MyAlert from './containers/07Alert/MyAlert';

// Report
import Report from './containers/08Report/Report';

// Notes
import NotesTaking from './containers/06Notes/NotesTaking';
import NotesContent from './containers/06Notes/NotesContent';
import NewNoteTitle from './containers/06Notes/NewNoteTitle';
import NewNoteContent from './containers/06Notes/NewNoteContent';

// Scheduling
import Scheduling from './containers/07Schedule/Scheduling';

// Seating Plan
import SeatingPlan from './containers/08SeatingPlan/SeatingPlan';

// 404
import PageNotFound from './containers/PageNotFound';

class App extends Component {

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
                case 'courses-management': {
                    return <CourseManagement />;
                }

                // Student
                case 'students-management': {
                    return <StudentManagement />;
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
                case 'resources-management': {
                    return <ResourceManagement />;
                }

                // My Alert
                case 'my-alerts': {
                    return <MyAlert />;
                }

                // Report
                case 'reports': {
                    return <Report />;
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
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    route: state.router
});

export default withTranslation()(connect(mapStateToProps)(App));
