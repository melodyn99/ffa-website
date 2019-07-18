// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
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
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import { dateToDayAndMonth, dateToRemainingDaysEvent, dateToDayMonthYearTimeMinutes } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ToolBar from '../../../components/105ToolBars/General';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
// import data from '../../../data/03SCHOOL/01Course/SchoolCoursePreparation';

// Define column names
const rows = [
    { id: 'topic', numeric: false, disablePadding: false, label: '准备项目' },
    { id: 'deadline', numeric: true, disablePadding: false, label: '截止日期' },
    { id: 'status', numeric: true, disablePadding: false, label: '状态' },
    { id: 'operator', numeric: true, disablePadding: false, label: '操作人員' },
    { id: 'operation_date', numeric: true, disablePadding: false, label: '操作日期' },
];

class SchoolCoursePreparation extends React.Component {
    state = {
        // table settings
        order: 'asc',
        orderBy: 'deadline',
        selected: [],
        page: 0,
        rowsPerPage: 10,
        tempGoDetail: false,

        // component state
        // data: data,
        preparationList: [],
    };

    componentDidMount() {
        this._getConferencePreparations();
    }

    _getConferencePreparations = () => {
        // const { viewingSeminar } = this.props;

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            const convertedList = [];

            theList.map(n => {
                const convertedArray = {
                    event_preparation_id: n.event_preparation_id,
                    topic: n.name,
                    deadline: dateToDayAndMonth(n.target_date),
                    status: n.checked ? '已完成' : dateToRemainingDaysEvent(n.target_date),
                    operator: n.operator,
                    operation_date: n.operation_date ? dateToDayMonthYearTimeMinutes(n.operation_date) : '',
                }
                return convertedList.push(convertedArray);
            });

            this.setState({
                preparationList: convertedList,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            conference: this.props.auth.relatedData.conferenceId,
        }

        apiConferences.getConferencePreparations(params, this.props.auth.token, cb, eCb);
    }

    /** form handle input start **/
    handleEnterSelection = (event, id) => {
        console.log(`Clicked seatingPlan_id: ${id}`);
        // const { i18n } = this.props;
        // const seatingPlan_id = id;
        // const data = {
        //     ...this.props.auth.relatedData,
        //     "seatingPlan_id": seatingPlan_id,
        // }
        // this.props.setRelatedDataP(data);
        // this.props.history.push('/' + i18n.language + '/school-seating-plan');
    };

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
    /** form handle input end **/

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

    // _tempDetail = () => {
    //     this.setState({
    //         ...this.state,
    //         tempGoDetail: true
    //     })
    // }
    /** React components 'Material-UI' end  **/



    render() {
        const { classes, i18n } = this.props;
        const {
            // data,
            order, orderBy, selected, rowsPerPage, page } = this.state;
        const data = this.state.preparationList;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        // if (this.state.tempGoDetail) {
        //     return <Redirect push to={"/" + i18n.language + "/school-seating-plan"} />;
        // }

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
                                    backButton={false}
                                    backButtonText="返回"
                                    backButtonAction={this._backButtonAction}
                                    backButtonActionUrl='school-course-preparations'

                                    createButton={true}
                                    createButtonText="创建"
                                    createButtonAction={this._createButtonAction}
                                    createButtonActionUrl='new-school-course-preparations'

                                    editButton={true}
                                    editButtonText="编辑"
                                    editButtonAction={this._editButtonAction}

                                    deleteButton={true}
                                    deleteButtonText="删除"
                                    deleteButtonAction={this._deleteButtonAction}

                                    importButton={false}
                                    importButtonText="导入123"
                                    importButtonAction={this._importButtonAction}

                                    copyButton={false}
                                    copyButtonText="拷贝"
                                    copyButtonAction={this._copyButtonAction}

                                    reportButton={false}
                                    reportButtonText="学生报告"
                                    reportButtonAction={this._reportButtonAction}
                                />

                                <Link to={"/" + i18n.language + "/school-seating-plan"}>Go to Seating Plan</Link>
                                <div className="sep-20"></div>

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
                                                                onClick={event => this.handleEnterSelection(event, n.event_preparation_id)}
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
                                                                >{n.topic}</TableCell>
                                                                <TableCell>{n.deadline}</TableCell>
                                                                <TableCell>{n.status}</TableCell>
                                                                <TableCell>{n.operator}</TableCell>
                                                                <TableCell>{n.operation_date}</TableCell>
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

SchoolCoursePreparation.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCoursePreparation))));
