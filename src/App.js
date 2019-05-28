import React, { Component } from 'react';
// import {Redirect} from 'react-router';
import './css/App.scss';
import { withTranslation } from 'react-i18next';

// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as AnimationsActionCreators from './actions/animations';

import querySearch from "stringquery";

// import MobileMenu from './components/100Include/mobileMenu';
import Header from './components/100Include/header';
import Footer from './components/100Include/footer';

import Home from './containers/00Home/Home';
import PageNotFound from './containers/PageNotFound';

class App extends Component {

    componentDidMount = () => {
        window.addEventListener("resize", this.windowResize);
    }

    componentDidUpdate = () => {
        window.scrollTo(0, 0);
    }

    windowResize = () => {

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
                    return <PageNotFound />;
                }
            }
        } else {
            return <Home />
        }
    }

    render() {
        console.log(this.props.route.location.pathname);

        return (
            <div>
                {/* <MobileMenu /> */}

                <div id="wrap">
                    <Header />

                    {/* <div className="blackPlane"></div> */}

                    {this.renderSwitch(this.props.route)}

                    <Footer />
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

export default withTranslation()(connect(mapStateToProps)(App));
