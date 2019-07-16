// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import { SchoolNoteTakingStyles } from '../../../utils/01MaterialJsStyles/Note/SchoolNoteTaking'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
// import { List, ListItem, ListItemText, Typography, } from '@material-ui/core';
import { Button } from '@material-ui/core';

// Material UI
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// Api
import { apiNoteTaking } from '../../../Api/ApiNoteTaking';
import { apiNoteFile } from '../../../Api/ApiNoteFile';
import { apiFile } from '../../../Api/ApiFile';

// Redux
import { connect } from 'react-redux';
import { setNoteTitle, viewingNoteAction } from '../../../Redux/Action/eventAction';
import { setRelatedDataId } from '../../../Redux/Action/authAction';

// Utils
import Bluebird from 'bluebird';
import { autoScrollTop } from '../../../Util/ScrollToTop';
import { dateToDayAndMonth } from '../../../Util/DateUtils';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import CommonUtils, { formatFileSizeToString } from '../../../Util/CommonUtils';
import FileInput from '../../../Util/FileInput';
import { emitter, EventTypes } from '../../../Util/EventEmitter';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ErrorMessage from '../../../components/01General/ErrorMessage';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
// import data from '../../../data/03SCHOOL/01Course/SchoolNoteTaking';

// Define column names
const rows = [
    { id: 'fileName', numeric: false, disablePadding: false, label: '记录文件' },
    { id: 'creator', numeric: false, disablePadding: false, label: '创建人员' },
    { id: 'size', numeric: true, disablePadding: false, label: '文件大小' },
    { id: 'createdDate', numeric: false, disablePadding: false, label: '上载日期' },
];

class SchoolNoteTaking extends React.Component {
    state = {
        // table settings
        order: 'desc',
        orderBy: 'createdDate',
        selected: [],
        page: 0,
        rowsPerPage: 10,

        // component state
        noteId: this.props.auth.relatedDataId.noteId,
        theNoteName: '',
        theNoteContent: '',
        fileList: [],
    }

    componentDidMount() {
        if (this.state.noteId !== null) {
            this._getNoteTakingList();
            this._getNoteFile();
        }
    }

    _getNoteTakingList = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.setState({
                theNoteName: obj.body[0].name,
                theNoteContent: obj.body[0].content,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            note_id: this.state.noteId,
        }

        apiNoteTaking.getNoteTakingList(params, this.props.auth.token, cb, eCb);
    }

    _getNoteFile = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            const convertedList = [];

            theList.map(n => {
                const convertedArray = {
                    note_file_id: n.note_file_id,
                    fileName: n.file.name,
                    creator: n.created_by,
                    size: formatFileSizeToString(n.file.size),
                    createdDate: dateToDayAndMonth(n.createdDate),
                    file_url: n.file.url,
                }
                return convertedList.push(convertedArray);
            });

