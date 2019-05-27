import React, { Component } from 'react';
// import {Redirect} from 'react-router';
import './css/App.scss';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as AnimationsActionCreators from './actions/animations';

import querySearch from "stringquery";

// import MobileMenu from './components/100Include/mobileMenu';
// import Header from './components/100Include/header';
// import Footer from './components/100Include/footer';

import * as HelperDesktopHandle from './utils/00General/DesktopHandle';
import * as HelperMobileHandle from './utils/00General/MobileHandle';
import * as HelperPopup from './utils/00General/Popup';

import Home from './containers/00Home/Home';
// import PageNotFound from './containers/PageNotFound';

import {
    Button
} from '@material-ui/core';

const styles = theme => ({
    root: {
        [theme.breakpoints.up('md')]: {
            width: '700px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        marginBottom: '70px',
    },
    requiredField: {
        color: 'red',
    },
    createButton: {
        [theme.breakpoints.up('md')]: {
            borderRadius: '10px',
            display: 'block',
            margin: '0 auto',
            marginTop: '10px',
            marginBottom: '10px',
            width: '360px',
        },
        [theme.breakpoints.down('sm')]: {
            borderRadius: '0px',
            bottom: '0px',
            position: 'fixed',
            width: '100%',
            height: '60px',
            fontSize: '20px',
        },
        backgroundColor: theme.palette.secondary.main,
        color: 'white',
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
        },
    },
});

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

            switch (component) {
                case 'home': {
                    return <Home />;
                }

                default: {
                    return <Home />;
                }
            }
        } else {
            return <Home />
        }
    }

    render() {

        // const {
        //     route,
        //     // animations
        // } = this.props;
        // console.log(route.location.pathname);

        return (
            <div>
                {/* <MobileMenu /> */}

                <div id="wrap">
                    {/* <Header /> */}

                    <div className="blackPlane"></div>

                    <Button className={this.props.classes.createButton}>Hello</Button>

                    {/* <Footer /> */}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => (
    {
        route: state.router
    }
);

export default withTranslation()(connect(mapStateToProps)(withStyles(styles)(App)));
