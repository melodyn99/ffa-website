// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
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
import { setRelatedData } from '../../../Redux/Action/authAction';

// Utils
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { dateToDayMonthYear } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ErrorMessage from '../../../components/01General/ErrorMessage';
// import { ContactsOutlined } from '@material-ui/icons';
// import data from '../../data/09Account/EnrollmentHistory';

function Block(props) {
    return (
        <Grid container spacing={16} alignItems="center" className="mt20">
            <Grid item xs={12} >#{props.i + 1}</Grid>

            <Grid item xs={1} >课程标题</Grid>
            <Grid item xs={11}>
                <Field name={"className" + props.i} type="text" placeholder={"第" + (props.i + 1) + "课"} maxLength="100" />
                {props.errors[props.className] && props.touched[props.className] ? <ErrorMessage message={props.errors[props.className]} /> : null}
            </Grid>

            <Grid item xs={1} >课程日期</Grid>
            <Grid item xs={11}>
                <Field name={"classDate" + props.i} type="text" placeholder="2019 / 3 / 22" maxLength="100" />
                {props.errors[props.classDate] && props.touched[props.classDate] ? <ErrorMessage message={props.errors[props.classDate]} /> : null}
            </Grid>

            <Grid item xs={1} >课程地点</Grid>
            <Grid item xs={11}>
                <Field name={"classLocation" + props.i} type="text" placeholder="5号厅" maxLength="100" />
                {props.errors[props.classLocation] && props.touched[props.classLocation] ? <ErrorMessage message={props.errors[props.classLocation]} /> : null}
            </Grid>

            <Grid item xs={1} >授课老师</Grid>
            <Grid item xs={11}>
                <select name={"classTeacher" + props.i}>
                    <option value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                    <option value="4">D</option>
                </select>
            </Grid>
        </Grid>
    )
}