            this.setState({
                fileList: convertedList,
            });
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            note: this.state.noteId,
            //viewingSeminar ? viewingSeminar.conference_id : '',
            $expand: 'file/mime_type',
            // $orderby: 'lastmoddate',
        }

        apiNoteFile.getNoteFile(params, this.props.auth.token, cb, eCb);
    }

    /** Note start **/
    /** form handle input start **/
    _handleInput = (value, key) => {
        console.log(value);
        this.setState({
            ...this.state,
            [key]: value
        })
    }
    /** form handle input end **/

    // form submit
    handleSubmit = (event, { setFieldError }) => {
        // console.log('click submit button!');
        // console.log('event: ' + JSON.stringify(event.notesName, null, 2));
        // this.editNoteInfo(event);

        if (this.state.noteId === null) {
            this.newNoteInfo(event);
        } else {
            this.editNoteInfo(event);
        }
    }

    // insert
    newNoteInfo = (event) => {
        const conferenceId = this.props.auth.relatedDataId.conferenceId;

        const cb = (obj) => {
            // console.log("cb : ", obj);

            const data = {
                ...this.props.auth.relatedDataId,
                "noteId": obj.body.note_id,
            }

            this.props.setRelatedDataIdP(data);
            this.setState({
                ...this.state,
                noteId: obj.body.note_id
            })
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            //viewingSeminar ? viewingSeminar.conference_id : '',
            conference: conferenceId,
            name: event.notesName,
            content: event.notesContent,
        }

        apiNoteTaking.createNoteTaking(params, this.props.auth.token, cb, eCb);
    }

    // update
    editNoteInfo = (event) => {
        const { history } = this.props;
        // const { viewingSeminar } = this.props;

        const cb = (obj) => {
            // console.log("cb : ", obj);
            history.goBack();
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const body = {
            name: event.notesName,
            content: event.notesContent,
        }

        apiNoteTaking.editNoteTaking(this.state.noteId, body, this.props.auth.token, cb, eCb);
    }

    // delete
    _handleDeleteNote = () => {
        const { history } = this.props;

        // console.log("handleDeleteNote : ");
        const deleteNoteCb = (obj) => {
            // console.log("deleteNoteCb : ", obj);
            history.goBack();
        }
        const deleteNoteEcb = (obj) => {
            console.log("deleteNoteEcb : ", obj);
        }

        apiNoteTaking.deleteNoteTaking(this.state.noteId, this.props.auth.token, deleteNoteCb, deleteNoteEcb);
    }
    /** Note end **/

    /** Files management start **/
    _uploadFile = (body) => {
        // console.log('upload button pressed');
        const { noteId } = this.state;
        const createNoteFileCb = (obj) => {
            // console.log("createNoteFileCb : ", obj);
            this._getNoteFile();
        }
        const createNoteFileEcb = (obj) => {
            console.log("createNoteFileEcb : ", obj);
        }

        const createFileCb = (obj) => {
            // console.log("createFileCb : ", obj);
            apiNoteFile.createNoteFile({ file: obj.body.file_id, note: noteId }, this.props.auth.token, createNoteFileCb, createNoteFileEcb);
        }
        const createFileEcb = (obj) => {
            console.log("createFileEcb : ", obj);
        }

        apiFile.createFile(body, this.props.auth.token, createFileCb, createFileEcb);
    }
    customHeaderButtonCallback(eventName, data) {
        emitter.emit(eventName, data);
    }

    _downloadFile = () => {
        const { selected, fileList } = this.state;
        // console.log('download button pressed');
        // const selectedListLength = selected.length;
        selected.forEach((i, counter) => {
            let theSelectedFileUrl = fileList[i].file_url;
            Bluebird.delay(counter * 1000, theSelectedFileUrl).then((url) => {
                CommonUtils.forceDownload(url, CommonUtils.extractFileName(url));
            });
        });
    }

    _deleteFile = () => {
        // console.log('delete button pressed');
        const { selected, fileList } = this.state;

        const deleteNoteFileCb = (obj) => {
            console.log("deleteNoteFileCb : ", obj);
            this._getNoteFile();
            this.setState({ selected: [] });
        }
        const deleteNoteFileEcb = (obj) => {
            console.log("deleteNoteFileEcb : ", obj);
        }

        selected.forEach(i => {
            let theSelectedNote_file_id = fileList[i].note_file_id;
            apiNoteFile.deleteNoteFile(theSelectedNote_file_id, this.props.auth.token, deleteNoteFileCb, deleteNoteFileEcb);
        });
    }
    /** Files management end **/

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

    isSelected = theIndexNum => this.state.selected.indexOf(theIndexNum) !== -1;
    /** React components 'Material-UI' end  **/

    // Formik form
    form = ({
        // values,
        errors, touched
        // , handleChange
    }) => {
        const {
            // i18n,
            classes } = this.props;
        const {
            fileList,
            // data,
            order, orderBy, selected, rowsPerPage, page } = this.state;
        const data = fileList;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1} >
                        记录标题
                        </Grid>
                    <Grid item xs={11}>
                        <Field name="notesName" type="text" placeholder="记录标题" maxLength="100" />
                        {errors.notesName && touched.notesName ? <ErrorMessage message={errors.notesName} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        记录内容
                        </Grid>
                    <Grid item xs={11}>
                        <Field name="notesContent" type="text" placeholder="记录内容" maxLength="100" />
                        {errors.notesContent && touched.notesContent ? <ErrorMessage message={errors.notesContent} /> : null}
                    </Grid>

                    {(this.state.noteId !== null) &&
                        <Grid item xs={1} >记录文件</Grid>
                    }
                    {(this.state.noteId !== null) &&
                        <Grid item xs={11} >
                            <Button
                                className={classes.blueGreenButton}
                                onClick={() => this.customHeaderButtonCallback(EventTypes.OPEN_FILE_BROWSER)}>
                                <FileInput onSelected={(file) => this._uploadFile(file)} />上载文件
                            </Button>
                        </Grid>
                    }

                    {(this.state.noteId !== null) &&
                        <Grid item xs={1} ></Grid>
                    }
                    {(this.state.noteId !== null) &&
                        <Grid item xs={11}>
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
                                                            >{n.fileName}</TableCell>
                                                            <TableCell>{n.creator}</TableCell>
                                                            <TableCell>{n.size}</TableCell>
                                                            <TableCell>{n.createdDate}</TableCell>
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
                        </Grid>
                    }
                </Grid>
                <div className="bottomControl clearfix">
                    <Button
                        className={classes.greyButton}
                        onClick={() => this.props.history.goBack()}
                    >取消</Button>
                    {(this.state.noteId !== null) &&
                        <Button
                            className={classes.blackButton}
                            onClick={() => this._handleDeleteNote()}
                        >删除</Button>
                    }
                    <span className="right">
                        <Button type="submit" className={classes.blackButton}>确认</Button>
                    </span>
                </div>
            </Form>
        )
    }

    render() {
        const {
            theNoteName, theNoteContent } = this.state;
        const Schema = Yup.object().shape({
            notesName: Yup.string()
                .required('Note Name is required'),
            notesContent: Yup.string()
                .required('Note Content is required'),
        })

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">S1-001品牌盈利模式</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        notesName: theNoteName,
                                        notesContent: theNoteContent,
                                    }}
                                    validationSchema={Schema}
                                    onSubmit={this.handleSubmit}
                                    component={this.form}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    viewingSeminar: state.seminarReducer.viewingSeminar,
});

const mapDispatchToProps = dispatch => ({
    setNoteTitle: data => dispatch(setNoteTitle(data)),
    viewingNoteAction: data => dispatch(viewingNoteAction(data)),
    setRelatedDataIdP: data => dispatch(setRelatedDataId(data)),
});

const combinedStyles = combineStyles(CommonStyles, SchoolNoteTakingStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolNoteTaking)))));
