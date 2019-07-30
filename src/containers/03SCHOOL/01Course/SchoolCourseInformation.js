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
import Grid from '@material-ui/core/Grid';

// Api
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';
import { setRelatedCourseData } from '../../../Redux/Action/authAction';

// Utils
// import { Formik, Form, input } from 'formik';
import { dateToDayMonthYear, timeStampsToRange, rangeToTimeStamps } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
// import ErrorMessage from '../../../components/01General/ErrorMessage';
// import { ContactsOutlined } from '@material-ui/icons';
// import data from '../../data/09Account/EnrollmentHistory';

function Block(props) {

    return (
        <Grid container spacing={16} alignItems="center" className="mt20">
            <Grid item xs={12} >#{props.sequence}</Grid>

            <Grid item xs={1} >课程标题</Grid>
            <Grid item xs={11}>
                <input name="className" type="text" placeholder={"第" + props.sequence + "课"} maxLength="100" value={props.data.className}
                    onChange={e => props._handleClassInput(props.sequence, e.target.name, e.target.value)} />
                {/* {errors[className] && touched[className] ? <ErrorMessage message={errors[className]} /> : null} */}
            </Grid>

            <Grid item xs={1} >课程日期</Grid>
            <Grid item xs={11}>
                <input name="classStartToEndDate" type="text" placeholder="2019-12-13, 13:00 - 15:00" maxLength="100" value={props.data.classStartToEndDate}
                    onChange={e => props._handleClassInput(props.sequence, e.target.name, e.target.value)} />
                {/* {errors[classStartToEndDate] && touched[classStartToEndDate] ? <ErrorMessage message={errors[classStartToEndDate]} /> : null} */}
            </Grid>

            <Grid item xs={1} >课程地点</Grid>
            <Grid item xs={11}>
                <input name="classAddress" type="text" placeholder={"地点" + props.sequence} maxLength="100" value={props.data.classAddress}
                    onChange={e => props._handleClassInput(props.sequence, e.target.name, e.target.value)} />
                {/* {errors[classAddress] && touched[classAddress] ? <ErrorMessage message={errors[classAddress]} /> : null} */}
            </Grid>

            <Grid item xs={1} >授课老师</Grid>
            <Grid item xs={11}>
                {/* <select name="classTeachers" value={classTeachers}
                    onChange={e => props._handleClassInput(props.sequence, e.target.name, e.target.value)} >
                    <option value="empty">请选择负责的老师</option>
                    <option value="teacher@ffa.test">FFA Teacher</option>
                    <option value="3">C</option>
                    <option value="4">D</option>
                </select> */}
            </Grid>
        </Grid>
    )
}

class SchoolCourseInformation extends React.Component {
    state = {
        conference_id: '',

        academicTerm: '',
        courseLocation: '',
        subjectName: '',
        courseType: '',

        courseCode: '',
        courseName: '',
        courseAddress: '',
        courseIntroduction: '',
        courseEmphasis: '',
        courseBenefits: '',
        contactEmail: '',
        contactWechat: '',
        contactNumber: '',
        // essentialCourse: 1,

        enrollmenetStartDate: '',
        enrollmenetEndDate: '',

        courseQuota: '',
        courseCredits: '',

        courseFees: '',
        expectedFees: '',
        actualFees: '',

        conference_officers: [],
        conference_sections: [],
    }

    componentDidMount() {
        if (this.props.auth.relatedData.course.conferenceId) {
            this._getConferenceDetailByUser();
        }
    }

    _getConferenceDetailByUser = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body[0];

            this.setState({
                conference_id: theList.conference_id,

                academicTerm: theList.academic_term,
                courseLocation: theList.location,
                subjectName: theList.subject,
                courseType: theList.type,

                courseCode: theList.code,
                courseName: theList.name,
                courseAddress: theList.address,
                courseIntroduction: theList.introduction,
                courseEmphasis: theList.emphasis,
                courseBenefits: theList.benefit,
                contactEmail: theList.email,
                contactWechat: theList.wechat,
                contactNumber: theList.phone,
                essentialCourse: '',

                enrollmenetStartDate: theList.enrollmenet_start_date || 1565798300000,
                enrollmenetEndDate: theList.enrollment_end_date || 1565798400000,

                courseQuota: theList.quota,
                courseCredits: theList.credit,

                courseFees: theList.fee,
                expectedFees: theList.expected_fee,
                actualFees: theList.actual_fee,

                conference_sections: theList.conference_sections,
                conference_officers: theList.conference_officers,
            });

