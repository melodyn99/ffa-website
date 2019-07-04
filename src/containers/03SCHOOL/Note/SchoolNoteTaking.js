// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

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
import { apiNoteFile } from '../../../Api/ApiNoteFile';
import { apiFile } from '../../../Api/ApiFile';

// Redux
import { connect } from 'react-redux';
import { setNoteTitle, viewingNoteAction } from '../../../Redux/Action/eventAction';

// Utils
import { autoScrollTop } from '../../../Util/ScrollToTop';
import { dateToDayAndMonth } from '../../../Util/DateUtils';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import { formatFileSizeToString } from '../../../Util/CommonUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ToolBar from '../../../components/105ToolBars/General';
import ErrorMessage from '../../../components/01General/ErrorMessage';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
import data from '../../../data/03SCHOOL/01Course/SchoolNoteTaking';

// Define column names
const rows = [
    { id: 'name', numeric: false, disablePadding: false, label: '记录文件' },
    { id: 'teacher', numeric: false, disablePadding: false, label: '老师' },
    { id: 'size', numeric: true, disablePadding: false, label: '文件大小' },
    { id: 'createdDate', numeric: false, disablePadding: false, label: '上载日期' },
];

class SchoolNoteTaking extends React.Component {
    state = {
        listNote: [],
        order: 'asc',
        orderBy: 'calories',
        selected: [],
        data: data,
        page: 0,
        rowsPerPage: 10,
        tempGoDetail: false,
        hardCode_noteId: '52f8c092-bb58-46a7-a7d2-b482d0ac0b85',
    }

    /** form content start */
    componentDidMount() {
        this._getNoteFile();
    }

    _getNoteFile = () => {
        const { hardCode_noteId } = this.state;
        // const { viewingSeminar } = this.props;

        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.setState({
                listNote: obj.body,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            note: hardCode_noteId,
            //viewingSeminar ? viewingSeminar.conference_id : '',
            $orderby: 'lastmoddate',
            $expand: 'file/mime_type',
        }

        apiNoteFile.getNoteFileForNote(params, this.props.auth.token, cb, eCb);
    }

    _handleInput = (value, key) => {
        console.log(value);
        this.setState({
            ...this.state,
            [key]: value
        })
    }

    _handleSelect = () => {

    }

    handleSubmit = (values, { setFieldError }) => {
        // call api
        // TODO
        console.log('GREAT!');
    }
    /** form content end */

    /** Material UI table style start  **/
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

    handleClick = (event, theIndexNum) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(theIndexNum);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, theIndexNum);
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

    /** Material UI table style end  **/
    // _tempDetail = () => {
    //     this.setState({
    //         ...this.state,
    //         tempGoDetail: true
    //     });
    // }

    // ToolBar
    _uploadButtonAction = () => {
        console.log('upload button pressed');
    }

    _downloadButtonAction = () => {
        console.log('download button pressed');
    }

    _deleteButtonAction = () => {
        console.log('delete button pressed');
    }

    form = ({
        // values,
        errors, touched
        // , handleChange
    }) => {
        const {
            // i18n,
            classes } = this.props;
        const {
            listNote,
            data, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1} >
                        记录标题
                        </Grid>
                    <Grid item xs={11}>
                        <Field name="notesName" type="text" placeholder="课程编号 123" maxLength="100" />
                        {errors.notesName && touched.notesName ? <ErrorMessage message={errors.notesName} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        记录内容
                        </Grid>
                    <Grid item xs={11}>
                        <Field name="notesContent" type="text" placeholder="课程编号 123" maxLength="100" />
                        {errors.notesContent && touched.notesContent ? <ErrorMessage message={errors.notesContent} /> : null}
                    </Grid>

                    <Grid item xs={1} >记录文件</Grid>
                    <Grid item xs={11} >
                        <ToolBar
                            noMargin={true}

                            uploadButton={true}
                            uploadButtonText="上载文件"
                            uploadButtonAction={this._uploadButtonAction}
                            uploadButtonActionUrl='school-course-preparations'

                            downloadButton={true}
                            downloadButtonText="下载"
                            downloadButtonAction={this._downloadButtonAction}
                            downloadButtonActionUrl='school-new-activity'

                            deleteButton={true}
                            deleteButtonText="刪除"
                            deleteButtonAction={this._deleteButtonAction}
                        />

                        {/* <div className="bottomControl clearfix">
                            <Button type="submit" className={classes.blueGreenButton}>上载文件</Button>
                            <Button type="submit" className={classes.greyButton}>下载</Button>
                            <Button type="submit" className={classes.greyButton}>删除</Button>
                        </div> */}
                    </Grid>

                    <Grid item xs={1} >
                    </Grid>
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
                                        {listNote
                                            .sort(getSorting(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map(n => {
                                                const theIndexNum = listNote.indexOf(n);
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
                                                        >{n.file.name}</TableCell>
                                                        <TableCell>{n.file.mime_type.created_by}</TableCell>
                                                        <TableCell>{formatFileSizeToString(n.file.size)}</TableCell>
                                                        <TableCell>{dateToDayAndMonth(n.file.mime_type.createddate)}</TableCell>
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

                </Grid>
                <div className="bottomControl clearfix">
                    <Button className={classes.greyButton}
                    // onClick={() => this.props.history.push('school-course-note')}
                    >取消</Button>
                    <span className="right"><Button type="submit" className={classes.blackButton}>确认</Button></span>
                </div>
                {/* <div className={classes.notesWrapper}>
                    <List className={classes.list}>
                        {
                            listNote.map((n, i) => (
                                <ListItem
                                    onClick={() => {
                                        this.props.setNoteTitle(n.name);
                                        this.props.viewingNoteAction(n);
                                    }}
                                    component={Link}
                                    to={{
                                        pathname: '/' + i18n.language + '/school-notes-content',
                                        search: 'notes=' + n.note_id,
                                        // state: item,
                                    }}
                                    className={classes.listItem}
                                    key={i}
                                >
                                    <ListItemText
                                        primary={n.name}
                                        secondary={n.created_by}
                                        className={classes.listItemText}
                                    />
                                    <Typography className={classes.typography}>
                                        {dateToDayAndMonth(n.createddate)}
                                    </Typography>
                                </ListItem>
                            ))
                        }
                    </List>
                </div> */}
            </Form>
        )
    }

    render() {
        const Schema = Yup.object().shape({
            notesName: Yup.string()
                .required('Note Name is required'),
            notesContent: Yup.string()
                .required('Note Content is required'),
        })

        // if (this.state.tempGoDetail) {
        //     return <Redirect push to={"/" + i18n.language + "/school-note-taking"} />;
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
                                <Formik
                                    initialValues={{
                                        notesName: '',
                                        notesContent: '',
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

SchoolNoteTaking.propTypes = {
    classes: PropTypes.object.isRequired,
    viewingSeminar: PropTypes.object.isRequired,
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    viewingSeminar: state.seminarReducer.viewingSeminar,
});

const mapDispatchToProps = dispatch => ({
    setNoteTitle: data => dispatch(setNoteTitle(data)),
    viewingNoteAction: data => dispatch(viewingNoteAction(data)),
});

const combinedStyles = combineStyles(CommonStyles, SchoolNoteTakingStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(SchoolNoteTaking))));
