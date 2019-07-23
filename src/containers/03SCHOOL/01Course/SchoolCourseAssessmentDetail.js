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
import Grid from '@material-ui/core/Grid';
// import Checkbox from '@material-ui/core/Checkbox';

// Api
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { Form } from 'formik';
import { dateToDayMonthYear } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
// import ToolBar from '../../../components/105ToolBars/General';

class SchoolCourseAssessmentDetail extends React.Component {
    state = {
        assessmentList: [],
    };

    componentDidMount() {
        this._getConferenceAssessment();
    }

    _getConferenceAssessment = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body[0];
            let convertedList = [];

            convertedList = {
                end_conference_score_id: theList.end_conference_score_id,
                student: theList.user.display_name,
                teacher_assess: theList.tutor_score,
                material_assess: theList.material_scrore,
                assessment: theList.general_scrore,
                other: theList.comment,
                date: dateToDayMonthYear(theList.createddate)
            }

            this.setState({
                assessmentList: convertedList,
            });
            // console.log(this.state.assessmentList);
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            conference: this.props.auth.relatedData.conferenceId,
            $expand: 'user',
            end_conference_score_id: this.props.auth.relatedData.endConferenceScoreId,
        }

        apiConferences.getConferenceAssessment(params, this.props.auth.token, cb, eCb);
    }

    // ToolBar
    _backButtonAction = (url) => {
        this.props.history.push(url);
    }

    downloadTxtFile = () => {
        const data = this.props.auth.relatedData.selectedCourseAssessment;
        const selectedCourseCode = this.props.auth.relatedData.courseCode;
        const convertedList = {
            '学生': data.student,
            '讲师评价': data.teacher_assess,
            '资料评价': data.material_assess,
            '综合评价': data.assessment,
            '创建日期': data.date,
            '其他意见': data.other,
        }
        // console.log(convertedList);
        const element = document.createElement("a");
        const file = new Blob([JSON.stringify(convertedList, null, 2)], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${selectedCourseCode}_${data.student}的评价"`;
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    }

    render() {
        const { classes
            //, t, i18n
        } = this.props;
        const data = this.state.assessmentList;
        // console.log(data);

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">S1-001品牌盈利模式</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <Form>
                                    <Grid container spacing={32} alignItems="stretch">
                                        <Grid item xs={1} >學生</Grid>
                                        <Grid item xs={11}>{data.student}</Grid>

                                        <Grid item xs={1} >創建日期</Grid>
                                        <Grid item xs={11}>{dateToDayMonthYear(data.createddate)}</Grid>

                                        <Grid item xs={1} >講師評價</Grid>
                                        <Grid item xs={11}>{data.teacher_assess}</Grid>

                                        <Grid item xs={1} >資料評價</Grid>
                                        <Grid item xs={11}>{data.material_assess}</Grid>

                                        <Grid item xs={1} >綜合評價</Grid>
                                        <Grid item xs={11}>{data.assessment}</Grid>

                                        <Grid item xs={1} >其他意見</Grid>
                                        <Grid item xs={11}>{data.other}</Grid>
                                    </Grid>
                                    <div className="bottomControl clearfix">
                                        <span>
                                            <Button onClick={() => this.props.history.goBack()} className={classes.greyButton}>取消</Button>
                                        </span>
                                        <span className="right">
                                            <Button onClick={() => this.downloadTxtFile()} className={classes.blackButton}>下载</Button>
                                        </span>
                                    </div>
                                </Form >
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
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseAssessmentDetail))));
