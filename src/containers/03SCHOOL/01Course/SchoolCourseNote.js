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
import { apiNoteTaking } from '../../../Api/ApiNoteTaking';

// Redux
import { connect } from 'react-redux';
import { setRelatedDataId, resetRelatedDataId } from '../../../Redux/Action/authAction';

// Utils
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import { dateToDayAndMonth } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ToolBar from '../../../components/105ToolBars/General';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
// import data from '../../../data/03SCHOOL/01Course/SchoolCourseNote';

// Define column names
const rows = [
    { id: 'note_name', numeric: false, disablePadding: false, label: '及时记录' },
    { id: 'fileCount', numeric: true, disablePadding: false, label: '文件' },
    { id: 'creator', numeric: true, disablePadding: false, label: '创建人员' },
    { id: 'lastmoddate', numeric: true, disablePadding: false, label: '最后修改日期' },
];

class SchoolCourseNote extends React.Component {
    state = {
        order: 'desc',
        orderBy: 'lastmoddate',
        selected: [],
        // data: data,
        page: 0,
        rowsPerPage: 10,
        noteList: [],
        // conferenceId: 'df299eea-5ab2-409e-b0f7-866f8de39e75',
        conferenceId: this.props.auth.relatedDataId.conferenceId,
    };

    /** form content start */
    componentDidMount() {
        this._getNoteTakingList();
    }

    _getNoteTakingList = () => {
        // const { viewingSeminar } = this.props;
        const { conferenceId } = this.state;

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            const convertedList = [];

            theList.map(n => {
                const convertedArray = {
                    noteId: n.note_id,
                    conference: n.conference,
                    note_name: n.name,
                    content: n.content,
                    fileCount: n.note_files.length,
                    createddate: dateToDayAndMonth(n.createddate),
                    lastmoddate: dateToDayAndMonth(n.lastmoddate),
                    creator: n.created_by,
                    editor: n.modified_by,
                }
                return convertedList.push(convertedArray);
            });

            this.setState({
                noteList: convertedList,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            //viewingSeminar ? viewingSeminar.conference_id : '',
            conference: conferenceId,
            // $orderby: 'lastmoddate DESC'
        }

        apiNoteTaking.getNoteTakingList(params, this.props.auth.token, cb, eCb);
    }

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
        // const { selected } = this.state;
        // const selectedIndex = selected.indexOf(id);
        // let newSelected = [];

        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, id);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1),
        //     );
        // }

        // this.setState({ selected: newSelected });

        const { i18n } = this.props;
        const note_id = id;
        const data = {
            ...this.props.auth.relatedDataId,
            "noteId": note_id,
        }
        this.props.setRelatedDataIdP(data);
        this.props.history.push('/' + i18n.language + '/school-note-taking');
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    // ToolBar
    _createButtonAction = () => {
        const { i18n } = this.props;
        this.props.resetRelatedDataIdP();
        this.props.history.push('/' + i18n.language + '/school-note-taking');
    }

    render() {
        const {
            classes,
            // , i18n
        } = this.props;
        const {
            // data,
            noteList, order, orderBy, selected, rowsPerPage, page } = this.state;
        const data = noteList;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        // console.log('SchoolCourseNote_render(): ' + JSON.stringify(noteList, null, 2));
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
                                    createButtonText="创建"
                                    createButtonAction={this._createButtonAction}
                                    createButtonActionUrl='school-note-taking'
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
                                                        return (
                                                            <TableRow
                                                                className={isSelected ? classes.selectedRow : classes.nthOfTypeRow}
                                                                hover
                                                                onClick={event => this.handleClick(event, n.noteId)}
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
                                                                >{n.note_name}</TableCell>
                                                                <TableCell>{n.fileCount}</TableCell>
                                                                <TableCell>{n.creator}</TableCell>
                                                                <TableCell>{n.lastmoddate}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 49 * emptyRows }}>
                                                        <TableCell colSpan={4} />
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

SchoolCourseNote.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    resetRelatedDataIdP: data => dispatch(resetRelatedDataId()),
    setRelatedDataIdP: data => dispatch(setRelatedDataId(data)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseNote))));
