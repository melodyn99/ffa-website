// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

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
import SubMenu from '../../../components/104SubMenus/03SCHOOL/09Account/SchoolAccountManagement';
import ToolBar from '../../../components/105ToolBars/General';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
import data from '../../../data/03SCHOOL/09Account/SchoolAccountManagement';

// Define column names
const rows = [
    { id: 'account', numeric: false, disablePadding: false, label: '账户' },
    { id: 'type', numeric: true, disablePadding: false, label: '类型' },
    { id: 'relatedcourses', numeric: true, disablePadding: false, label: '相关课程' },
    { id: 'status', numeric: true, disablePadding: false, label: '状态' },
    { id: 'date', numeric: true, disablePadding: false, label: '创建日期' },
];

class EnrollmentHistory extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: data,
        page: 0,
        rowsPerPage: 10,
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

    // ToolBar
    _backButtonAction = (url) => {
        this.props.history.push(url);
    }

    _createButtonAction = (url) => {
        this.props.history.push(url);
    }

    _editButtonAction = () => {
        console.log('edit button pressed');
    }

    _deleteButtonAction = () => {
        console.log('delete button pressed');
    }

    _importButtonAction = () => {
        console.log('import button pressed');
    }

    _copyButtonAction = () => {
        console.log('copy button pressed');
    }

    _reportButtonAction = () => {
        console.log('report button pressed');
    }

    render() {
        const { classes } = this.props;
        const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">账户管理</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <ToolBar
                                    backButton={false}
                                    backButtonText="返回"
                                    backButtonAction={this._backButtonAction}
                                    backButtonActionUrl='school-course-materials'

                                    createButton={true}
                                    createButtonText="创建"
                                    createButtonAction={this._createButtonAction}
                                    createButtonActionUrl='school-new-account'

                                    editButton={true}
                                    editButtonText="编辑"
                                    editButtonAction={this._editButtonAction}

                                    deleteButton={false}
                                    deleteButtonText="删除"
                                    deleteButtonAction={this._deleteButtonAction}

                                    importButton={false}
                                    importButtonText="导入csv"
                                    importButtonAction={this._importButtonAction}

                                    copyButton={false}
                                    copyButtonText="拷贝"
                                    copyButtonAction={this._copyButtonAction}

                                    reportButton={false}
                                    reportButtonText="报名报告"
                                    reportButtonAction={this._reportButtonAction}
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
                                                                onClick={event => this.handleClick(event, n.id)}
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
                                                                >{n.account}</TableCell>
                                                                <TableCell>{n.type}</TableCell>
                                                                <TableCell>{n.relatedcourses}</TableCell>
                                                                <TableCell>{n.status}</TableCell>
                                                                <TableCell>{n.date}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 49 * emptyRows }}>
                                                        <TableCell colSpan={5} />
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

EnrollmentHistory.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(EnrollmentHistory))));