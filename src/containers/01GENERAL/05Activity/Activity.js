// Essential for all components
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
// import { Button } from '@material-ui/core';

// Material UI
import Grid from '@material-ui/core/Grid';

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
// import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import ListType3 from '../../../components/102Grids/ListType3';

function Block(props) {
    return (
        <ListType3
            title={props.title}
            date={props.date}
            content={props.content}
        />
    )
}

function Cluster(props) {
    let rows = [];
    for (let i = 0; i < 3; i++) {
        rows.push(
            <div key={i}>
                <Block
                    key={i}
                    title={props.title}
                    date={props.date}
                    content={props.content}
                />
                <div className="sep-40"></div>
            </div>
        )
    }
    return (rows);
}

class Activity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formSubmitted: false,
            title: ['活动标题'],
            date: ['发出日期'],
            content: ['活动内容第1行'],
        }
    }

    render() {
        const { i18n,
            //classes 
        } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">学院相关的活动</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <Grid container spacing={16}>
                                    <Grid item sm={3} xs={12}>
                                        <div className="leftColumn">
                                            <img src={require('../../../images/600-400.png')} alt="" />
                                            <Link to={"/" + i18n.language + "/activity-detail"} className="dummy">Go to Activity Detail page</Link>
                                        </div>
                                    </Grid>
                                    <Grid item sm={9} xs={12}>
                                        <div className="rightColumn">
                                            <Cluster
                                                title={this.state.title}
                                                date={this.state.date}
                                                content={this.state.content}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    // loginP: data => dispatch(login(data)),
    // verifyT: token => dispatch(verifyToken(token)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(Activity)));
