import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import combineStyles from '../../utils/01MaterialJsStyles/combineStyles';
import { CommonStyles } from '../../utils/01MaterialJsStyles/common'
import { HeaderStyles } from '../../utils/01MaterialJsStyles/header'

import { Button } from '@material-ui/core';
import BreadCrumb from '../../components/100Include/breadcrumb'

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as FindParkingSpaceActionCreators from '../../actions/findParkingSpace';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formSubmitted: false
        }
    }

    componentDidMount = () => {
        // const storageData = JSON.parse(sessionStorage.getItem('state'));
        //console.log(storageData);

        // if (storageData) {
        //     this.setState(storageData)
        // }

        window.addEventListener("resize", this.windowResize);
    }

    componentDidUpdate = () => {
        // sessionStorage.setItem('state', JSON.stringify(this.state));
        // console.log(this.state);
    }

    windowResize = () => {
        var resizeTimer;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            // do something
        }, 100);
    }

    render() {
        // const { i18n } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">報名歷史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <Button className={this.props.classes.createButton}>Hello</Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const combinedStyles = combineStyles(CommonStyles, HeaderStyles);

export default withTranslation()(withStyles(combinedStyles)(Home));
