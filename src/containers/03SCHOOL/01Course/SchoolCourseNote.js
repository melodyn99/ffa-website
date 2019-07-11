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
import { apiNoteTaking } from '../../../Api/ApiNoteTaking';

// Redux
import { connect } from 'react-redux';
import { setRelatedDataId } from '../../../Redux/Action/authAction';

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
    { id: 'notes', numeric: false, disablePadding: false, label: '及时记录' },
    { id: 'file', numeric: true, disablePadding: false, label: '文件' },
    { id: 'lastedit', numeric: true, disablePadding: false, label: '最后修改日期' },
];

class SchoolCourseNote extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        // data: data,
        page: 0,
        rowsPerPage: 10,
        noteList: [],
        // conferenceId: '81aac731-9a38-4106-9e77-9e5da5285626',
        conferenceId: this.props.conferenceId,
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
            this.setState({
                noteList: obj.body,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            //viewingSeminar ? viewingSeminar.conference_id : '',
            conference: conferenceId,
            $orderby: 'lastmoddate DESC'
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

    handleClick = (event, noteId) => {
        const { i18n, auth } = this.props;
        // const {selected} = this.state;

        // const selectedIndex = selected.indexOf(theIndexNum);
        // let newSelected = [];

        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, theIndexNum);
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

        const data = {
            ...auth.relatedDataId,
            "noteId": noteId,
        }
        this.props.setRelatedDataId(data);
        this.props.history.push('/' + i18n.language + '/school-note-taking/' + noteId);
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
        console.log('back button pressed');
    }

    _createButtonAction = () => {
        const { i18n } = this.props;
        this.props.history.push('/' + i18n.language + '/school-course-new-note');
    }

    _editButtonAction = () => {
        console.log('edit button pressed');
        // const { i18n } = this.props;
        // const { selected, noteList } = this.state;
        // const selectedLength = selected.length;

        // // console.log(JSON.stringify(noteList, null, 2));
        // if (selectedLength === 1) {
        //     const selectedNote = noteList[selected[0]];
        //     this.props.history.push('/' + i18n.language + '/school-note-taking/' + selectedNote.note_id);
        // }else {
        //     //handle more than one selection when click editButton
        //     console.log('Can not edit more than one note in same time!');
        // }
    }

    _deleteButtonAction = () => {
        console.log('delete button pressed');
        // const { selected, noteList } = this.state;

        // const deleteNoteCb = (obj) => {
        //     console.log("deleteNoteCb : ", obj);
        //     this._getNoteTakingList();
        //     this.setState({ selected: [] });
        // }
        // const deleteNoteEcb = (obj) => {
        //     console.log("deleteNoteEcb : ", obj);
        // }

        // selected.forEach(i => {
        //     let theSelectedNote_id = noteList[i].note_id;
        //     apiNoteTaking.deleteNoteTaking(theSelectedNote_id, this.props.auth.token, deleteNoteCb, deleteNoteEcb);
        // });
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
        const {
            classes,
            // , i18n
        } = this.props;
        const {
            // data,
            noteList, order, orderBy, selected, rowsPerPage, page } = this.state;
        const data = noteList;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        console.log('SchoolCourseNote_render(): ' + JSON.stringify(noteList, null, 2));
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
                                    backButtonActionUrl=''

                                    createButton={true}
                                    createButtonText="创建 (click)"
                                    createButtonAction={this._createButtonAction}
                                    createButtonActionUrl='school-note-taking'

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
                                                                // onClick={event => this.handleClick(event, n.id)}
                                                                onClick={event => this.handleClick(event, n.note_id)}
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
                                                                >{n.name}</TableCell>
                                                                <TableCell>{`?`}</TableCell>
                                                                <TableCell>{dateToDayAndMonth(n.lastmoddate)}</TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                {emptyRows > 0 && (
                                                    <TableRow style={{ height: 49 * emptyRows }}>
                                                        <TableCell colSpan={3} />
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
    // loginP: data => dispatch(login(data)),
    // verifyT: token => dispatch(verifyToken(token)),
    setRelatedDataId: data => dispatch(setRelatedDataId(data)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseNote))));