            // const data = {
            //     ...this.props.auth.relatedData.course,
            //     code: theList.code,
            // }
            // this.props.setRelatedCourseDataP(data);
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        let params = {
            conference_id: this.props.auth.relatedData.course.conferenceId,
            $expand: 'conference_sections/teachers/user,conference_officers',
        }
        apiConferences.getConferenceDetailByUser(params, this.props.auth.token, cb, eCb);
    }

    //** form handle input start **/
    _handleFormInput = (key, selectionString) => {
        this.setState({
            [key]: selectionString,
        });
    }

    _handleAddClass = () => {
        this.setState({
            ...this.state,
            conference_sections: {
                ...this.state.conference_sections,

            }
        })
    }
    //** form handle input end **/

    // handleSubmit = (values, { setinputError }) => {
    handleSubmit = () => {
        if (this.props.auth.relatedData.course.conferenceId) {
            this.editConferenceInfo();
        } else {
            this.createConferenceWithEnterInfo();
        }
    }

    // delete
    deleteConferenceByConferenceId = () => {

        if (this.props.auth.relatedData.course.conferenceId !== null) {

            const cb = (obj) => {
                // console.log("cb : ", obj);
                this.props.history.goBack();
            }

            const eCb = (obj) => {
                console.log("eCb : ", obj);
            }

            apiConferences.deleteConference(this.props.auth.relatedData.course.conferenceId, this.props.auth.token, cb, eCb);

        } else {

            console.log('redux_conferenceId is empty');
        }
    }

    render() {
        // const { classes, t, i18n } = this.props;

        const { classes
            //, t, i18n
        } = this.props;

        console.log(this.state);

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">S1-001品牌盈利模式</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <Grid container spacing={16} alignItems="center">
                                    <Grid item xs={1} >
                                        学期
                                    </Grid>
                                    <Grid item xs={11}>
                                        <select name="academicTerm" value={this.state.academicTerm}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        >
                                            <option value="2019-20">2019-20</option>
                                            <option value="2020-21">2020-21</option>
                                            <option value="2021-22">2021-22</option>
                                            <option value="2022-23">2022-23</option>
                                        </select>
                                    </Grid>

                                    <Grid item xs={1} >
                                        上课城市
                                    </Grid>
                                    <Grid item xs={11}>
                                        <select name="courseLocation" value={this.state.courseLocation}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        >
                                            <option value="杭州">杭州</option>
                                            <option value="北京">北京</option>
                                            <option value="上海">上海</option>
                                            <option value="香港">香港</option>
                                        </select>
                                    </Grid>

                                    <Grid item xs={1} >
                                        学科名称
                                    </Grid>
                                    <Grid item xs={11}>
                                        <select name="subjectName" value={this.state.subjectName}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        >
                                            <option value="d4314518-5a20-4bc4-ad6a-35ad44c16647">战略课程</option>
                                            <option value="6e90c530-869d-46d3-8655-b229da34935e">商品管理系列课程</option>
                                            <option value="3de02f4e-1c58-49e5-8b80-390346c94ad2">设计应用系列课程</option>
                                            <option value="4ca84f07-e091-4868-87d2-671b3d1ce0d6">开发流程系列课程</option>
                                        </select>
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程类型
                                    </Grid>
                                    <Grid item xs={11}>
                                        <select name="courseType" value={this.state.courseType}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        >
                                            <option value="test-type">test-type</option>
                                            <option value="开发流程课程">开发流程课程</option>
                                            <option value="设计应用课程">设计应用课程</option>
                                            <option value="专业人才发展课程">专业人才发展课程</option>
                                            <option value="大商品公开课程">大商品公开课程</option>
                                            <option value="商品管理课程">商品管理课程</option>
                                            <option value="海外联合课程">海外联合课程</option>
                                        </select>
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程编号
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseCode" type="text" placeholder="课程编号" maxLength="100" value={this.state.courseCode}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseCode && touched.courseCode ? <ErrorMessage message={errors.courseCode} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程名称
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseName" type="text" placeholder="课程名称" maxLength="100" value={this.state.courseName}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseName && touched.courseName ? <ErrorMessage message={errors.courseName} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程地址
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseAddress" type="text" placeholder="课程地址" maxLength="100" value={this.state.courseAddress}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseAddress && touched.courseAddress ? <ErrorMessage message={errors.courseAddress} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程简介
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseIntroduction" type="text" placeholder="课程简介" maxLength="100" value={this.state.courseIntroduction}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseIntroduction && touched.courseIntroduction ? <ErrorMessage message={errors.courseIntroduction} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程重点
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseEmphasis" type="text" placeholder="课程重点" maxLength="100" value={this.state.courseEmphasis}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseEmphasis && touched.courseEmphasis ? <ErrorMessage message={errors.courseEmphasis} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程收益
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseBenefits" type="text" placeholder="课程收益" maxLength="100" value={this.state.courseBenefits}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseBenefits && touched.courseBenefits ? <ErrorMessage message={errors.courseBenefits} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        联系电邮
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="contactEmail" type="text" placeholder="联系电邮" maxLength="100" value={this.state.contactEmail}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.contactEmail && touched.contactEmail ? <ErrorMessage message={errors.contactEmail} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        联系微信
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="contactWechat" type="text" placeholder="联系微信" maxLength="100" value={this.state.contactWechat}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.contactWechat && touched.contactWechat ? <ErrorMessage message={errors.contactWechat} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        联系电话
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="contactNumber" type="text" placeholder="联系电话" maxLength="100" value={this.state.contactNumber}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.contactNumber && touched.contactNumber ? <ErrorMessage message={errors.contactNumber} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        先修课程
                                    </Grid>
                                    <Grid item xs={11}>
                                        <select>
                                            <option value="1">课程1</option>
                                            <option value="2">课程2</option>
                                            <option value="3">课程3</option>
                                            <option value="4">课程4</option>
                                        </select>
                                    </Grid>

                                    <Grid item xs={1} >
                                        报名开始
                                    </Grid>
                                    <Grid item xs={11}>
                                        <select name="enrollmenetStartDate" value={this.state.enrollmenetStartDate}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        >
                                            <option value={1565798300000}>{dateToDayMonthYear(1565798300000)}</option>
                                            <option value={1565797400000}>{dateToDayMonthYear(1565797400000)}</option>
                                            <option value={1565798400000}>{dateToDayMonthYear(1565798400000)}</option>
                                        </select>
                                    </Grid>

                                    <Grid item xs={1} >
                                        报名结束
                                    </Grid>
                                    <Grid item xs={11}>
                                        <select name="enrollmenetEndDate" value={this.state.enrollmenetEndDate}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        >
                                            <option value={1565798300000}>{dateToDayMonthYear(1565798300000)}</option>
                                            <option value={1565797400000}>{dateToDayMonthYear(1565797400000)}</option>
                                            <option value={1565798400000}>{dateToDayMonthYear(1565798400000)}</option>
                                        </select>
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程名额
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseQuota" type="text" placeholder="课程名额" maxLength="100" value={this.state.courseQuota}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseQuota && touched.courseQuota ? <ErrorMessage message={errors.courseQuota} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程学分
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseCredits" type="text" placeholder="课程学分" maxLength="100" value={this.state.courseCredits}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseCredits && touched.courseCredits ? <ErrorMessage message={errors.courseCredits} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程费用
                                   </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseFees" type="text" placeholder="课程费用" maxLength="100" value={this.state.courseFees}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseFees && touched.courseFees ? <ErrorMessage message={errors.courseFees} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        预计学费
                                     </Grid>
                                    <Grid item xs={11}>
                                        <input name="expectedFees" type="text" placeholder="预计学费" maxLength="100" value={this.state.expectedFees}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.expectedFees && touched.expectedFees ? <ErrorMessage message={errors.expectedFees} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        实际收费
                                   </Grid>
                                    <Grid item xs={11}>
                                        <input name="actualFees" type="text" placeholder="实际收费" maxLength="100" value={this.state.actualFees}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.actualFees && touched.actualFees ? <ErrorMessage message={errors.actualFees} /> : null} */}
                                    </Grid>

                                    <Grid item xs={12} >&nbsp;</Grid>
                                </Grid>

                                <Grid container spacing={16} alignItems="center">
                                    <Grid item xs={12} >课程日期和时间</Grid>
                                </Grid>

                                {(this.state.conference_sections.map(
                                    (data, i) => {
                                        return (
                                            <Block
                                                key={data.conference_section_id}
                                                sequence={i + 1}
                                                data={data}
                                                _handleClassInput={this._handleClassInput}
                                            />
                                        )
                                    }
                                ))}

                                <Grid container spacing={16} alignItems="center">
                                    <Grid item xs={12} className="mt20">
                                        <Button className={classes.greenButton} onClick={() => this._handleAddClass()}>添加上課日子</Button>&nbsp;
                                        <Button className={classes.greyButton} onClick={() => this._handleSubClass()}>删减上課日子</Button>
                                    </Grid>
                                </Grid>

                                <div className="bottomControl clearfix">

                                    {this.props.auth.relatedData.course.conferenceId
                                        ?
                                        <span className="right">
                                            <Button onClick={() => this.deleteConferenceByConferenceId()} className={classes.blackButton}>删除</Button>
                                            <Button onClick={() => this.handleSubmit()} className={classes.greyButton}>编辑资料</Button>
                                        </span>
                                        :
                                        <span className="right">
                                            <Button onClick={() => this.handleSubmit()} className={classes.blackButton}>确认</Button>
                                        </span>
                                    }
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

    setRelatedCourseDataP: data => dispatch(setRelatedCourseData(data)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseInformation))));
