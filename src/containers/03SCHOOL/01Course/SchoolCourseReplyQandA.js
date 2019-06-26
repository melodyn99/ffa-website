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
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
// import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
// import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ToolBar from '../../../components/105ToolBars/General';
import ListType5 from '../../../components/102Grids/ListType5';
import ListType6 from '../../../components/102Grids/ListType6';
// import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';

function Block1(props) {
    return (
        <ListType6
            null={props.null}
            studentName={props.studentName}
            studentContent={props.studentContent}
        />
    )
}

function Block2(props) {
    return (
        <ListType5
            name={props.name}
            content={props.content}
        />
    )
}

function Cluster(props) {
    let rows = [];
    for (let i = 0; i < 3 ; i++) {
        if (i%2 === 0) {
            rows.push(
                <div key={i}>
                    <div className="align-center">Today at 9:30AM</div>
                    <Block1
                        key={i}
                        null={props.null}
                        studentName={props.studentName}
                        studentContent={props.studentContent}
                    />
                    <div className="sep-10"></div>
                </div>
            )
        }
        if (i%2 === 1) {
            rows.push(
                <div key={i}>
                    <div className="align-center">Today at 10:30AM</div>
                    <Block2
                        key={i}
                        name={props.name}
                        content={props.content}
                    />
                    <div className="sep-10"></div>
                </div>
            )
        }
    }
    return (rows);
}

class SchoolCourseReplyQandA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            null: ['a'],
            studentName: ['陈大文（学生）'],
            studentContent: ['abcabacababcabc', '123456789012345'],
            name: ['彭'],
            content: ['abcabcabcabcabc']
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

    render() {
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
                                    backButtonActionUrl='school-course-q-and-a'

                                    createButton={false}
                                    createButtonText="添加"
                                    createButtonAction={this._createButtonAction}
                                    createButtonActionUrl='new-school-course-student-management'

                                    editButton={false}
                                    editButtonText="编辑"
                                    editButtonAction={this._editButtonAction}

                                    deleteButton={false}
                                    deleteButtonText="移除"
                                    deleteButtonAction={this._deleteButtonAction}

                                    importButton={false}
                                    importButtonText="导入名单"
                                    importButtonAction={this._importButtonAction}

                                    copyButton={false}
                                    copyButtonText="拷贝"
                                    copyButtonAction={this._copyButtonAction}

                                    reportButton={false}
                                    reportButtonText="学生报告"
                                    reportButtonAction={this._reportButtonAction}
                                />

                                <Cluster
                                    null={this.state.null}
                                    studentName={this.state.studentName}
                                    studentContent={this.state.studentContent}
                                    name={this.state.name}
                                    content={this.state.content}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchoolCourseReplyQandA.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    // loginP: data => dispatch(login(data)),
    // verifyT: token => dispatch(verifyToken(token)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseReplyQandA))));
