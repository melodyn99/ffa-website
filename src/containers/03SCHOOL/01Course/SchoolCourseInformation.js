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
// import { apiAuth } from '../../Api/ApiAuth';
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { dateToDayMonthYear } from '../../../Util/DateUtils';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ErrorMessage from '../../../components/01General/ErrorMessage';
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
    constructor(props) {
        super(props);

        this.state = {
            academicTerm: '',
            courseLocation: '',
            subjectName: '',
            subjectType: '',

            courseCode: '',
            courseName: '',
            courseAddress: '',
            courseIntroduction: '',
            courseEmphasis: '',
            courseBenefits: '',
            contactEmail: '',
            contactWechat: '',
            contactNumber: '',
            courseCredits: '',

            enrollmenetStartDate: '',
            enrollmenetEndDate: '',

            courseQuota: '',
            courseScore: '',

            courseFees: '',
            expectedFees: '',
            actualFees: '',

            conference_sections: []
        }
    }

    componentDidMount() {
        this._getConferenceDefailByUser();
    }

    _getConferenceDefailByUser = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body[0];

            console.log("theList: " + JSON.stringify(theList, null, 2));

            this.setState({
                academicTerm: theList.academic_term,
                courseLocation: '',
                subjectName: '',
                subjectType: '',

                courseCode: theList.code,
                courseName: theList.name,
                courseAddress: theList.address,
                courseIntroduction: theList.introduction,
                courseEmphasis: theList.emphasis,
                courseBenefits: theList.benefit,
                contactEmail: theList.email,
                contactWechat: theList.wechat,
                contactNumber: theList.phone,
                courseCredits: '',

                enrollmenetStartDate: '',
                enrollmenetEndDate: '',

                courseQuota: theList.quota,
                courseScore: '',

                courseFees: theList.fee,
                expectedFees: theList.expected_fee,
                actualFees: theList.actual_fee,

                conference_sections: theList.conference_sections
            });
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        let params = {
            conference_id: this.props.auth.relatedDataId.conferenceId,
            'conference_officers/user': this.props.auth.userInfo.username,
            $expand: 'subject,conference_sections/teachers/user',
        }

        apiConferences.getConferenceDefailByUser(params, this.props.auth.token, cb, eCb);
    }

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

    _handleInput = (value, key) => {
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

    handleSubmit = (values, { setFieldError }) => {
        // call api
        // TODO
        console.log('GREAT!');
    }

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n
        } = this.props;
        const {
            academicTerm,
            courseLocation,
            subjectName,
            subjectType,

            enrollmenetStartDate,
            enrollmenetEndDate,
        } = this.state;


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
                            <option value="战略课程">战略课程</option>
                            <option value="商品管理系列课程">商品管理系列课程</option>
                            <option value="设计应用系列课程">设计应用系列课程</option>
                            <option value="开发流程系列课程">开发流程系列课程</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >
                        课程类型
                    </Grid>
                    <Grid item xs={11}>
                        <select value={subjectType} onChange={e => { this._handleSelect('subjectType', e.target.value) }}>
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
                </Grid>

                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={12} ></Grid>
                    <Grid item xs={12} >课程日期和时间</Grid>
                </Grid>

                {(this.state.conference_sections.map(
                    (data, i) => {
                        return (
                            <Block
                                key={i}
                                i={i}
                                className={"className" + i}
                                classDate={"classDate" + i}
                                classLocation={"classLocation" + i}
                                classTeacher={"classTeacher" + i}
                                errors={errors}
                                touched={touched}
                            />
                        )
                    }
                ))}

                <Grid item xs={12} className="mt20">
                    <Button className={classes.greyButton} onClick={this._handleAddMore}>添加上課日子</Button>
                </Grid>

                <div className="bottomControl clearfix">
                    <span className="right"><Button type="submit" className={classes.greyButton}>编辑资料</Button></span>
                </div>
            </Form >
        )
    }

    render() {
        // const { classes, t, i18n } = this.props;
        const {
            // conferenceList,

            courseCode,
            courseName,
            courseAddress,
            courseIntroduction,
            courseEmphasis,
            courseBenefits,
            contactEmail,
            contactWechat,
            contactNumber,
            // courseCredits,

            courseQuota,
            // courseScore,

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

            // className1: Yup.string().required('Class2 Name is required'),
            // classDate1: Yup.string().required('Class2 Date is required'),
            // classLocation1: Yup.string().required('Class2 Location is required'),
            // classTeacher1: Yup.string().required('Class2 Location is required'),

            // className2: Yup.string().required('Class3 Name is required'),
            // classDate2: Yup.string().required('Class3 Date is required'),
            // classLocation2: Yup.string().required('Class3 Location is required'),
            // classTeacher2: Yup.string().required('Class3 Location is required'),

            // className3: Yup.string().required('Class4 Name is required'),
            // classDate3: Yup.string().required('Class4 Date is required'),
            // classLocation3: Yup.string().required('Class4 Location is required'),
            // classTeacher3: Yup.string().required('Class4 Location is required'),

            // className4: Yup.string().required('Class5 Name is required'),
            // classDate4: Yup.string().required('Class5 Date is required'),
            // classLocation4: Yup.string().required('Class5 Location is required'),
            // classTeacher4: Yup.string().required('Class5 Location is required'),

            // className5: Yup.string().required('Class6 Name is required'),
            // classDate5: Yup.string().required('Class6 Date is required'),
            // classLocation5: Yup.string().required('Class6 Location is required'),
            // classTeacher5: Yup.string().required('Class6 Location is required'),

            // className6: Yup.string().required('Class7 Name is required'),
            // classDate6: Yup.string().required('Class7 Date is required'),
            // classLocation6: Yup.string().required('Class7 Location is required'),
            // classTeacher6: Yup.string().required('Class7 Location is required'),

            // className7: Yup.string().required('Class8 Name is required'),
            // classDate7: Yup.string().required('Class8 Date is required'),
            // classLocation7: Yup.string().required('Class8 Location is required'),
            // classTeacher7: Yup.string().required('Class8 Location is required'),
        })

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
                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        academicTerm: '',
                                        courseLocation: '',
                                        subjectName: '',
                                        subjectType: '',

                                        courseCode: courseCode,
                                        courseName: courseName,
                                        courseAddress: courseAddress,
                                        courseIntroduction: courseIntroduction,
                                        courseEmphasis: courseEmphasis,
                                        courseBenefits: courseBenefits,
                                        contactEmail: contactEmail,
                                        contactWechat: contactWechat,
                                        contactNumber: contactNumber,
                                        courseCredits: '',

                                        enrollmenetStartDate: '',
                                        enrollmenetEndDate: '',

                                        courseQuota: courseQuota,
                                        courseScore: '',

                                        courseFees: courseFees,
                                        expectedFees: expectedFees,
                                        actualFees: actualFees,

                                        className0: '',
                                        classDate0: '',
                                        classLocation0: '',

                                        className1: '',
                                        classDate1: '',
                                        classLocation1: '',

                                        className2: '',
                                        classDate2: '',
                                        classLocation2: '',

                                        className3: '',
                                        classDate3: '',
                                        classLocation3: '',

                                        className4: '',
                                        classDate4: '',
                                        classLocation4: '',

                                        className5: '',
                                        classDate5: '',
                                        classLocation5: '',

                                        className6: '',
                                        classDate6: '',
                                        classLocation6: '',

                                        className7: '',
                                        classDate7: '',
                                        classLocation7: '',
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
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseInformation))));