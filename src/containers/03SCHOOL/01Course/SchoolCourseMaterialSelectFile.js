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
import { Button } from '@material-ui/core';

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

// Utils
import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';
import { dateToDayAndMonth } from '../../../Util/DateUtils';
import { formatFileSizeToString } from '../../../Util/CommonUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
// import ToolBar from '../../../components/105ToolBars/General';
import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';
// import data from '../../../data/03SCHOOL/01Course/SchoolCourseMaterialSelectFile';

// Define column names
const rows = [
    { id: 'fileName', numeric: false, disablePadding: false, label: '记录文件' },
    { id: 'creator', numeric: false, disablePadding: false, label: '创建人员' },
    { id: 'size', numeric: true, disablePadding: false, label: '文件大小' },
    { id: 'createdDate', numeric: false, disablePadding: false, label: '上载日期' },
];

class SchoolCourseMaterialSelectFile extends React.Component {
    state = {
        // table settings
        order: 'desc',
        orderBy: 'lastdate',
        selected: [],
        page: 0,
        rowsPerPage: 10,

        // component state
        // data: data,
        libraryList: [],
        // classMaterialFileList: [],
    };

    componentDidMount() {
        this._getClassMaterialFileList();
    }
    _getClassMaterialFileList = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;

            // this.setState({
            //     classMaterialFileList: theList,
            // });

            return this._getLibrariesList(theList);
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            class_material: this.props.auth.relatedData.classMaterialId,
        }

        apiConferences.getConferenceMaterialFile(params, this.props.auth.token, cb, eCb);
    }
    _getLibrariesList = (classMaterialFileList) => {
        // console.log("_getLibrariesList classMaterialFileList:");
        // console.log(classMaterialFileList);
        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body[0].materials;
            // console.log("_getLibrariesList theList:");
            // console.log(theList);

            //find selected item List
            let selectedItemList = [];
            classMaterialFileList.map(n => {
                const isSelected = theList.find(i => i.material_id === n.material);
                selectedItemList.push(isSelected);
                return null;
            });


            //find unselected item List
            let unselectedItemList = [];
            theList.map(n => {
                let isUnselect = true;
                selectedItemList.map(i => {
                    if (i.material_id === n.material_id) {
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
                    material_id: n.material_id,
                    fileName: n.file.name,
                    creator: n.file.created_by,
                    size: n.file.size,
                    createdDate: dateToDayAndMonth(n.file.createddate),
                }
                return convertedList.push(convertedArray);
            });

            this.setState({
                libraryList: convertedList,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            library_id: this.props.auth.relatedData.libraryId,
            $expand: "materials/file",
        }

        apiConferences.getLibraries(params, this.props.auth.token, cb, eCb);
    }


    /** form handle input start **/
    //post
    _createClassMaterialFiles = () => {
        // console.log('Click _createClassMaterialFiles()');
        // console.log(this.state.selected);
        const classMaterialId = this.props.auth.relatedData.classMaterialId;
        const cb = (obj) => {
            // console.log("createNoteFileCb : ", obj);
            this.props.history.goBack();
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }
        const body = [];
        if (this.state.selected) {
            this.state.selected.map(n => {
                const theLink = {
                    class_material: classMaterialId,
                    material: this.state.libraryList[n].material_id,
                }
                return body.push(theLink);
            });
            // console.log(body);
            apiConferences.createConferenceMaterialFile(body, this.props.auth.token, cb, eCb);
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
        const data = this.state.libraryList;
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
                                <div className="bottomControl clearfix">
                                    <Button className={classes.greyButton}
                                        onClick={() => this.props.history.push('school-course-material-inside-folder')}
                                    >返回</Button>
                                    <span className="right"><Button onClick={() => this._createClassMaterialFiles()} className={classes.blackButton}>加入檔案</Button></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchoolCourseMaterialSelectFile.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseMaterialSelectFile))));
