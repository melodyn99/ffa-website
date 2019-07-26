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
import { setRelatedCourseData } from '../../../Redux/Action/authAction';

// Utils
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { dateToDayMonthYear, timeStampsToRange, rangeToTimeStamps } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ErrorMessage from '../../../components/01General/ErrorMessage';
// import { ContactsOutlined } from '@material-ui/icons';
// import data from '../../data/09Account/EnrollmentHistory';

function Block(props) {
    const i = props.i;
    const className = props.className;
    const classStartToEndDate = props.classStartToEndDate;
    const classAddress = props.classAddress;
    // const classTeachers = props.classTeachers;
    const errors = props.errors;
    const touched = props.touched;
    return (
        <Grid container spacing={16} alignItems="center" className="mt20">
            <Grid item xs={12} >#{(i + 1)}</Grid>

            <Grid item xs={1} >课程标题</Grid>
            <Grid item xs={11}>
                <Field name={"className" + (i + 1)} type="text" placeholder={"第" + (i + 1) + "课"} maxLength="100" />
                {errors[className] && touched[className] ? <ErrorMessage message={errors[className]} /> : null}
            </Grid>

            <Grid item xs={1} >课程日期</Grid>
            <Grid item xs={11}>
                <Field name={"classStartToEndDate" + (i + 1)} type="text" placeholder="2019-12-13, 13:00 - 15:00" maxLength="100" />
                {errors[classStartToEndDate] && touched[classStartToEndDate] ? <ErrorMessage message={errors[classStartToEndDate]} /> : null}
            </Grid>

            <Grid item xs={1} >课程地点</Grid>
            <Grid item xs={11}>
                <Field name={"classAddress" + (i + 1)} type="text" placeholder={"地点" + (i + 1)} maxLength="100" />
                {errors[classAddress] && touched[classAddress] ? <ErrorMessage message={errors[classAddress]} /> : null}
            </Grid>

            <Grid item xs={1} >授课老师</Grid>
            <Grid item xs={11}>
                <Field component="select" name={"classTeachers" + (i + 1)} >
                    <option value="teacher@ffa.test">FFA Teacher</option>
                    <option value="2">B</option>
                    <option value="3">C</option>
                    <option value="4">D</option>
                </Field>
            </Grid>
        </Grid>
    )
}

class SchoolCourseInformation extends React.Component {
    state = {
        conference_id: null,

        academicTerm: '2022-23',
        courseLocation: '香港',
        subjectName: '4ca84f07-e091-4868-87d2-671b3d1ce0d6',
        courseType: '开发流程课程',

        courseCode: 'CC24072019_0',
        courseName: '课程24072019_0',
        courseAddress: 'addr',
        courseIntroduction: 'intro',
        courseEmphasis: 'emph',
        courseBenefits: 'bene',
        contactEmail: 'testing01@ffa.com',
        contactWechat: '1',
        contactNumber: '1',
        // essentialCourse: '',

        enrollmenetStartDate: 1565798300000,
        enrollmenetEndDate: 1565798400000,

        courseQuota: '1',
        courseCredits: '1',

        courseFees: '1',
        expectedFees: '10000',
        actualFees: '1',

        conference_sections: [],
    }

    componentDidMount() {
        const redux_conferenceId = this.props.auth.relatedData.course.conferenceId || null;
        if (redux_conferenceId !== null) {
            this._getConferenceDefailByUser();
        }
        // console.log(dayMonthYearTimeToTimeStamps("2020-09-01 18:06"));
        // console.log(rangeToTimeStamps("2019-08-14, 23:58 - 00:00"));
    }

    _getConferenceDefailByUser = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body[0];
            // console.log(theList);
            let converted_conference_sections = [];
            theList.conference_sections.sort(function (a, b) {
                return a.sequence - b.sequence;
            }).map((n, i) => {
                let the_classTeachers = [];
                if (n.teachers[0]) {
                    the_classTeachers = [
                        {
                            instructor_id: n.teachers[0].instructor_id,
                            user: n.teachers[0].user,
                            conference_section: n.teachers[0].conference_section,
                            sequence: n.teachers[0].sequence,
                            checked_in: n.teachers[0].checked_in,
                            location: n.teachers[0].location,
                        }
                    ];
                }
                const convertedArray = {
                    conference_section_id: n.conference_section_id,
                    conference: n.conference,
                    sequence: n.sequence,
                    start_date: parseInt(n.start_date),
                    end_date: parseInt(n.end_date),
                    classStartToEndDate: timeStampsToRange(n.start_date, n.end_date) || '',
                    location: n.location,
                    address: n.address,
                    teachers: the_classTeachers,
                    title: n.title,
                }
                return converted_conference_sections.push(convertedArray);
            });

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