class SchoolCourseInformation extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         courseCode: 56789,
    //         courseName: 'Cooking Course',
    //         courseAddress: 'Hong Kong'
    //     }
    // }
    state = {
        academicTerm: '2019-20',
        courseLocation: '杭州',
        subjectName: '4ca84f07-e091-4868-87d2-671b3d1ce0d6',
        courseType: '开发流程课程',

        courseCode: '',
        courseName: '',
        courseAddress: '',
        courseIntroduction: '',
        courseEmphasis: '',
        courseBenefits: '',
        contactEmail: '',
        contactWechat: '',
        contactNumber: '',
        essentialCourse: '',

        enrollmenetStartDate: 1565798300000,
        enrollmenetEndDate: 1565798300000,

        courseQuota: '',
        courseCredits: '',

        courseFees: '',
        expectedFees: '',
        actualFees: '',

        conference_sections: []
    }

    componentDidMount() {
        const redux_conferenceId = this.props.auth.relatedData.conferenceId || null;
        if (redux_conferenceId !== null) {
            this._getConferenceDefailByUser();
        }
    }

    _getConferenceDefailByUser = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body[0];
            // console.log("theList: " + JSON.stringify(theList, null, 2));

            this.setState({
                academicTerm: theList.academic_term,
                courseLocation: theList.courseLocation,
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
                enrollmenetEndDate: theList.enrollment_end_date || 1565798300000,

                courseQuota: theList.quota,
                courseCredits: theList.credit,

                courseFees: theList.fee,
                expectedFees: theList.expected_fee,
                actualFees: theList.actual_fee,

                // conference_sections: theList.conference_sections
                conference_sections: theList.conference_sections.sort(function (a, b) {
                    return a.value - b.value;
                }),
            });

            const data = {
                ...this.props.auth.relatedData,
                courseCode: theList.code,
            }
            this.props.setRelatedDataP(data);

        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        let params = {
            conference_id: this.props.auth.relatedData.conferenceId,
            'conference_officers/user': this.props.auth.userInfo.username,
            $expand: 'subject,conference_sections/teachers/user',
        }

        apiConferences.getConferenceDefailByUser(params, this.props.auth.token, cb, eCb);
    }

    //** form handle input start **/
    // post
    createConferenceWithEnterInfo = () => {
        const cb = (obj) => {
            // console.log("cb : ", obj);

            const data = {
                ...this.props.auth.relatedData,
                conferenceId: obj.body.conference_id,
            }
            this.props.setRelatedDataP(data);
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            active: true,
            name: this.state.courseName,
            academic_year: this.state.academicTerm.substring(0, 4),
            academic_term: this.state.academicTerm,
            location: this.state.courseLocation,
            subject: this.state.subjectName,
            type: this.state.courseType,
            code: this.state.courseCode,
            address: this.state.courseAddress,
            enrollmenet_start_date: 1565797400000,
            enrollment_end_date: 1565798400000,
            credit_requirement: 2019,
            fee: this.state.courseFees,
            expected_fee: this.state.expectedFees,
            actual_fee: this.state.actualFees,
            discount: 0,
            quota: this.state.courseQuota,
            credit: this.state.courseCredits,
            introduction: this.state.courseIntroduction,
            emphasis: this.state.courseEmphasis,
            benefit: this.state.courseBenefits,
            email: this.state.contactEmail,
            wechat: this.state.contactWechat,
            phone: this.state.contactNumber,
            // conference_sections: [
            //     {
            //         title: "第1课 - 介绍",
            //         sequence: 1,
            //         start_date: 1570323600000,
            //         end_date: 1570356000000,
            //         location: "杭州",
            //         address: "新城东方君悦水星厅",
            //         teachers: [
            //             { user: "teacher@ffa.test", sequence: 1 }
            //         ]
            //     }
            // ],
            conference_sections: this.state.conference_sections,
            conference_officers: [
                { user: this.props.auth.userInfo.username }
            ]
        }
        console.log(params);
        apiConferences.createConference(params, this.props.auth.token, cb, eCb);
    }

    // put
    editConferenceInfo = () => {
        const redux_conferenceId = this.props.auth.relatedData.conferenceId || null;

        if (redux_conferenceId !== null) {
            const cb = (obj) => {
                // console.log("cb : ", obj);

                // const data = {
                //     ...this.props.auth.relatedData,
                //     conferenceId: obj.body.conference_id,
                // }
                // this.props.setRelatedDataP(data);
            }
            const eCb = (obj) => {
                console.log("eCb : ", obj);
            }

            const params = {
                active: true,
                name: this.state.courseName,
                academic_year: this.state.academicTerm.substring(0, 4),
                academic_term: this.state.academicTerm,
                location: this.state.courseLocation,
                subject: this.state.subjectName,
                type: this.state.courseType,
                code: this.state.courseCode,
                address: this.state.courseAddress,
                enrollmenet_start_date: this.state.enrollmenetStartDate,
                enrollment_end_date: this.state.enrollmenetEndDate,
                credit_requirement: 2019,
                fee: this.state.courseFees,
                expected_fee: this.state.expectedFees,
                actual_fee: this.state.actualFees,
                discount: 0,
                quota: this.state.courseQuota,
                credit: this.state.courseCredits,
                introduction: this.state.courseIntroduction,
                emphasis: this.state.courseEmphasis,
                benefit: this.state.courseBenefits,
                email: this.state.contactEmail,
                wechat: this.state.contactWechat,
                phone: this.state.contactNumber,
                conference_sections: this.state.conference_sections,
            }
            console.log(params);
            // apiConferences.editConference(redux_conferenceId, params, this.props.auth.token, cb, eCb);
        } else
            console.log('redux_conferenceId is empty');
    }

    // delete
    deleteConferenceByConferenceId = () => {
        const redux_conferenceId = this.props.auth.relatedData.conferenceId || null;

        if (redux_conferenceId !== null) {
            // const cb = (obj) => {
            //     // console.log("cb : ", obj);
            //     this.props.history.goBack();
            // }
            // const eCb = (obj) => {
            //     console.log("eCb : ", obj);
            // }

            // apiConferences.deleteConference(redux_conferenceId, this.props.auth.token, cb, eCb);
        } else
            console.log('redux_conferenceId is empty');
    }

    // Tools
    _handleAddMore = () => {
        // console.log('AddMore');
        this.setState({
            ...this.state,
            conference_sections: [
                ...this.state.conference_sections,
                {
                    conference_section_id: '',
                    conference: '',
                    sequence: '',
                    start_date: '',
                    end_date: '',
                    location: '',
                    address: '',
                }]
        });
    }

    _handleInput = (key, value) => {
        console.log(value);
        this.setState({
            ...this.state,
            [key]: value
        })
    }

    _handleSelect = (key, selectionString) => {
        // console.log(selectionString);

        this.setState({
            [key]: selectionString,
        });
    }
    //** form handle input end **/

    handleSubmit = (values, { setFieldError }) => {
        // console.log('GREAT!');

        const redux_conferenceId = this.props.auth.relatedData.conferenceId || null;
        if (redux_conferenceId !== null) {
            this.editConferenceInfo();
        } else {
            this.createConferenceWithEnterInfo();
        }
        // const body = {
        //     conference_sections:[

        //     ]
        // };
        console.log(values);
    }

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n
        } = this.props;
        const {
            academicTerm,
            courseLocation,
            subjectName,
            courseType,

            enrollmenetStartDate,
            enrollmenetEndDate,
        } = this.state;
        const redux_conferenceId = this.props.auth.relatedData.conferenceId || null;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1} >
                        学期
                    </Grid>
                    <Grid item xs={11}>
                        <select value={academicTerm} onChange={e => { this._handleSelect('academicTerm', e.target.value) }}>
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
                        <select value={courseLocation} onChange={e => { this._handleSelect('courseLocation', e.target.value) }}>
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
                        <select value={subjectName} onChange={e => { this._handleSelect('subjectName', e.target.value) }}>
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
                        <select value={courseType} onChange={e => { this._handleSelect('courseType', e.target.value) }}>
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
                        <Field name="courseCode" type="text" placeholder="课程编号" maxLength="100"
                            onChange={e => { this._handleSelect('courseCode', e.target.value) }} />
                        {errors.courseCode && touched.courseCode ? <ErrorMessage message={errors.courseCode} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程名称
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseName" type="text" placeholder="课程名称" maxLength="100"
                            onChange={e => { this._handleSelect('courseName', e.target.value) }} />
                        {errors.courseName && touched.courseName ? <ErrorMessage message={errors.courseName} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程地址
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseAddress" type="text" placeholder="课程地址" maxLength="100"
                            onChange={e => { this._handleSelect('courseAddress', e.target.value) }} />
                        {errors.courseAddress && touched.courseAddress ? <ErrorMessage message={errors.courseAddress} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程简介
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseIntroduction" type="text" placeholder="课程简介" maxLength="100"
                            onChange={e => { this._handleSelect('courseIntroduction', e.target.value) }} />
                        {errors.courseIntroduction && touched.courseIntroduction ? <ErrorMessage message={errors.courseIntroduction} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程重点
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseEmphasis" type="text" placeholder="课程重点" maxLength="100"
                            onChange={e => { this._handleSelect('courseEmphasis', e.target.value) }} />
                        {errors.courseEmphasis && touched.courseEmphasis ? <ErrorMessage message={errors.courseEmphasis} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程收益
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseBenefits" type="text" placeholder="课程收益" maxLength="100"
                            onChange={e => { this._handleSelect('courseBenefits', e.target.value) }} />
                        {errors.courseBenefits && touched.courseBenefits ? <ErrorMessage message={errors.courseBenefits} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        联系电邮
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="contactEmail" type="text" placeholder="联系电邮" maxLength="100"
                            onChange={e => { this._handleSelect('contactEmail', e.target.value) }} />
                        {errors.contactEmail && touched.contactEmail ? <ErrorMessage message={errors.contactEmail} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        联系微信
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="contactWechat" type="text" placeholder="联系微信" maxLength="100"
                            onChange={e => { this._handleSelect('contactWechat', e.target.value) }} />
                        {errors.contactWechat && touched.contactWechat ? <ErrorMessage message={errors.contactWechat} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        联系电话
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="contactNumber" type="text" placeholder="联系电话" maxLength="100"
                            onChange={e => { this._handleSelect('contactNumber', e.target.value) }} />
                        {errors.contactNumber && touched.contactNumber ? <ErrorMessage message={errors.contactNumber} /> : null}
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
                        <select value={enrollmenetStartDate} onChange={e => { this._handleSelect('enrollmenetStartDate', e.target.value) }}>
                            <option value="1565798300000">{dateToDayMonthYear(1565798300000)}</option>
                            <option value="1565798400000">{dateToDayMonthYear(1565798400000)}</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >
                        报名结束
                    </Grid>
                    <Grid item xs={11}>
                        <select value={enrollmenetEndDate} onChange={e => { this._handleSelect('enrollmenetEndDate', e.target.value) }}>
                            <option value="1565798300000">{dateToDayMonthYear(1565798300000)}</option>
                            <option value="1565798400000">{dateToDayMonthYear(1565798400000)}</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >
                        课程名额
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseQuota" type="text" placeholder="课程名额" maxLength="100"
                            onChange={e => { this._handleSelect('courseQuota', e.target.value) }} />
                        {errors.courseQuota && touched.courseQuota ? <ErrorMessage message={errors.courseQuota} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程学分
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseCredits" type="text" placeholder="课程学分" maxLength="100"
                            onChange={e => { this._handleSelect('courseCredits', e.target.value) }} />
                        {errors.courseCredits && touched.courseCredits ? <ErrorMessage message={errors.courseCredits} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程费用
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseFees" type="text" placeholder="课程费用" maxLength="100"
                            onChange={e => { this._handleSelect('courseFees', e.target.value) }} />
                        {errors.courseFees && touched.courseFees ? <ErrorMessage message={errors.courseFees} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        预计学费
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="expectedFees" type="text" placeholder="预计学费" maxLength="100"
                            onChange={e => { this._handleSelect('expectedFees', e.target.value) }} />
                        {errors.expectedFees && touched.expectedFees ? <ErrorMessage message={errors.expectedFees} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        实际收费
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="actualFees" type="text" placeholder="实际收费" maxLength="100"
                            onChange={e => { this._handleSelect('actualFees', e.target.value) }} />
                        {errors.actualFees && touched.actualFees ? <ErrorMessage message={errors.actualFees} /> : null}
                    </Grid>

                    <Grid item xs={12} >&nbsp;</Grid>

                    <Grid container spacing={16} alignItems="center">
                        <Grid item xs={12} >课程日期和时间</Grid>
                        <Grid item xs={12} >
                            {(this.state.conference_sections.map(
                                (data, i) => {
                                    // console.log(data);
                                    return (
                                        <Block
                                            key={i}
                                            i={i}
                                            className={this.state.conference_sections.className}
                                            classDate={"classDate" + i}
                                            classLocation={"classLocation" + i}
                                            classTeacher={"classTeacher" + i}
                                            errors={errors}
                                            touched={touched}
                                        />
                                    )
                                }
                            ))}
                        </Grid>
                    </Grid>

                    <Grid item xs={12} className="mt20">
                        <Button className={classes.greyButton} onClick={this._handleAddMore}>添加上課日子</Button>
                    </Grid>
                </Grid>

                <div className="bottomControl clearfix">

                    {redux_conferenceId
                        ?
                        <span className="right">
                            <Button onClick={() => this.deleteConferenceByConferenceId()} className={classes.blackButton}>删除</Button>
                            <Button type="submit" className={classes.greyButton}>编辑资料</Button>
                        </span>
                        :
                        <span className="right">
                            <Button type="submit" className={classes.blackButton}>确认</Button>

                        </span>
                    }
                </div>
            </Form >
        )
    }

    render() {
        // const { classes, t, i18n } = this.props;
        const {
            academicTerm,
            courseLocation,
            subjectName,
            courseType,

            courseCode,
            courseName,
            courseAddress,
            courseIntroduction,
            courseEmphasis,
            courseBenefits,
            contactEmail,
            contactWechat,
            contactNumber,
            // essentialCourse,

            enrollmenetStartDate,
            enrollmenetEndDate,

            courseQuota,
            courseCredits,

            courseFees,
            expectedFees,
            actualFees,
        } = this.state;

        // console.log('SchoolCourseInformation_render: ' + JSON.stringify(conferenceList, null, 2));

        const Schema = Yup.object().shape({
            courseCode: Yup.string()
                .required('Course Code is required'),
            courseName: Yup.string()
                .required('Course Name is required'),
            courseAddress: Yup.string()
                .required('Course Address is required'),
            courseIntroduction: Yup.string()
                .required('Course Introduction is required'),
            courseEmphasis: Yup.string()
                .required('Course Emphasis is required'),
            courseBenefits: Yup.string()
                .required('Course Benefits is required'),
            contactEmail: Yup.string()
                .email('Contact Email must be a valid email')
                .required('Contact Email is required'),
            contactWechat: Yup.number()
                .typeError('Wechat number must be a valid phone number')
                .required('WeChat number is required'),
            contactNumber: Yup.number()
                .typeError('Contact Number must be a valid phone number')
                .required('Contact Number is required'),
            courseQuota: Yup.number()
                .typeError('Course Quota must be a number')
                .required('Course Quota is required'),
            courseCredits: Yup.number()
                .typeError('Course Credits must be a number')
                .required('Course Credits is required'),
            courseFees: Yup.number()
                .typeError('Course Fees must be a number')
                .required('Course Fees is required'),
            expectedFees: Yup.number()
                .typeError('Expected Fees must be a number')
                .required('Expected Fees is required'),
            actualFees: Yup.number()
                .typeError('Actual Fees must be a number')
                .required('Actual Fees is required'),

            // conference_sections: Yup
            //     .array()
            //     .of(
            //         Yup.object().shape({
            //             className: Yup.string().required('Class Name is required'),
            //             classDate: Yup.string().required('Class Date is required'),
            //             classLocation: Yup.string().required('Class Location is required'),
            //             classTeacher: Yup.string().required('Class Location is required'),
            //         })
            //     )

            // className0: Yup.string().required('Class1 Name is required'),
            // classDate0: Yup.string().required('Class1 Date is required'),
            // classLocation0: Yup.string().required('Class1 Location is required'),
            // classTeacher0: Yup.string().required('Class1 Location is required'),
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
                                        academicTerm: academicTerm,
                                        courseLocation: courseLocation,
                                        subjectName: subjectName,
                                        courseType: courseType,

                                        courseCode: courseCode,
                                        courseName: courseName,
                                        courseAddress: courseAddress,
                                        courseIntroduction: courseIntroduction,
                                        courseEmphasis: courseEmphasis,
                                        courseBenefits: courseBenefits,
                                        contactEmail: contactEmail,
                                        contactWechat: contactWechat,
                                        contactNumber: contactNumber,
                                        // essentialCourse: '',

                                        enrollmenetStartDate: enrollmenetStartDate,
                                        enrollmenetEndDate: enrollmenetEndDate,

                                        courseQuota: courseQuota,
                                        courseCredits: courseCredits,

                                        courseFees: courseFees,
                                        expectedFees: expectedFees,
                                        actualFees: actualFees,

                                        // className0: '',
                                        // classDate0: '',
                                        // classLocation0: '',
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

SchoolCourseInformation.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

    setRelatedDataP: data => dispatch(setRelatedData(data)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseInformation))));