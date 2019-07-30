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
// import { Formik, Form, input } from 'formik';
import * as Yup from 'yup';
import { dateToDayMonthYear, timeStampsToRange, rangeToTimeStamps, getTheMonent } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
// import ErrorMessage from '../../../components/01General/ErrorMessage';
// import { ContactsOutlined } from '@material-ui/icons';
// import data from '../../data/09Account/EnrollmentHistory';

function Block(props) {
    const data = props.data;
    const sequence = props.sequence;

    // console.log("props");
    // console.log(props);
    const className = data.className;
    const classStartToEndDate = data.classStartToEndDate;
    const classAddress = data.classAddress;

    const classTeachers_length = data.classTeachers.length || 0;
    let classTeachers = "empty";
    if (classTeachers_length !== 0) {
        classTeachers = data.classTeachers[0].user.username;
    }

    // const errors = props.errors;
    // const touched = props.touched;
    return (
        <Grid container spacing={16} alignItems="center" className="mt20">
            <Grid item xs={12} >#{sequence}</Grid>

            <Grid item xs={1} >课程标题</Grid>
            <Grid item xs={11}>
                <input name="className" type="text" placeholder={"第" + sequence + "课"} maxLength="100" value={className}
                    onChange={e => props._handleClassInput(sequence, e.target.name, e.target.value)} />
                {/* {errors[className] && touched[className] ? <ErrorMessage message={errors[className]} /> : null} */}
            </Grid>

            <Grid item xs={1} >课程日期</Grid>
            <Grid item xs={11}>
                <input name="classStartToEndDate" type="text" placeholder="2019-12-13, 13:00 - 15:00" maxLength="100" value={classStartToEndDate}
                    onChange={e => props._handleClassInput(sequence, e.target.name, e.target.value)} />
                {/* {errors[classStartToEndDate] && touched[classStartToEndDate] ? <ErrorMessage message={errors[classStartToEndDate]} /> : null} */}
            </Grid>

            <Grid item xs={1} >课程地点</Grid>
            <Grid item xs={11}>
                <input name="classAddress" type="text" placeholder={"地点" + sequence} maxLength="100" value={classAddress}
                    onChange={e => props._handleClassInput(sequence, e.target.name, e.target.value)} />
                {/* {errors[classAddress] && touched[classAddress] ? <ErrorMessage message={errors[classAddress]} /> : null} */}
            </Grid>

            <Grid item xs={1} >授课老师</Grid>
            <Grid item xs={11}>
                <select name="classTeachers" value={classTeachers}
                    onChange={e => props._handleClassInput(sequence, e.target.name, e.target.value)} >
                    <option value="empty">请选择负责的老师</option>
                    <option value="teacher@ffa.test">FFA Teacher</option>
                    <option value="3">C</option>
                    <option value="4">D</option>
                </select>
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

        courseCode: 'CC29072019_0',
        courseName: '课程29072019_0',
        courseAddress: 'addr',
        courseIntroduction: 'intro',
        courseEmphasis: 'emph',
        courseBenefits: 'bene',
        contactEmail: 'testing@ffa.com',
        contactWechat: '1',
        contactNumber: '1',
        // essentialCourse: 1,

        enrollmenetStartDate: 1565798300000,
        enrollmenetEndDate: 1565798400000,

        courseQuota: '1',
        courseCredits: '1',

        courseFees: '1',
        expectedFees: '10000',
        actualFees: '1',
        conference_officers: [],
        conference_sections: [],
    }

    componentDidMount() {
        const redux_conferenceId = this.props.auth.relatedData.course.conferenceId || null;
        if (redux_conferenceId !== null) {
            this._getConferenceDefailByUser();
        }
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
                        },
                    ];
                }
                const convertedArray = {
                    conference_section_id: n.conference_section_id,
                    conference_id: n.conference_id,
                    sequence: n.sequence,
                    start_date: parseInt(n.start_date),
                    end_date: parseInt(n.end_date),
                    classStartToEndDate: timeStampsToRange(n.start_date, n.end_date) || '',
                    location: n.location,
                    classAddress: n.address,
                    classTeachers: the_classTeachers,
                    className: n.title,
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
            $expand: 'conference_sections/teachers/user,conference_officers',
        }
        apiConferences.getConferenceDefailByUser(params, this.props.auth.token, cb, eCb);
    }

    //** form handle input start **/
    convertForm_conference_sections = () => {
        let the_conference_sections = [];
        const classLength = this.state.conference_sections.length || 0;
        if (classLength !== 0) {
            for (let i = 1; i <= classLength; i++) {
                const theList = this.state.conference_sections[(i - 1)];
                // console.log("theList");
                // console.log(theList);

                //2019-08-14, 23:58 - 00:00
                const convertedDate = rangeToTimeStamps(theList.classStartToEndDate);

                let theClass = {};
                const isNewCreateClass = theList.conference_section_id && theList.classTeachers.instructor_id && theList.classTeachers.conference_section;
                if (!this.state.conference_id) {
                    // if create the new course with the its new class
                    theClass = {
                        // conference_section_id: theList.conference_section_id,
                        // conference_id: theList.conference_id,
                        sequence: i,
                        start_date: parseInt(convertedDate[0]),
                        end_date: parseInt(convertedDate[1]),
                        classStartToEndDate: theList.classStartToEndDate,
                        location: this.state.courseLocation,
                        address: theList.classAddress,
                        teachers: [
                            {
                                // instructor_id: theList.classTeachers[0].instructor_id,
                                user: theList.classTeachers[0].user,
                                // conference_section: theList.classTeachers[0].conference_section,
                                sequence: theList.classTeachers[0].sequence,
                                checked_in: theList.classTeachers[0].checked_in,
                                location: theList.classTeachers[0].location,
                            }
                        ],
                        title: theList.className,
                    }
                } else if (isNewCreateClass) {
                    // if edit and have new class
                    theClass = {
                        // conference_section_id: theList.conference_section_id,
                        // conference_id: theList.conference_id,
                        sequence: i,
                        start_date: parseInt(convertedDate[0]),
                        end_date: parseInt(convertedDate[1]),
                        classStartToEndDate: theList.classStartToEndDate,
                        location: this.state.courseLocation,
                        address: theList.classAddress,
                        teachers: [
                            {
                                // instructor_id: theList.classTeachers[0].instructor_id,
                                user: theList.classTeachers[0].user,
                                // conference_section: theList.classTeachers[0].conference_section,
                                sequence: theList.classTeachers[0].sequence,
                                checked_in: theList.classTeachers[0].checked_in,
                                location: theList.classTeachers[0].location,
                            }
                        ],
                        title: theList.className,
                    }
                } else {
                    // if no new class
                    theClass = {
                        conference_section_id: theList.conference_section_id,
                        conference_id: theList.conference_id,
                        sequence: i,
                        start_date: parseInt(convertedDate[0]),
                        end_date: parseInt(convertedDate[1]),
                        classStartToEndDate: theList.classStartToEndDate,
                        location: this.state.courseLocation,
                        address: theList.classAddress,
                        teachers: [
                            {
                                instructor_id: theList.classTeachers[0].instructor_id,
                                user: theList.classTeachers[0].user,
                                conference_section: theList.classTeachers[0].conference_section,
                                sequence: theList.classTeachers[0].sequence,
                                checked_in: theList.classTeachers[0].checked_in,
                                location: theList.classTeachers[0].location,
                            }
                        ],
                        title: theList.className,
                    }
                }
                the_conference_sections.push(theClass);
            }
        }
        return the_conference_sections;
    }
    // post
    createConferenceWithEnterInfo = () => {
        const formInput = this.state;
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

        const the_conference_sections = this.convertForm_conference_sections()

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
        // apiConferences.createConference(params, this.props.auth.token, cb, eCb);
    }

    // put
    editConferenceInfo = () => {
        const formInput = this.state;
        // console.log("formInput:");
        // console.log(formInput);
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
            const the_conference_sections = this.convertForm_conference_sections();
            // console.log("the_conference_sections");
            // console.log(the_conference_sections);
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
    _handleAddClass = () => {
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
        console.log('_handleAddClass formInput');

        /*start add back exist class */
        let the_conference_sections = conference_sections;
        const the_start_date = parseInt(getTheMonent(0));
        const the_end_date = parseInt(getTheMonent(1));

        const newClass = {
            // conference_section_id: null,
            conference_id: conference_id,
            sequence: conference_sections.length + 1,
            start_date: the_start_date,
            end_date: the_end_date,
            classStartToEndDate: timeStampsToRange(the_start_date, the_end_date),
            location: courseLocation,
            classAddress: `地点${conference_sections.length + 1}`,
            classTeachers: [
                {
                    // instructor_id: "",
                    user: "empty",
                    // conference_section: "",
                    sequence: 1,
                    checked_in: false,
                    location: null,
                }
            ],
            className: `第${conference_sections.length + 1}课`,
        }
        the_conference_sections.push(newClass);
        /*end add back exist class */

        if (this.props.auth.relatedData.course.conferenceId) {
            this.setState({
                conference_id: this.props.auth.relatedData.course.conferenceId,

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
                essentialCourse: '',

                enrollmenetStartDate: enrollmenetStartDate || 1565798300000,
                enrollmenetEndDate: enrollmenetEndDate || 1565798400000,

                courseQuota: courseQuota,
                courseCredits: courseCredits,

                courseFees: courseFees,
                expectedFees: expectedFees,
                actualFees: actualFees,

                conference_sections: the_conference_sections,
                conference_officers: conference_officers,
            });
        } else {
            this.setState({
                // conference_id: conference_id,
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
                essentialCourse: '',

                enrollmenetStartDate: enrollmenetStartDate || 1565798300000,
                enrollmenetEndDate: enrollmenetEndDate || 1565798400000,

                courseQuota: courseQuota,
                courseCredits: courseCredits,

                courseFees: courseFees,
                expectedFees: expectedFees,
                actualFees: actualFees,

                conference_sections: the_conference_sections,
                conference_officers: conference_officers,
            });
        }
    }

    _handleSubClass = () => {
        const formInput = this.state;
        // console.log('_handleSubClass formInput');
        // console.log(formInput);
        /*start add back exist class */
        let the_conference_sections = formInput.conference_sections;

        the_conference_sections.pop();
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

    _handleFormInput = (key, selectionString) => {
        this.setState({
            [key]: selectionString,
        });
    }

    _handleClassInput = (sequence, key, selectionString) => {
        let theList = [];
        // console.log("this.state.conference_sections");
        // console.log(this.state.conference_sections);

        this.state.conference_sections.map(n => {
            let theArray = n;
            if (sequence === n.sequence) {
                if (key === 'classTeachers') {
                    theArray = {
                        ...n,
                        classTeachers: [
                            {
                                ...n.classTeachers[0],
                                user: selectionString,
                            }
                        ]
                    }
                }
                else {
                    theArray = {
                        ...n,
                        [key]: selectionString,
                    }

                }
            }
            return theList.push(theArray);
        });
        this.setState({
            ...this.state,
            conference_sections: theList,
        });
    }
    //** form handle input end **/
    // handleSubmit = (values, { setinputError }) => {
    handleSubmit = () => {
        const redux_conferenceId = this.props.auth.relatedData.course.conferenceId || null;
        if (redux_conferenceId !== null) {
            this.editConferenceInfo();
        } else {
            this.createConferenceWithEnterInfo();
        }
    }

    render() {
        const {
            // conference_id,
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

            // conference_sections,
            // conference_officers,
        } = this.state;
        // const { classes, t, i18n } = this.props;
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

            //     // conference_sections: Yup
            //     //     .array()
            //     //     .of(
            //     //         Yup.object().shape({
            //     //             className: Yup.string().required('Class Name is required'),
            //     //             classDate: Yup.string().required('Class Date is required'),
            //     //             classAddress: Yup.string().required('Class Location is required'),
            //     //             classTeacher: Yup.string().required('Class Location is required'),
            //     //         })
            //     //     )

            //     // className0: Yup.string().required('Class1 Name is required'),
            //     // classDate0: Yup.string().required('Class1 Date is required'),
            //     // classAddress0: Yup.string().required('Class1 Location is required'),
            //     // classTeacher0: Yup.string().required('Class1 Location is required'),
        })

        // console.log(values);
        const { classes
            //, t, i18n
        } = this.props;
        const redux_conferenceId = this.props.auth.relatedData.course.conferenceId || null;
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
                                        <select name="academicTerm" value={academicTerm}
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
                                        <select name="courseLocation" value={courseLocation}
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
                                        <select name="subjectName" value={subjectName}
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
                                        <select name="courseType" value={courseType}
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
                                        <input name="courseCode" type="text" placeholder="课程编号" maxLength="100" value={courseCode}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseCode && touched.courseCode ? <ErrorMessage message={errors.courseCode} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程名称
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseName" type="text" placeholder="课程名称" maxLength="100" value={courseName}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseName && touched.courseName ? <ErrorMessage message={errors.courseName} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程地址
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseAddress" type="text" placeholder="课程地址" maxLength="100" value={courseAddress}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseAddress && touched.courseAddress ? <ErrorMessage message={errors.courseAddress} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程简介
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseIntroduction" type="text" placeholder="课程简介" maxLength="100" value={courseIntroduction}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseIntroduction && touched.courseIntroduction ? <ErrorMessage message={errors.courseIntroduction} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程重点
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseEmphasis" type="text" placeholder="课程重点" maxLength="100" value={courseEmphasis}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseEmphasis && touched.courseEmphasis ? <ErrorMessage message={errors.courseEmphasis} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程收益
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseBenefits" type="text" placeholder="课程收益" maxLength="100" value={courseBenefits}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseBenefits && touched.courseBenefits ? <ErrorMessage message={errors.courseBenefits} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        联系电邮
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="contactEmail" type="text" placeholder="联系电邮" maxLength="100" value={contactEmail}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.contactEmail && touched.contactEmail ? <ErrorMessage message={errors.contactEmail} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        联系微信
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="contactWechat" type="text" placeholder="联系微信" maxLength="100" value={contactWechat}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.contactWechat && touched.contactWechat ? <ErrorMessage message={errors.contactWechat} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        联系电话
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="contactNumber" type="text" placeholder="联系电话" maxLength="100" value={contactNumber}
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
                                        <select name="enrollmenetStartDate" value={enrollmenetStartDate}
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
                                        <select name="enrollmenetEndDate" value={enrollmenetEndDate}
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
                                        <input name="courseQuota" type="text" placeholder="课程名额" maxLength="100" value={courseQuota}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseQuota && touched.courseQuota ? <ErrorMessage message={errors.courseQuota} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程学分
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseCredits" type="text" placeholder="课程学分" maxLength="100" value={courseCredits}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseCredits && touched.courseCredits ? <ErrorMessage message={errors.courseCredits} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        课程费用
                                   </Grid>
                                    <Grid item xs={11}>
                                        <input name="courseFees" type="text" placeholder="课程费用" maxLength="100" value={courseFees}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.courseFees && touched.courseFees ? <ErrorMessage message={errors.courseFees} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        预计学费
                                     </Grid>
                                    <Grid item xs={11}>
                                        <input name="expectedFees" type="text" placeholder="预计学费" maxLength="100" value={expectedFees}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.expectedFees && touched.expectedFees ? <ErrorMessage message={errors.expectedFees} /> : null} */}
                                    </Grid>

                                    <Grid item xs={1} >
                                        实际收费
                                   </Grid>
                                    <Grid item xs={11}>
                                        <input name="actualFees" type="text" placeholder="实际收费" maxLength="100" value={actualFees}
                                            onChange={e => this._handleFormInput(e.target.name, e.target.value)}
                                        />
                                        {/* {errors.actualFees && touched.actualFees ? <ErrorMessage message={errors.actualFees} /> : null} */}
                                    </Grid>

                                    <Grid item xs={12} >&nbsp;</Grid>

                                    <Grid container spacing={16} alignItems="center">
                                        <Grid item xs={12} >课程日期和时间</Grid>
                                        {/* forget */}

                                        <Grid item xs={12} >
                                            {(
                                                this.state.conference_sections.map(
                                                    (data, i) => {
                                                        return (
                                                            <Block
                                                                key={data.conference_section_id || "new" + i}
                                                                sequence={data.sequence}
                                                                data={data}
                                                                _handleClassInput={this._handleClassInput}
                                                            // errors={errors}
                                                            // touched={touched}
                                                            />
                                                        )
                                                    }
                                                ))}
                                        </Grid>

                                    </Grid>

                                    <Grid item xs={12} className="mt20">
                                        <Button className={classes.greenButton} onClick={() => this._handleAddClass()}>添加上課日子</Button>&nbsp;
                                        <Button className={classes.greyButton} onClick={() => this._handleSubClass()}>删减上課日子</Button>
                                    </Grid>
                                </Grid>

                                <div className="bottomControl clearfix">

                                    {redux_conferenceId
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