                conference_sections: converted_conference_sections,
                conference_officers: theList.conference_officers,
            });

            const data = {
                ...this.props.auth.relatedData.course,
                code: theList.code,
            }
            this.props.setRelatedCourseDataP(data);
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        let params = {
            conference_id: this.props.auth.relatedData.course.conferenceId,
            $expand: 'conference_sections/teachers,conference_officers',
        }
        apiConferences.getConferenceDefailByUser(params, this.props.auth.token, cb, eCb);
    }

    //** form handle input start **/
    convertForm_conference_sections = (formInput) => {
        // console.log("convertForm_conference_sections() formInput");
        // console.log(formInput);
        let the_conference_sections = [];
        const classLength = this.state.conference_sections.length || 0;
        if (classLength !== 0) {
            for (let i = 1; i <= classLength; i++) {
                //2019-08-14, 23:58 - 00:00
                // dayMonthYearTimeToTimeStamps("2020-09-01 18:06")
                const convertedDate = rangeToTimeStamps(formInput["classStartToEndDate" + i]);

                let theClass = {}
                const isNewCreateClass = formInput["classId" + i] && formInput["classTeachers" + i].instructor_id && formInput["classTeachers" + i].conference_section;
                if (!formInput.conference_id) {
                    theClass = {
                        // conference_section_id: formInput["classId" + i],
                        // conference: formInput.conference_id,
                        sequence: i,
                        start_date: parseInt(convertedDate[0]),
                        end_date: parseInt(convertedDate[1]),
                        classStartToEndDate: formInput["classStartToEndDate" + i],
                        location: formInput.courseLocation,
                        address: formInput["classAddress" + i],
                        teachers: [
                            {
                                // instructor_id: formInput["classTeachers" + i].instructor_id,
                                user: formInput["classTeachers" + i].user,
                                // conference_section: formInput["classTeachers" + i].conference_section,
                                sequence: formInput["classTeachers" + i].sequence,
                                checked_in: formInput["classTeachers" + i].checked_in,
                                location: formInput["classTeachers" + i].location,
                            }
                        ],
                        title: formInput["className" + i],
                    }
                } else if (isNewCreateClass) {
                    theClass = {
                        conference_section_id: formInput["classId" + i],
                        conference: formInput.conference_id,
                        sequence: i,
                        start_date: parseInt(convertedDate[0]),
                        end_date: parseInt(convertedDate[1]),
                        classStartToEndDate: formInput["classStartToEndDate" + i],
                        location: formInput.courseLocation,
                        address: formInput["classAddress" + i],
                        teachers: [
                            {
                                instructor_id: formInput["classTeachers" + i].instructor_id,
                                user: formInput["classTeachers" + i].user,
                                conference_section: formInput["classTeachers" + i].conference_section,
                                sequence: formInput["classTeachers" + i].sequence,
                                checked_in: formInput["classTeachers" + i].checked_in,
                                location: formInput["classTeachers" + i].location,
                            }
                        ],
                        title: formInput["className" + i],
                    }
                } else {
                    theClass = {
                        // conference_section_id: formInput["classId" + i],
                        conference: formInput.conference_id,
                        sequence: i,
                        start_date: parseInt(convertedDate[0]),
                        end_date: parseInt(convertedDate[1]),
                        classStartToEndDate: formInput["classStartToEndDate" + i],
                        location: formInput.courseLocation,
                        address: formInput["classAddress" + i],
                        teachers: [
                            {
                                // instructor_id: formInput["classTeachers" + i].instructor_id,
                                user: formInput["classTeachers" + i].user,
                                // conference_section: formInput["classTeachers" + i].conference_section,
                                sequence: formInput["classTeachers" + i].sequence,
                                checked_in: formInput["classTeachers" + i].checked_in,
                                location: formInput["classTeachers" + i].location,
                            }
                        ],
                        title: formInput["className" + i],
                    }
                }
                the_conference_sections.push(theClass);
            }
        }
        this.setState({
            ...this.state,
            conference_sections: the_conference_sections,
        });
        return the_conference_sections;
    }
    // post
    createConferenceWithEnterInfo = (formInput) => {
        // console.log("formInput");
        // console.log(formInput);
        const cb = (obj) => {
            // console.log("cb : ", obj);
            const data = {
                ...this.props.auth.relatedData.course,
                conferenceId: obj.body.conference_id,
            }
            this.props.setRelatedCourseDataP(data);
            this._getConferenceDefailByUser();
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const the_conference_sections = this.convertForm_conference_sections(formInput)

        let params = {
            active: true,
            name: formInput.courseName,
            academic_year: formInput.academicTerm.substring(0, 4),
            academic_term: formInput.academicTerm,
            location: formInput.courseLocation,
            subject: formInput.subjectName,
            type: formInput.courseType,
            code: formInput.courseCode,
            address: formInput.courseAddress,
            enrollmenet_start_date: 1565798300000,
            enrollment_end_date: 1565798400000,
            credit_requirement: 2019,
            fee: formInput.courseFees,
            expected_fee: formInput.expectedFees,
            actual_fee: formInput.actualFees,
            discount: 0,
            quota: formInput.courseQuota,
            credit: formInput.courseCredits,
            promotion_message: null,
            introduction: formInput.courseIntroduction,
            emphasis: formInput.courseEmphasis,
            benefit: formInput.courseBenefits,
            email: formInput.contactEmail,
            wechat: formInput.contactWechat,
            phone: formInput.contactNumber,
            teacher_image: null,
            teacher_introduction: null,
            // conference_sections: the_conference_sections,
            conference_officers: [
                {
                    user: this.props.auth.userInfo.username,
                    job_duties: null,
                }
            ],
        }

        if (the_conference_sections) {
            if (the_conference_sections.length > 0) {
                params = {
                    ...params,
                    conference_sections: the_conference_sections,
                }
            }
        }
        console.log("create's params:");
        console.log(params);
        apiConferences.createConference(params, this.props.auth.token, cb, eCb);
    }

    // put
    editConferenceInfo = (formInput) => {
        console.log("formInput:");
        console.log(formInput);
        const redux_conferenceId = this.props.auth.relatedData.course.conferenceId || null;
        const cb = (obj) => {
            // console.log("cb : ", obj);
            // const data = {
            //     ...this.props.auth.relatedData.course,
            //     conferenceId: obj.body.conference_id,
            // }
            // this.props.setRelatedCourseDataP(data);
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        if (redux_conferenceId !== null) {
            const the_conference_sections = this.convertForm_conference_sections(formInput);;
            const params = {
                conference_id: formInput.conference_id,
                active: true,
                name: formInput.courseName,
                academic_year: formInput.academicTerm.substring(0, 4),
                academic_term: formInput.academicTerm,
                location: formInput.courseLocation,
                subject: formInput.subjectName,
                type: formInput.courseType,
                code: formInput.courseCode,
                address: formInput.courseAddress,
                enrollmenet_start_date: 1565798300000,
                enrollment_end_date: 1565798400000,
                credit_requirement: 2019,
                fee: formInput.courseFees,
                expected_fee: formInput.expectedFees,
                actual_fee: formInput.actualFees,
                discount: 0,
                quota: formInput.courseQuota,
                credit: formInput.courseCredits,
                promotion_message: null,
                introduction: formInput.courseIntroduction,
                emphasis: formInput.courseEmphasis,
                benefit: formInput.courseBenefits,
                email: formInput.contactEmail,
                wechat: formInput.contactWechat,
                phone: formInput.contactNumber,
                teacher_image: null,
                teacher_introduction: null,
                conference_sections: the_conference_sections,
                conference_officers: formInput.conference_officers
            }
            console.log("edit's params:");
            console.log(params);
            apiConferences.editConference(this.props.auth.relatedData.course.conferenceId, params, this.props.auth.token, cb, eCb);
        } else
            console.log('redux_conferenceId is empty');
    }

    // delete
    deleteConferenceByConferenceId = () => {
        const redux_conferenceId = this.props.auth.relatedData.course.conferenceId || null;

        if (redux_conferenceId !== null) {
            const cb = (obj) => {
                // console.log("cb : ", obj);
                this.props.history.goBack();
            }
            const eCb = (obj) => {
                console.log("eCb : ", obj);
            }

            apiConferences.deleteConference(redux_conferenceId, this.props.auth.token, cb, eCb);
        } else
            console.log('redux_conferenceId is empty');
    }

    // Tools
    _handleAddClass = (formInput) => {
        console.log('_handleAddClass formInput');
        console.log(formInput);
        /*start add back exist class */
        let the_conference_sections = this.convertForm_conference_sections(formInput);
        const newClass = {
            // conference_section_id: null,
            conference: this.state.conference_id,
            sequence: this.state.conference_sections.length + 1,
            start_date: 1576209600000,
            end_date: 1576216800000,
            classStartToEndDate: timeStampsToRange(1576209600000, 1576216800000),
            location: this.state.courseLocation,
            address: `地点${this.state.conference_sections.length + 1}`,
            teachers: [
                {
                    // instructor_id: "",
                    user: 'teacher@ffa.test',
                    // conference_section: "",
                    sequence: 1,
                    checked_in: false,
                    location: null,
                }
            ],
            title: `第${this.state.conference_sections.length + 1}课`,
        }
        the_conference_sections.push(newClass);
        /*end add back exist class */

        if (this.props.auth.relatedData.course.conferenceId) {
            this.setState({
                conference_id: this.props.auth.relatedData.course.conferenceId,

                academicTerm: formInput.academicTerm,
                courseLocation: formInput.courseLocation,
                subjectName: formInput.subjectName,
                courseType: formInput.courseType,

                courseCode: formInput.courseCode,
                courseName: formInput.courseName,
                courseAddress: formInput.courseAddress,
                courseIntroduction: formInput.courseIntroduction,
                courseEmphasis: formInput.courseEmphasis,
                courseBenefits: formInput.courseBenefits,
                contactEmail: formInput.contactEmail,
                contactWechat: formInput.contactWechat,
                contactNumber: formInput.contactNumber,
                essentialCourse: '',

                enrollmenetStartDate: formInput.enrollmenetStartDate || 1565798300000,
                enrollmenetEndDate: formInput.enrollmenetEndDate || 1565798400000,

                courseQuota: formInput.courseQuota,
                courseCredits: formInput.courseCredits,

                courseFees: formInput.courseFees,
                expectedFees: formInput.expectedFees,
                actualFees: formInput.actualFees,

                conference_sections: the_conference_sections,
                conference_officers: formInput.conference_officers,
            });
        } else {
            this.setState({
                // conference_id: formInput.conference_id,
                academicTerm: formInput.academicTerm,
                courseLocation: formInput.courseLocation,
                subjectName: formInput.subjectName,
                courseType: formInput.courseType,

                courseCode: formInput.courseCode,
                courseName: formInput.courseName,
                courseAddress: formInput.courseAddress,
                courseIntroduction: formInput.courseIntroduction,
                courseEmphasis: formInput.courseEmphasis,
                courseBenefits: formInput.courseBenefits,
                contactEmail: formInput.contactEmail,
                contactWechat: formInput.contactWechat,
                contactNumber: formInput.contactNumber,
                essentialCourse: '',

                enrollmenetStartDate: formInput.enrollmenetStartDate || 1565798300000,
                enrollmenetEndDate: formInput.enrollmenetEndDate || 1565798400000,

                courseQuota: formInput.courseQuota,
                courseCredits: formInput.courseCredits,

                courseFees: formInput.courseFees,
                expectedFees: formInput.expectedFees,
                actualFees: formInput.actualFees,

                conference_sections: the_conference_sections,
                conference_officers: formInput.conference_officers,
            });
        }
    }

    // _handleSelection = (key, selectionString) => {
    //     this.setState({
    //         [key]: selectionString,
    //     });
    // }
    //** form handle input end **/

    handleSubmit = (values, { setFieldError }) => {
        const redux_conferenceId = this.props.auth.relatedData.course.conferenceId || null;
        if (redux_conferenceId !== null) {
            this.editConferenceInfo(values);
        } else {
            this.createConferenceWithEnterInfo(values);
        }
    }

    form = ({ values, errors, touched, handleChange }) => {
        // console.log(values);
        const { classes
            //, t, i18n
        } = this.props;
        const redux_conferenceId = this.props.auth.relatedData.course.conferenceId || null;
        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1} >
                        学期
                    </Grid>
                    <Grid item xs={11}>
                        <Field component="select" name="academicTerm">
                            <option value="2019-20">2019-20</option>
                            <option value="2020-21">2020-21</option>
                            <option value="2021-22">2021-22</option>
                            <option value="2022-23">2022-23</option>
                        </Field>
                    </Grid>

                    <Grid item xs={1} >
                        上课城市
                    </Grid>
                    <Grid item xs={11}>
                        <Field component="select" name="courseLocation">
                            <option value="杭州">杭州</option>
                            <option value="北京">北京</option>
                            <option value="上海">上海</option>
                            <option value="香港">香港</option>
                        </Field>
                    </Grid>

                    <Grid item xs={1} >
                        学科名称
                    </Grid>
                    <Grid item xs={11}>
                        <Field component="select" name="subjectName">
                            <option value="d4314518-5a20-4bc4-ad6a-35ad44c16647">战略课程</option>
                            <option value="6e90c530-869d-46d3-8655-b229da34935e">商品管理系列课程</option>
                            <option value="3de02f4e-1c58-49e5-8b80-390346c94ad2">设计应用系列课程</option>
                            <option value="4ca84f07-e091-4868-87d2-671b3d1ce0d6">开发流程系列课程</option>
                        </Field>
                    </Grid>

                    <Grid item xs={1} >
                        课程类型
                    </Grid>
                    <Grid item xs={11}>
                        <Field component="select" name="courseType">
                            <option value="test-type">test-type</option>
                            <option value="开发流程课程">开发流程课程</option>
                            <option value="设计应用课程">设计应用课程</option>
                            <option value="专业人才发展课程">专业人才发展课程</option>
                            <option value="大商品公开课程">大商品公开课程</option>
                            <option value="商品管理课程">商品管理课程</option>
                            <option value="海外联合课程">海外联合课程</option>
                        </Field>
                    </Grid>

                    <Grid item xs={1} >
                        课程编号
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseCode" type="text" placeholder="课程编号" maxLength="100" />
                        {errors.courseCode && touched.courseCode ? <ErrorMessage message={errors.courseCode} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程名称
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseName" type="text" placeholder="课程名称" maxLength="100" />
                        {errors.courseName && touched.courseName ? <ErrorMessage message={errors.courseName} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程地址
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseAddress" type="text" placeholder="课程地址" maxLength="100" />
                        {errors.courseAddress && touched.courseAddress ? <ErrorMessage message={errors.courseAddress} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程简介
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseIntroduction" type="text" placeholder="课程简介" maxLength="100" />
                        {errors.courseIntroduction && touched.courseIntroduction ? <ErrorMessage message={errors.courseIntroduction} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程重点
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseEmphasis" type="text" placeholder="课程重点" maxLength="100" />
                        {errors.courseEmphasis && touched.courseEmphasis ? <ErrorMessage message={errors.courseEmphasis} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程收益
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseBenefits" type="text" placeholder="课程收益" maxLength="100" />
                        {errors.courseBenefits && touched.courseBenefits ? <ErrorMessage message={errors.courseBenefits} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        联系电邮
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="contactEmail" type="text" placeholder="联系电邮" maxLength="100" />
                        {errors.contactEmail && touched.contactEmail ? <ErrorMessage message={errors.contactEmail} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        联系微信
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="contactWechat" type="text" placeholder="联系微信" maxLength="100" />
                        {errors.contactWechat && touched.contactWechat ? <ErrorMessage message={errors.contactWechat} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        联系电话
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="contactNumber" type="text" placeholder="联系电话" maxLength="100" />
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
                        <Field component="select" name="enrollmenetStartDate" >
                            <option value={1565798300000}>{dateToDayMonthYear(1565798300000)}</option>
                            <option value={1565797400000}>{dateToDayMonthYear(1565797400000)}</option>
                            <option value={1565798400000}>{dateToDayMonthYear(1565798400000)}</option>
                        </Field>
                    </Grid>

                    <Grid item xs={1} >
                        报名结束
                    </Grid>
                    <Grid item xs={11}>
                        <Field component="select" name="enrollmenetEndDate">
                            <option value={1565798300000}>{dateToDayMonthYear(1565798300000)}</option>
                            <option value={1565797400000}>{dateToDayMonthYear(1565797400000)}</option>
                            <option value={1565798400000}>{dateToDayMonthYear(1565798400000)}</option>
                        </Field>
                    </Grid>

                    <Grid item xs={1} >
                        课程名额
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseQuota" type="text" placeholder="课程名额" maxLength="100" />
                        {errors.courseQuota && touched.courseQuota ? <ErrorMessage message={errors.courseQuota} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程学分
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseCredits" type="text" placeholder="课程学分" maxLength="100" />
                        {errors.courseCredits && touched.courseCredits ? <ErrorMessage message={errors.courseCredits} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程费用
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseFees" type="text" placeholder="课程费用" maxLength="100" />
                        {errors.courseFees && touched.courseFees ? <ErrorMessage message={errors.courseFees} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        预计学费
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="expectedFees" type="text" placeholder="预计学费" maxLength="100" />
                        {errors.expectedFees && touched.expectedFees ? <ErrorMessage message={errors.expectedFees} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        实际收费
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="actualFees" type="text" placeholder="实际收费" maxLength="100" />
                        {errors.actualFees && touched.actualFees ? <ErrorMessage message={errors.actualFees} /> : null}
                    </Grid>

                    <Grid item xs={12} >&nbsp;</Grid>

                    <Grid container spacing={16} alignItems="center">
                        <Grid item xs={12} >课程日期和时间</Grid>
                        {/* forget */}

                        <Grid item xs={12} >
                            {(
                                this.state.conference_sections.map(
                                    (data, i) => {
                                        const classStartToEndDate = timeStampsToRange(data.start_date, data.end_date);

                                        return (
                                            <Block
                                                key={data.conference_section_id || "new" + i}
                                                i={i}
                                                className={data.title}
                                                classStartToEndDate={classStartToEndDate}
                                                classAddress={data.address}
                                                classTeachers={data.teachers}
                                                errors={errors}
                                                touched={touched}
                                            />
                                        )
                                    }
                                ))}
                        </Grid>

                    </Grid>

                    <Grid item xs={12} className="mt20">
                        <Button className={classes.greyButton} onClick={() => this._handleAddClass(values)}>添加上課日子</Button>
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
            conference_id,

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

            conference_sections,
            conference_officers,
        } = this.state;
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
            //             classAddress: Yup.string().required('Class Location is required'),
            //             classTeacher: Yup.string().required('Class Location is required'),
            //         })
            //     )

            // className0: Yup.string().required('Class1 Name is required'),
            // classDate0: Yup.string().required('Class1 Date is required'),
            // classAddress0: Yup.string().required('Class1 Location is required'),
            // classTeacher0: Yup.string().required('Class1 Location is required'),
        })

        let theInitialValues = {
            conference_id: conference_id,

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

            // className1: '1',
            // classStartToEndDate1: '1',
            // classAddress1: '1',
            // classTeachers1: '1',
            conference_officers: conference_officers,
        }
        const classCounts = conference_sections ? conference_sections.length : 0;
        // console.log(conference_sections);
        if (classCounts !== 0) {
            for (let i = 1; i <= classCounts; i++) {
                const targetClass = conference_sections[i - 1];
                // console.log("targetClass:");
                // console.log(targetClass);
                theInitialValues = {
                    ...theInitialValues,
                    ["classId" + i]: targetClass.conference_section_id,
                    ["className" + i]: targetClass.title,
                    ["classStartToEndDate" + i]: targetClass.classStartToEndDate,
                    ["classAddress" + i]: targetClass.address,
                    ["classTeachers" + i]: targetClass.teachers[0],

                }
            }

        }

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
                                    initialValues={theInitialValues}
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

    setRelatedCourseDataP: data => dispatch(setRelatedCourseData(data)),
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseInformation))));