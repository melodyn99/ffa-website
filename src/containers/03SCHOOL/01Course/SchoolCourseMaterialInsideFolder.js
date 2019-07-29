// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

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
// import Checkbox from '@material-ui/core/Checkbox';

// Api
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import { dateToDayAndMonth } from '../../../Util/DateUtils';
import Bluebird from 'bluebird';
import CommonUtils, { formatFileSizeToString } from '../../../Util/CommonUtils';
// import FileInput from '../../../Util/FileInput';
// import { emitter, EventTypes } from '../../../Util/EventEmitter';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ToolBar from '../../../components/105ToolBars/General';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
// import data from '../../../data/03SCHOOL/01Course/SchoolCourseMaterialInsideFolder';

// Define column names
const rows = [
    { id: 'fileName', numeric: false, disablePadding: false, label: '文件名称' },
    { id: 'creator', numeric: false, disablePadding: false, label: '创建人员' },
    { id: 'size', numeric: true, disablePadding: false, label: '文件大小' },
    { id: 'createdDate', numeric: false, disablePadding: false, label: '上载日期' },
    { id: '', numeric: false, disablePadding: false, label: '' },
];

class SchoolCourseMaterialInsideFolder extends React.Component {
    state = {
        // table settings
        order: 'desc',
        orderBy: 'createdDate',
        selected: [],
        page: 0,
        rowsPerPage: 10,

        // component state
        // data: data,
        classMaterialFileList: [],
    };

    componentDidMount() {
        this._getClassMaterialFileList();
    }

    _getClassMaterialFileList = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            const convertedList = [];
            console.log("_getClassMaterialFileList theList:");
            console.log(theList);
            theList.map(n => {
                const convertedArray = {
                    class_material_file_id: n.class_material_file_id,
                    fileName: n.material.file.name,
                    creator: n.material.file.created_by,
                    size: formatFileSizeToString(n.material.file.size),
                    createdDate: dateToDayAndMonth(n.material.file.createdDate),
                    file_url: n.material.file.url,
                }
                return convertedList.push(convertedArray);
            });

            this.setState({
                classMaterialFileList: convertedList,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            class_material: this.props.auth.relatedData.course.materialId,
            $expand: "material/file",
        }

        apiConferences.getConferenceMaterialFile(params, this.props.auth.token, cb, eCb);
    }

    /** class material files management start **/
    //delete
    _deleteConferenceMaterialFile = (class_material_file_id) => {
        // console.log('delete button pressed');
        const deleteNoteFileCb = (obj) => {
            console.log("deleteNoteFileCb : ", obj);
            this._getClassMaterialFileList();
            // this.setState({ selected: [] });
        }
        const deleteNoteFileEcb = (obj) => {
            console.log("deleteNoteFileEcb : ", obj);
        }

        apiConferences.deleteConferenceMaterialFile(class_material_file_id, this.props.auth.token, deleteNoteFileCb, deleteNoteFileEcb);
    }

    _deleteConferenceMaterial = () => {
        // console.log('delete button pressed');
        const cb = (obj) => {
            console.log("cb : ", obj);
            // this.setState({ selected: [] });
            this.props.history.goBack();
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        console.log(this.props.auth.relatedData.course.materialId);
        apiConferences.deleteConferenceMaterial(this.props.auth.relatedData.course.materialId, this.props.auth.token, cb, eCb);
    }


    _downloadFile = (file_url) => {
        console.log("Click _downloadFile()");
        console.log(file_url);
        // const indexOfFileList = fileList.findIndex(n => n.note_file_id === note_file_id);
        // const theSelectedFileUrl = fileList[indexOfFileList].file_url;
        Bluebird.delay(0, file_url).then((url) => {
            CommonUtils.forceDownload(url, CommonUtils.extractFileName(url));
        });
    }
    /** class material files management end **/

    /** form handle input start **/
    handleEnterSelection = (event, id) => {
        console.log(`Clicked class_material_id: ${id}`);
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

    _deleteButtonAction = (url) => {
        // console.log('delete button pressed');
        this._deleteConferenceMaterial();
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
        const data = this.state.classMaterialFileList;
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
                                    backButton={true}
                                    backButtonText="返回"
                                    backButtonAction={this._backButtonAction}
                                    backButtonActionUrl='school-course-material'

                                    createButton={true}
                                    createButtonText="添加檔案"
                                    createButtonAction={this._createButtonAction}
                                    createButtonActionUrl='school-course-material-select-file'

                                    deleteButton={true}
                                    deleteButtonText="删除資料匣"
                                    deleteButtonAction={this._deleteButtonAction}
                                    deleteButtonActionUrl='school-course-material'
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
                                                                hover
                                                                onClick={event => this.handleEnterSelection(event, n.class_material_id)}
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
                                                                <TableCell align="right" >
                                                                    <Button onClick={() => this._downloadFile(n.file_url)}>{' Download '}</Button>
                                                                    <Button onClick={() => this._deleteConferenceMaterialFile(n.class_material_file_id)}>{' X '}</Button>
                                                                </TableCell>
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

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseMaterialInsideFolder))));
