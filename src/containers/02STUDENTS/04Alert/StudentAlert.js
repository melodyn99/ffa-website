// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Material UI
import PropTypes from 'prop-types';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
// import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
// import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
// import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
import ListType2 from '../../../components/102Grids/ListType2';

function Block(props) {
    return (
        <ListType2
            id={props.id}
            name={props.name}
            sender={props.sender}
            date={props.date}
            delete={props.delete}
        />
    )
}

function Cluster(props) {
    let rows = [];
    for (let i = 0; i < 3; i++) {
        rows.push(
            <div className="verynarrow" key={i}>
                <Block
                    key={i}
                    id={props.id}
                    name={props.name}
                    sender={props.sender}
                    date={props.date}
                    delete={props.delete}
                />
            </div>
        )
    }
    return (rows);
}

class StudentAlert extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ['课程名称'],
            sender: ['发信人：提醒信息'],
            date: ['发送日期'],
            delete: ['清除'],
        }
    }

    render() {

        const { classes
            //, t, i18n 
        } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">我的提醒</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <Cluster
                                    name={this.state.name}
                                    sender={this.state.sender}
                                    date={this.state.date}
                                    delete={this.state.delete}
                                />
                            </div>
                        </div>

                        <div className="bottomControl clearfix">
                            <Button type="cancel" className={classes.blackButton}>清除所有</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StudentAlert.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    // loginP: data => dispatch(login(data)),
    // verifyT: token => dispatch(verifyToken(token)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(StudentAlert)));
