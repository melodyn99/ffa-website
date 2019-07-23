// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Material UI
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
// import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
import data from '../../../data/02STUDENTS/03Enrollment/StudentEnrollmentHistory';

// Define column names
const rows = [
    { id: 'semester', numeric: false, disablePadding: false, label: '学期' },
    { id: 'subject', numeric: true, disablePadding: false, label: '学科名称' },
    { id: 'courseType', numeric: true, disablePadding: false, label: '课程类型' },
    { id: 'courseCode', numeric: true, disablePadding: false, label: '课程编号' },
    { id: 'courseName', numeric: true, disablePadding: false, label: '课程名称' },
    { id: 'fees', numeric: true, disablePadding: false, label: '学费' },
    { id: 'credits', numeric: true, disablePadding: false, label: '学分' },
    { id: 'grade', numeric: true, disablePadding: false, label: '成绩' },
    { id: 'status', numeric: true, disablePadding: false, label: '状态' },
];

class StudentEnrollmentHistory extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: data,
        page: 0,
        rowsPerPage: 10,
        tempGoDetail: false
    };

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

    _tempDetail = () => {
        this.setState({
            ...this.state,
            tempGoDetail: true
        });
    }

    render() {
        const { classes, i18n } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        if (this.state.tempGoDetail) {
            return <Redirect push to={"/" + i18n.language + "/student-enrollment-history-form"} />;
        }
        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">报名历史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
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
                                                                onClick={() => this._tempDetail()}
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
                                                                >{n.semester}</TableCell>
                                                                <TableCell>{n.subject}</TableCell>
                                                                <TableCell>{n.courseType}</TableCell>
                                                                <TableCell>{n.courseCode}</TableCell>
                                                                <TableCell>{n.courseName}</TableCell>
                                                                <TableCell>{n.fees}</TableCell>
                                                                <TableCell>{n.credits}</TableCell>
                                                                <TableCell>{n.grade}</TableCell>
                                                                <TableCell>{n.status}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 49 * emptyRows }}>
                                                        <TableCell colSpan={9} />
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
                                <div className="bottomControl clearfix">
                                    <span className="right"><Button className={classes.blackButton}
                                        onClick={() => this.props.history.push('student-enrollment-history-form')}
                                    >报名 (click)</Button></span>
                                    {/* <span className="right"><Button type="submit" className={classes.editButton}>編輯</Button></span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StudentEnrollmentHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(StudentEnrollmentHistory))));
