// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common';
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';

// Api
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import { dateToDayAndMonth } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ToolBar from '../../../components/105ToolBars/General';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
// import data from '../../../data/03SCHOOL/01Course/SchoolCourseStudentManagement';

// Define column names
const rows = [
    { id: 'student', numeric: false, disablePadding: false, label: '学生' },
    { id: 'fee', numeric: true, disablePadding: false, label: '学费' },
    { id: 'actualfee', numeric: true, disablePadding: false, label: '实际收费' },
    { id: 'status', numeric: true, disablePadding: false, label: '状态' },
    { id: 'attendance', numeric: true, disablePadding: false, label: '点名' },
    { id: 'homework', numeric: true, disablePadding: false, label: '作业' },
    { id: 'score', numeric: true, disablePadding: false, label: '总分数' },
    { id: 'date', numeric: true, disablePadding: false, label: '添加日期' },
];

class SchoolCourseStudentManagement extends React.Component {
    state = {
        // table settings
        order: 'desc',
        orderBy: 'date',
        selected: [],
        page: 0,
        rowsPerPage: 10,

        // component state
        // data: data,
        data: []
    };

    componentDidMount = () => {
        this._getSubmittedStudentEnrollmentsByConferenceId();
    }

    _getSubmittedStudentEnrollmentsByConferenceId = () => {
        const cb = (obj) => {
            console.log("cb1 : ", obj);

            const theList = obj.body;
            const convertedList = [];

            theList.map(n => {
                const convertedArray = {
                    id: n.enrollment_id,
                    student: n.student,
                    fee: n.fee,
                    actualfee: n.actual_received,
                    status: n.status,

                    num_of_sections: n.num_of_sections,
                    num_of_attendances: n.num_of_attendances,

                    num_of_assignments: n.num_of_assignments,
                    num_of_sunmitted_assignments: n.num_of_sunmitted_assignments,

                    score: n.score,
                    lastmoddate: dateToDayAndMonth(n.lastmoddate)
                }
                return convertedList.push(convertedArray);
            });

            this.setState({
                data: convertedList,
            });
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            'conference': '34fe4326-cadd-476d-8444-4f0255cb4d01',
            // 'state': null
        }

        apiConferences.getSubmittedStudentEnrollmentsByConferenceId(params, this.props.auth.token, cb, eCb);
    }

    // ToolBar
    _createButtonAction = (url) => {
        this.props.history.push(url);
    }

    _goToDetail = (url) => {
        this.props.history.push(url);
    }

    /** React components 'Material-UI' start  **/
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;
    /** React components 'Material-UI' end  **/

    render() {
        const { classes
            //, i18n 
        } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">S1-001品牌盈利模式</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">

                                <ToolBar
                                    createButton={true}
                                    createButtonText="添加"
                                    createButtonAction={this._createButtonAction}
                                    createButtonActionUrl='school-course-student-management-select-student'
                                />

                                <Paper className={classes.paper}>
                                    <div className={classes.tableWrapper}>
                                        <Table className={classes.table} aria-labelledby="tableTitle">
                                            <EnhancedTableHead
                                                numSelected={selected.length}
                                                order={order}
                                                orderBy={orderBy}
                                                onSelectAllClick={this.handleSelectAllClick}
                                                onRequestSort={this.handleRequestSort}
                                                rowCount={data.length}
                                                rows={rows}
                                            />
                                            <TableBody>
                                                {data
                                                    .sort(getSorting(order, orderBy))
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map(n => {
                                                        const isSelected = this.isSelected(n.id);
                                                        return (
                                                            <TableRow
                                                                hover
                                                                // onClick={event => this.handleClick(event, n.id)}
                                                                role="checkbox"
                                                                aria-checked={isSelected}
                                                                tabIndex={-1}
                                                                key={n.id}
                                                                selected={isSelected}
                                                            >
                                                                {/* <TableCell padding="checkbox">
                                                                    <Checkbox checked={isSelected} />
                                                                </TableCell> */}
                                                                <TableCell component="th" scope="row"
                                                                // padding="none"
                                                                >{n.student}</TableCell>
                                                                <TableCell>{n.fee}</TableCell>
                                                                <TableCell>{n.actualfee}</TableCell>
                                                                <TableCell>{n.status}</TableCell>
                                                                <TableCell
                                                                    onClick={() => this._goToDetail('school-course-student-management-attendance')}
                                                                >
                                                                    <span className="color-blue">({n.num_of_attendances}/{n.num_of_sections})</span>
                                                                </TableCell>
                                                                <TableCell
                                                                    onClick={() => this._goToDetail('school-course-student-management-homework')}
                                                                >
                                                                    <span className="color-blue">({n.num_of_assignments}/{n.num_of_sunmitted_assignments})</span>
                                                                </TableCell>
                                                                <TableCell>{n.score}</TableCell>
                                                                <TableCell>{n.lastmoddate}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 49 * emptyRows }}>
                                                        <TableCell colSpan={8} />
                                                    </TableRow>
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <TablePagination
                                        component="div"
                                        count={data.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        backIconButtonProps={{
                                            'aria-label': 'Previous Page',
                                        }}
                                        nextIconButtonProps={{
                                            'aria-label': 'Next Page',
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchoolCourseStudentManagement.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseStudentManagement))));
