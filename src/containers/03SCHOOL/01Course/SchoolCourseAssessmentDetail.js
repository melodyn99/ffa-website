// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Material UI
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
// import Checkbox from '@material-ui/core/Checkbox';

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { Formik, Form } from 'formik';
import { dateToDayMonthYear } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ToolBar from '../../../components/105ToolBars/General';
// import data from '../../../data/03SCHOOL/01Course/SchoolCourseAssessment';

// Define column names
// const rows = [
//     { id: 'student', numeric: false, disablePadding: false, label: '学生' },
//     { id: 'teacherassess', numeric: true, disablePadding: false, label: '讲师评价' },
//     { id: 'materialassess', numeric: true, disablePadding: false, label: '资料评价' },
//     { id: 'assessment', numeric: true, disablePadding: false, label: '综合评价' },
//     { id: 'other', numeric: true, disablePadding: false, label: '其他意见' },
//     { id: 'date', numeric: true, disablePadding: false, label: '创建日期' },
// ];

class SchoolCourseAssessmentDetail extends React.Component {
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
                    teacherassess: n.tutor_score,
                    materialassess: n.material_scrore,
                    assessment: n.general_scrore,
                    other: n.comment,
                    date: n.createddate
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
            conference: this.props.auth.relatedDataId.conferenceId,
            $expand: 'user',
        }
        apiConferences.getConferenceAssessment(params, this.props.auth.token, cb, eCb);
    }
    /** form handle input start **/
    handleEnterSelection = (event, id) => {
        console.log(id);
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

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n
        } = this.props;
        // const {
        //     academicTerm,
        // } = this.state;
        // const redux_conferenceId = this.props.auth.relatedDataId.conferenceId || null;

        return (
            <Form>
                <Grid container spacing={32} alignItems="stretch">
                    <Grid item xs={1} >學生</Grid>
                    <Grid item xs={11}>{'陈大文'}</Grid>

                    <Grid item xs={1} >創建日期</Grid>
                    <Grid item xs={11}>{dateToDayMonthYear(1567296000000)}</Grid>

                    <Grid item xs={1} >講師評價</Grid>
                    <Grid item xs={11}>{4}</Grid>

                    <Grid item xs={1} >資料評價</Grid>
                    <Grid item xs={11}>{4}</Grid>

                    <Grid item xs={1} >綜合評價</Grid>
                    <Grid item xs={11}>{5}</Grid>

                    <Grid item xs={1} >其他意見</Grid>
                    <Grid item xs={11}>{'其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0其他意見0'}</Grid>
                </Grid>
                <div className="bottomControl clearfix">

                    <span>
                        <Button className={classes.greyButton}>取消</Button>
                    </span>

                    <span className="right">
                        <Button className={classes.blackButton}>下载</Button>

                    </span>
                </div>
            </Form >
        )
    }
    render() {
        const {
            academicTerm,
        } = this.state;
        // console.log('SchoolCourseInformation_render: ' + JSON.stringify(conferenceList, null, 2));
        // const Schema = Yup.object().shape({
        //     courseCode: Yup.string()
        //         .required('Course Code is required'),
        // })

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
                                    backButtonActionUrl='school-course-material'

                                    createButton={false}
                                    createButtonText="添加"
                                    createButtonAction={this._createButtonAction}
                                    createButtonActionUrl='new-school-course-material'

                                    editButton={false}
                                    editButtonText="编辑"
                                    editButtonAction={this._editButtonAction}

                                    deleteButton={false}
                                    deleteButtonText="删除"
                                    deleteButtonAction={this._deleteButtonAction}

                                    importButton={false}
                                    importButtonText="导入"
                                    importButtonAction={this._importButtonAction}

                                    copyButton={false}
                                    copyButtonText="拷贝"
                                    copyButtonAction={this._copyButtonAction}

                                    reportButton={false}
                                    reportButtonText="评分报告"
                                    reportButtonAction={this._reportButtonAction}
                                />

                                <div className="content">
                                    <Formik
                                        enableReinitialize
                                        initialValues={{
                                            academicTerm: academicTerm,
                                        }}
                                        // validationSchema={Schema}
                                        // onSubmit={this.handleSubmit}
                                        component={this.form}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchoolCourseAssessmentDetail.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(SchoolCourseAssessmentDetail)));
