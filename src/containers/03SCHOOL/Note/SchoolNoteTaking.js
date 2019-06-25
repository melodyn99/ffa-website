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
import { apiNoteTaking } from '../../../Api/ApiNoteTaking';

// Redux
import { connect } from 'react-redux';
import { setNoteTitle, viewingNoteAction } from '../../../Redux/Action/eventAction';

// Utils
import { autoScrollTop } from '../../../Util/ScrollToTop';
// import { dateToDayAndMonth } from '../../../Util/DateUtils';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ErrorMessage from '../../../components/01General/ErrorMessage';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
import data from '../../../data/03SCHOOL/01Course/SchoolNoteTaking';

// Define column names
const rows = [
    { id: 'docName', numeric: false, disablePadding: false, label: '记录文件' },
    { id: 'teacher', numeric: false, disablePadding: false, label: '老师' },
    { id: 'docSize', numeric: true, disablePadding: false, label: '文件大小' },
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
        tempGoDetail: false
    }

    /** form content start */
    componentDidMount() {
        this._getNoteTakingList();
    }

    _getNoteTakingList = () => {

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
            conference: 'f0c3b12a-0ec7-4958-8d7c-b31602f4065e'
            //viewingSeminar ? viewingSeminar.conference_id : ''
            , $orderby: 'name'
        }

        apiNoteTaking.getNoteTakingList(params, this.props.auth.token, cb, eCb);
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
    /** Material UI table style end  **/

    _tempDetail = () => {
        this.setState({
            ...this.state,
            tempGoDetail: true
        });
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

    /* to move to Utils */
    formatDocSize = (docSize) => {
        let formatedResult = docSize + " KB";
        if (docSize >= 102.4) {
            formatedResult = docSize / 1024 + " MB";
        } else if (docSize >= 104857.6) {
            formatedResult = docSize / 1048576 + " GB";
        }
        return formatedResult;
    }

    formatDate = (date) => {
        let formatedDate = date;
        let resultArray;
        resultArray = date.split("/");
        formatedDate = resultArray[0] + "年" + resultArray[1] + "月" + resultArray[2] + "日";
        return formatedDate;
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
            // listNote, 
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

                    <Grid item xs={1} >
                        <div className="bottomControl clearfix">
                            记录文件
                        </div>
                    </Grid>
                    <Grid item xs={11} >
                        <div className="bottomControl clearfix">
                            <Button type="submit" className={classes.blueGreenButton}>上载文件</Button>
                            <Button type="submit" className={classes.greyButton}>下载</Button>
                            <Button type="submit" className={classes.greyButton}>删除</Button>
                        </div>
                    </Grid>

                    <Grid item xs={1} >
                    </Grid>
                    <Grid item xs={11}>
                        {/* <div className={classes.notesWrapper}>
                            <List className={classes.list}>
                                {
                                    listNote.map((item, i) => (
                                        <ListItem
                                            onClick={() => {
                                                this.props.setNoteTitle(item.name);
                                                this.props.viewingNoteAction(item);
                                            }}
                                            component={Link}
                                            to={{
                                                pathname: '/' + i18n.language + '/school-notes-content',
                                                search: 'notes=' + item.note_id,
                                                // state: item,
                                            }}
                                            className={classes.listItem}
                                            key={i}
                                        >
                                            <ListItemText
                                                primary={item.name}
                                                secondary={item.created_by}
                                                className={classes.listItemText}
                                            />
                                            <Typography className={classes.typography}>
                                                {dateToDayAndMonth(item.createddate)}
                                            </Typography>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </div> */}
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
                                                        className={classes.nthOfTypeRow}
                                                        hover
                                                        // onClick={event => this.handleClick(event, n.id)}
                                                        onClick={() => this._tempDetail()}
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
                                                        >{n.docName}</TableCell>
                                                        <TableCell>{n.teacher}</TableCell>
                                                        <TableCell>{this.formatDocSize(n.docSize)}</TableCell>
                                                        <TableCell>{this.formatDate(n.createdDate)}</TableCell>
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
