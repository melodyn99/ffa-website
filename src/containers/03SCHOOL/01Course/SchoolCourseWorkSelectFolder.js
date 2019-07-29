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
import Checkbox from '@material-ui/core/Checkbox';
import { Button } from '@material-ui/core';

// Api
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';
import { setRelatedCourseData } from '../../../Redux/Action/authAction';

// Utils
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import { dateToDayAndMonth, dayMonthYearTimeToTimeStamps, getTheMonentToRange } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
// import ToolBar from '../../../components/105ToolBars/General';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
// import data from '../../../data/03SCHOOL/01Course/SchoolCourseWorkSelectFolder';

// Define column names
const rows = [
    { id: '', numeric: true, disablePadding: false, label: '' },
    { id: 'library_assignment', numeric: false, disablePadding: false, label: '作业材料库' },
    { id: 'subject_name', numeric: true, disablePadding: false, label: '学科' },
    { id: 'question_type', numeric: true, disablePadding: false, label: '问题类型' },
    { id: 'questions_count', numeric: true, disablePadding: false, label: '问题数量' },
    { id: 'created_by', numeric: true, disablePadding: false, label: '创建人员' },
    { id: 'lastmoddate', numeric: true, disablePadding: false, label: '最后修改日期' },
    { id: 'deadline', numeric: false, disablePadding: false, label: '输入截止日期' },
];

class SchoolCourseWorkSelectFolder extends React.Component {
    state = {
        // table settings
        order: 'desc',
        orderBy: 'lastmoddate',
        selected: [],
        page: 0,
        rowsPerPage: 10,

        // component state
        // data: data,
        library_assignmentList: [],
        isTheEditingItem: -1,
        isEnableEditDeadline: true,
    };

    componentDidMount() {
        this._getConferenceAssignmentList();

        // console.log("distanceDateToTimeStamps");
        // console.log(dayMonthYearTimeToTimeStamps('2019-07-29 20:00'));
    }

    _getConferenceAssignmentList = () => {
        // const { viewingSeminar } = this.props;

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            this._getLibrariesAssignments(theList);
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            conference: this.props.auth.relatedData.course.conferenceId,
            "assignment/subject": this.props.auth.relatedData.course.subjectId,
            // $expand: 'assignment',
        }

