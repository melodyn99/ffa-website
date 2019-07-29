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

// Utils
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import { dateToDayAndMonth } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
// import ToolBar from '../../../components/105ToolBars/General';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
// import data from '../../../data/03SCHOOL/01Course/SchoolCourseMaterialSelectFolder';

// Define column names
const rows = [
    { id: '', numeric: true, disablePadding: false, label: '' },
    { id: 'library_name', numeric: false, disablePadding: false, label: '教材库' },
    { id: 'fileCount', numeric: true, disablePadding: false, label: '文件' },
    { id: 'editor', numeric: true, disablePadding: false, label: '操作人員' },
    { id: 'lastmoddate', numeric: true, disablePadding: false, label: '最后修改时间' },
];

class SchoolCourseMaterialSelectFolder extends React.Component {
    state = {
        // table settings
        order: 'desc',
        orderBy: 'lastdate',
        selected: [],
        page: 0,
        rowsPerPage: 10,

        // component state
        // data: data,
        librariesList: [],
    };

    componentDidMount() {
        this._getClassMaterialList();
    }

    _getClassMaterialList = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            this._getLibrariesList(theList);
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            conference: this.props.auth.relatedData.course.conferenceId,
        }

        apiConferences.getConferenceMaterial(params, this.props.auth.token, cb, eCb);
    }

    _getLibrariesList = (classMaterialList) => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            // console.log("_getLibrariesList()");
            // console.log(theList);

            //find selected item List
            let selectedItemList = [];
            classMaterialList.map(n => {
                const isSelected = theList.find(i => i.library_id === n.library);
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
                    if (i.library_id === n.library_id) {
                        return isUnselect = false;
                    }
                    return null;
                });
                if (isUnselect) {
                    return unselectedItemList.push(n);
                } else
                    return null;
            })

            //covert the key name of unselected item List for sort in UI
            const convertedList = [];
            unselectedItemList.map(n => {
                const convertedArray = {
                    library_id: n.library_id,
                    library_name: n.name,
                    fileCount: n.total_document,
                    editor: n.modified_by,
                    lastmoddate: dateToDayAndMonth(n.lastmoddate),
                }
                return convertedList.push(convertedArray);
            });

            this.setState({
                librariesList: convertedList,
            });
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            "subject/subject_id": this.props.auth.relatedData.course.subjectId,
        }

        apiConferences.getLibrariesList(params, this.props.auth.token, cb, eCb);
    }

    /** form handle input start **/
    // post
    _createCourseMaterial = () => {
        // console.log('Click _createClassMaterialFiles()');
        // console.log(this.state.selected);
        const { librariesList } = this.state;
        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.props.history.goBack();
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        const body = [];
        if (this.state.selected) {
            this.state.selected.map(n => {
                const theLink = {
                    library: librariesList[n].library_id,
                    name: librariesList[n].library_name,
                    conference: this.props.auth.relatedData.course.conferenceId,
                }
                return body.push(theLink);
            });
            console.log(body);
            apiConferences.createConferenceMaterial(body, this.props.auth.token, cb, eCb);
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
    /** React components 'Material-UI' end  **/

    render() {
        const { classes } = this.props;
        const {
            // data,
            order, orderBy, selected, rowsPerPage, page } = this.state;
        const data = this.state.librariesList;
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
                                                                onClick={event => this.handleClick(event, theIndexNum)}
                                                                role="checkbox"
                                                                aria-checked={isSelected}
                                                                tabIndex={-1}
                                                                key={theIndexNum}
                                                                selected={isSelected}
                                                            >
                                                                <TableCell padding="checkbox">
                                                                    <Checkbox checked={isSelected} />
                                                                </TableCell>
                                                                <TableCell component="th" scope="row"
                                                                // padding="none"
                                                                >{n.library_name}</TableCell>
                                                                <TableCell>{n.fileCount}</TableCell>
                                                                <TableCell>{n.editor}</TableCell>
                                                                <TableCell>{n.lastmoddate}</TableCell>
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
                                <div className="bottomControl clearfix">
                                    <Button className={classes.greyButton}
                                        onClick={() => this.props.history.push('school-course-material')}
                                    >返回</Button>
                                    <span className="right"><Button onClick={() => this._createCourseMaterial()} className={classes.blackButton}>加入資料匣</Button></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseMaterialSelectFolder))));
