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
import SubMenu from '../../../components/104SubMenus/02STUDENTS/02Course/Course';
// import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
import ListType1 from '../../../components/102Grids/ListType1';

function Block(props) {
    return (
        <ListType1
            id={props.id}
            name={props.name}
            location={props.location}
            date={props.date}
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
                    id={i}
                    name={props.name}
                    location={props.location}
                    date={props.date}
                />
            </div>
        )
    }
    return (rows);
}

class StudentCourseDate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ['课程名称#1'],
            location: ['课程地点'],
            date: ['课程日期'],
        }
    }

    render() {

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">S1-001品牌盈利模式</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <Cluster
                                    name={this.state.name}
                                    location={this.state.location}
                                    date={this.state.date}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StudentCourseDate.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(StudentCourseDate)));
