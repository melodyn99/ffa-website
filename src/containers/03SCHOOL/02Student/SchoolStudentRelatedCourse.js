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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
// import InputBase from "@material-ui/core/InputBase";
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
import SubMenu from '../../../components/104SubMenus/03SCHOOL/02Student/SchoolStudent';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
import data from '../../../data/03SCHOOL/02Student/SchoolStudentRelatedCourse';

// Define column names
const rows = [
    { id: 'semester', numeric: false, disablePadding: false, label: '学期' },
    { id: 'subject', numeric: true, disablePadding: false, label: '学科名称' },
    { id: 'courseType', numeric: true, disablePadding: false, label: '课程类型' },
    { id: 'courseCode', numeric: true, disablePadding: false, label: '课程编号' },
    { id: 'courseName', numeric: true, disablePadding: false, label: '课程名称' },
    { id: 'fees', numeric: true, disablePadding: false, label: '学费' },
    { id: 'actualFees', numeric: true, disablePadding: false, label: '实际收费' },
    { id: 'credits', numeric: true, disablePadding: false, label: '学分' },
    { id: 'grade', numeric: true, disablePadding: false, label: '成绩' },
    { id: 'status', numeric: true, disablePadding: false, label: '状态' },
];

class SchoolStudentRelatedCourse extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: data,
        page: 0,
        rowsPerPage: 10,

        //edit actualFees
        isTheEditingItem: -1,
        isEnableEditActualFees: true,
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

    handleChangeActualFees = event => {
        console.log(event.target.value);
        this.setState({ isTheEditingItem: -1, isEnableEditActualFees: true });
    }
    editActualFees = (selectedNum) => {
        this.setState({ isTheEditingItem: selectedNum, isEnableEditActualFees: false });
    }

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page, isTheEditingItem, isEnableEditActualFees } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">学生管理</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

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
                                                        const theIndexNum = data.indexOf(n);
                                                        const isSelected = this.isSelected(theIndexNum);
                                                        return (
                                                            <TableRow
                                                                hover
                                                                onClick={event => this.handleClick(event, theIndexNum)}
                                                                role="checkbox"
                                                                aria-checked={isSelected}
                                                                tabIndex={-1}
                                                                key={theIndexNum}
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
                                                                <TableCell>
                                                                    {isTheEditingItem === theIndexNum ?
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                autoFocus={true}
                                                                                placeholder="Can not be null"
                                                                                value={n.actualFees}
                                                                                // onMouseLeave={(event)=>this.handleChangeActualFees(event)}
                                                                                onBlur={(event) => this.handleChangeActualFees(event)}
                                                                            />
                                                                        </div>
                                                                        :
                                                                        <div onDoubleClick={
                                                                            isEnableEditActualFees ?
                                                                                () => this.editActualFees(theIndexNum) :
                                                                                null}>
                                                                            {n.actualFees}
                                                                        </div>
                                                                    }
                                                                </TableCell>
                                                                <TableCell>{n.credits}</TableCell>
                                                                <TableCell>{n.grade}</TableCell>
                                                                <TableCell>{n.status}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 49 * emptyRows }}>
                                                        <TableCell colSpan={10} />
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

SchoolStudentRelatedCourse.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(SchoolStudentRelatedCourse)));
