import React, { Component } from 'react';
// import { Redirect } from 'react-router';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';

import { Button } from '@material-ui/core';

// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as FindParkingSpaceActionCreators from '../../actions/findParkingSpace';

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
            position: 'relative',
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
                <div className="wrapper-container">
                    <div className="containerMain">

                        <h2 className="pageTitle">報名歷史</h2>

                        <div className="content">
                            <Button className={this.props.classes.createButton}>Hello</Button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(withStyles(styles)(Home));