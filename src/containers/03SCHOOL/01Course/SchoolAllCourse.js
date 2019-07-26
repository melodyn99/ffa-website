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
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';
import { setRelatedCourseData } from '../../../Redux/Action/authAction';

// Utils
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import { dateToDayAndMonth } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolAllCourse';
import ToolBar from '../../../components/105ToolBars/General';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
// import data from '../../../data/03SCHOOL/01Course/SchoolAllCourse';

// Define column names
const rows = [
    { id: 'subject', numeric: false, disablePadding: false, label: '学科' },
    { id: 'course', numeric: true, disablePadding: false, label: '课程' },
    { id: 'teacher', numeric: true, disablePadding: false, label: '老师' },
    { id: 'location', numeric: true, disablePadding: false, label: '地点' },
    { id: 'start_date', numeric: true, disablePadding: false, label: '开课日期' },
];

class SchoolAllCourse extends React.Component {
    state = {
        // table settings
        order: 'asc',
        orderBy: 'subject',
        selected: [],
        page: 0,
        rowsPerPage: 10,

        // component state
        conferenceList: [],
    };

    componentDidMount() {
        this._getConferenceByUser();
    }

    _getConferenceByUser = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            const convertedList = [];

            // console.log("theList: " + JSON.stringify(theList,null,2));
            theList.map(n => {
                let theTeachers = '';
                theTeachers = n.teachers.map(name => {
                    return theTeachers = theTeachers + ", " + name
                });
                theTeachers = theTeachers.toString().substr(2);
                const convertedArray = {
                    conference: n.conference_id,
                    subject: n.subject,
                    subject_name: n.subject_name,
                    course: n.name,
                    teacher: theTeachers,
                    location: n.location,
                    start_date: dateToDayAndMonth(n.start_date),
                }
                return convertedList.push(convertedArray);
            });
            // console.log("convertedList: " + JSON.stringify(convertedList, null, 2));

            this.setState({
                conferenceList: convertedList,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        let params = {
            user_related: this.props.auth.userInfo.username,
            // $orderby: 'subject_name ASC',
        }

        apiConferences.getConferenceList(params, this.props.auth.token, cb, eCb);
    }

    /** form handle input start **/
    _createButtonAction = (url) => {
        const data = {
            ...this.props.auth.relatedData.course,
            conferenceId: '',
        }

        this.props.setRelatedCourseDataP(data);
        this.props.history.push(url);
    }

    handleEnterSelection = (event, conference_id, subject_id) => {
        const { i18n } = this.props;
        const data = {
            ...this.props.auth.relatedData.course,
            conferenceId: conference_id,
            subjectId: subject_id,
        }

        this.props.setRelatedCourseDataP(data);
        this.props.history.push('/' + i18n.language + '/school-course-information');
    };
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
            this.setState(state => ({ selected: state.conferenceList.map(n => n.id) }));
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
        const {
            classes,
            // i18n
        } = this.props;
        const { conferenceList, order, orderBy, selected, rowsPerPage, page } = this.state;

        const data = conferenceList;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        // console.log('data: ' + JSON.stringify(data, null, 2));

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">课程管理</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <ToolBar
                                    createButton={true}
                                    createButtonText="創建"
                                    createButtonAction={this._createButtonAction}
                                    createButtonActionUrl='school-course-information'
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
                                                    .filter(item => {
                                                        const searchSubject = this.props.searchSubject || null;
                                                        if (searchSubject) {
                                                            return item.subject_name === searchSubject;
                                                        } else
                                                            return true;
                                                    })
                                                    .sort(getSorting(order, orderBy))
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map(n => {
                                                        const theIndexNum = data.indexOf(n);
                                                        const isSelected = this.isSelected(theIndexNum);
                                                        return (
                                                            <TableRow
                                                                hover
                                                                onClick={event => this.handleEnterSelection(event, n.conference, n.subject)}
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
                                                                >{n.subject_name}</TableCell>
                                                                <TableCell>{n.course}</TableCell>
                                                                <TableCell>{n.teacher}</TableCell>
                                                                <TableCell>{n.location}</TableCell>
                                                                <TableCell>{n.start_date}</TableCell>
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

SchoolAllCourse.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    setRelatedCourseDataP: data => dispatch(setRelatedCourseData(data)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolAllCourse))));
