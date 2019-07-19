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
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';
import { setRelatedData } from '../../../Redux/Action/authAction';

// Utils
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import { dateToDayMonthYear } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ToolBar from '../../../components/105ToolBars/General';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
// import data from '../../../data/03SCHOOL/01Course/SchoolCourseAssessment';

// Define column names
const rows = [
    { id: 'student', numeric: false, disablePadding: false, label: '学生' },
    { id: 'teacher_assess', numeric: true, disablePadding: false, label: '讲师评价' },
    { id: 'material_assess', numeric: true, disablePadding: false, label: '资料评价' },
    { id: 'assessment', numeric: true, disablePadding: false, label: '综合评价' },
    { id: 'other', numeric: true, disablePadding: false, label: '其他意见' },
    { id: 'date', numeric: true, disablePadding: false, label: '创建日期' },
];

class SchoolCourseAssessment extends React.Component {
    state = {
        // table settings
        order: 'desc',
        orderBy: 'date',
        selected: [],
        page: 0,
        rowsPerPage: 10,

        // component state
        // data: data,
        assessmentList: [],
    };

    componentDidMount() {
        this._getConferenceAssessment();
    }

    _getConferenceAssessment = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            let convertedList = [];

            theList.map(n => {
                const convertedArray = {
                    end_conference_score_id: n.end_conference_score_id,
                    student: n.user.display_name,
                    teacher_assess: n.tutor_score,
                    material_assess: n.material_scrore,
                    assessment: n.general_scrore,
                    other: n.comment,
                    date: dateToDayMonthYear(n.createddate)
                }
                return convertedList.push(convertedArray);
            });

            this.setState({
                assessmentList: convertedList,
            });
            // console.log(this.state.assessmentList);
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            conference: this.props.auth.relatedData.conferenceId,
            $expand: 'user',
        }
        apiConferences.getConferenceAssessment(params, this.props.auth.token, cb, eCb);
    }

    /** form handle input start **/
    handleEnterSelection = (event, id) => {
        // console.log(id);
        const { i18n } = this.props;
        const theList = this.state.assessmentList.find(n => {
            return n.end_conference_score_id === id;
        });
        console.log(theList);
        const data = {
            ...this.props.auth.relatedData,
            selectedCourseAssessment: theList,
        }
        this.props.setRelatedDataP(data);
        this.props.history.push('/' + i18n.language + '/school-course-assessment-detail');
    };

    checkIsNeedEllipsis = (msg) => {
        let checkedMsg = msg;
        checkedMsg = msg.length >= 100 ? checkedMsg.substring(0, 97) + "..." : checkedMsg;
        return checkedMsg;
    }

    // ToolBar
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
    /** React components 'Material-UI' end  **/

    render() {
        const { classes } = this.props;
        const {
            // data,
            order, orderBy, selected, rowsPerPage, page } = this.state;
        const data = this.state.assessmentList;
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
                                    reportButton={true}
                                    reportButtonText="评分报告"
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
                                                        const theIndexNum = data.indexOf(n);
                                                        const isSelected = this.isSelected(theIndexNum);
                                                        const other = this.checkIsNeedEllipsis(n.other);
                                                        return (
                                                            <TableRow
                                                                hover
                                                                onClick={event => this.handleEnterSelection(event, n.end_conference_score_id)}
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
                                                                >{n.student}</TableCell>
                                                                <TableCell>{n.teacher_assess}</TableCell>
                                                                <TableCell>{n.material_assess}</TableCell>
                                                                <TableCell>{n.assessment}</TableCell>
                                                                <TableCell>{other}</TableCell>
                                                                <TableCell>{n.date}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 49 * emptyRows }}>
                                                        <TableCell colSpan={6} />
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

SchoolCourseAssessment.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    setRelatedDataP: data => dispatch(setRelatedData(data)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseAssessment))));