        apiConferences.getConferenceAssignment(params, this.props.auth.token, cb, eCb);
    }

    _getLibrariesAssignments = (conferenceAssignmentList) => {
        // const { viewingSeminar } = this.props;

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            // console.log("theList");
            // console.log(theList);

            //find selected item List
            let selectedItemList = [];
            conferenceAssignmentList.map(n => {
                const isSelected = theList.find(i => i.assignment_id === n.assignment);
                selectedItemList.push(isSelected);
                return null;
            });

            // console.log("selectedItemList");
            // console.log(selectedItemList);
            //find unselected item List
            let unselectedItemList = [];
            theList.map(n => {
                let isUnselect = true;
                selectedItemList.map(i => {
                    if (i.assignment_id === n.assignment_id) {
                        return isUnselect = false;
                    }
                    return null;
                });
                if (isUnselect) {
                    return unselectedItemList.push(n);
                } else
                    return null;
            })


            const convertedList = [];
            unselectedItemList.map(n => {
                const convertedArray = {
                    assignment_id: n.assignment_id,
                    library_assignment: n.title,
                    subject_name: n.subject.name,
                    question_type: n.question_type,
                    questions_count: n.assignment_questions.length || 0,
                    created_by: n.created_by,
                    lastmoddate: dateToDayAndMonth(n.lastmoddate),
                    deadline: getTheMonentToRange(),
                }
                return convertedList.push(convertedArray);
            });

            this.setState({
                library_assignmentList: convertedList,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            "subject": this.props.auth.relatedData.course.subjectId,
            $expand: 'subject,assignment_questions',
        }

        apiConferences.getLibrariesAssignments(params, this.props.auth.token, cb, eCb);
    }

    /** form handle input start **/
    //post
    _createClassAssignment = () => {
        const { library_assignmentList } = this.state;
        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.props.history.goBack();
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        let body = [];

        if (this.state.selected) {
            this.state.selected.map(n => {
                const theLink = {
                    conference: this.props.auth.relatedData.course.conferenceId,
                    assignment: library_assignmentList[n].assignment_id,
                    name: library_assignmentList[n].library_assignment,
                    deadline: dayMonthYearTimeToTimeStamps(library_assignmentList[n].deadline),
                }
                return body.push(theLink);
            });
            // console.log(body);
            apiConferences.createConferenceAssignment(body, this.props.auth.token, cb, eCb);
        } else {
            console.log('Selection is empty, select one item or more please!');
        }
    }

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

    submitChangeDeadline = (value, indexNum) => {
        console.log("Enter: " + value);
        console.log(this.state.library_assignmentList[indexNum]);
        const theList = [];
        this.state.library_assignmentList.map((n, i) => {
            let deadline = n.deadline;
            if (i === indexNum) {
                deadline = value;
            }
            const array = {
                assignment_id: n.assignment_id,
                library_assignment: n.library_assignment,
                subject_name: n.subject_name,
                question_type: n.question_type,
                questions_count: n.questions_count,
                created_by: n.created_by,
                lastmoddate: n.lastmoddate,
                deadline: deadline,
            }
            return theList.push(array);
        });

        this.setState({
            library_assignmentList: theList,
            isTheEditingItem: -1,
            isEnableEditDeadline: true,
        });
    }
    editDeadline = (selectedNum) => {
        this.setState({ isTheEditingItem: selectedNum, isEnableEditDeadline: false });
    }
    /** React components 'Material-UI' end  **/

    render() {
        const { classes } = this.props;
        const {
            // data,
            isTheEditingItem, isEnableEditDeadline, library_assignmentList,
            order, orderBy, selected, rowsPerPage, page } = this.state;
        const data = library_assignmentList;
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
                                                                // className={isSelected ? classes.selectedRow : classes.nthOfTypeRow}
                                                                hover
                                                                // onClick={event => this.handleClick(event, theIndexNum)}
                                                                role="checkbox"
                                                                aria-checked={isSelected}
                                                                tabIndex={-1}
                                                                key={theIndexNum}
                                                                selected={isSelected}
                                                            >
                                                                <TableCell padding="checkbox" onClick={event => this.handleClick(event, theIndexNum)}>
                                                                    <Checkbox checked={isSelected} />
                                                                </TableCell>
                                                                <TableCell component="th" scope="row"
                                                                // padding="none"
                                                                >{n.library_assignment}</TableCell>
                                                                <TableCell>{n.subject_name}</TableCell>
                                                                <TableCell>{n.question_type}</TableCell>
                                                                <TableCell>{n.questions_count}</TableCell>
                                                                <TableCell>{n.created_by}</TableCell>
                                                                <TableCell>{n.lastmoddate}</TableCell>
                                                                <TableCell>
                                                                    {isTheEditingItem === theIndexNum ?
                                                                        <div>
                                                                            <input
                                                                                type="text"
                                                                                autoFocus={true}
                                                                                placeholder="YYYY-MM-DD HH:mm"
                                                                                defaultValue={n.deadline}
                                                                                onBlur={event => this.submitChangeDeadline(event.target.value, theIndexNum)}
                                                                            />
                                                                        </div>
                                                                        :
                                                                        <div onDoubleClick={
                                                                            isEnableEditDeadline ?
                                                                                () => this.editDeadline(theIndexNum) :
                                                                                null}>
                                                                            {n.deadline}
                                                                        </div>
                                                                    }
                                                                </TableCell>
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
                                <div className="bottomControl clearfix">
                                    <Button className={classes.greyButton}
                                        onClick={() => this.props.history.push('school-course-work')}
                                    >返回</Button>
                                    <span className="right"><Button onClick={() => this._createClassAssignment()} className={classes.blackButton}>加入作業</Button></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchoolCourseWorkSelectFolder.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

    setRelatedCourseDataP: data => dispatch(setRelatedCourseData(data)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseWorkSelectFolder))));
