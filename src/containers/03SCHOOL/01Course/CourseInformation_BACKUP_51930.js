// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// Material UI
import Grid from '@material-ui/core/Grid';

// Api
// import { apiAuth } from '../../Api/ApiAuth';
// import { apiConferences } from '../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Children components
import BreadCrumb from '../../../components/100Include/breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/Course';
// import data from '../../data/09Account/EnrollmentHistory';

class CourseInformation extends React.Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         courseCode: 56789,
    //         courseName: 'Cooking Course',
    //         courseAddress: 'Hong Kong'
    //     }
    // }

    _handleInput = (value, key) => {
        console.log(value);
        this.setState({
            ...this.state,
            [key]: value
        })
    }

    _handleSelect = () => {

    }

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n 
        } = this.props;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
<<<<<<< HEAD
                    <Grid item xs={1} >课程编号</Grid>
=======
                    <Grid item xs={1} >
                        学期
                    </Grid>
>>>>>>> dev_melody2
                    <Grid item xs={11}>
                        <select>
                            <option value="1">2019-20</option>
                            <option value="2">2020-21</option>
                            <option value="3">2021-22</option>
                            <option value="4">2022-23</option>
                        </select>
                    </Grid>

<<<<<<< HEAD
                    <Grid item xs={1} >课程名称</Grid>
=======
                    <Grid item xs={1} >
                        上课城市
                    </Grid>
>>>>>>> dev_melody2
                    <Grid item xs={11}>
                        <select>
                            <option value="1">杭州</option>
                            <option value="2">北京</option>
                            <option value="3">上海</option>
                            <option value="4">香港</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >学科名称</Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">战略课程1</option>
                            <option value="2">战略课程2</option>
                            <option value="3">战略课程3</option>
                            <option value="4">战略课程4</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >课程类型</Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">类型1</option>
                            <option value="2">类型2</option>
                            <option value="3">类型3</option>
                            <option value="4">类型4</option>
                        </select>
                    </Grid>

<<<<<<< HEAD
                    <Grid item xs={1} >课程地址</Grid>
=======
                    <Grid item xs={1} >
                        课程编号
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseCode" type="text" placeholder="课程编号 123" maxLength="100" />
                        {errors.courseCode && touched.courseCode ? <div>{errors.courseCode}</div> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程名称
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseName" type="text" placeholder="课程名称 456" maxLength="100" />
                        {errors.courseName && touched.courseName ? <div>{errors.courseName}</div> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程地址
                    </Grid>
>>>>>>> dev_melody2
                    <Grid item xs={11}>
                        <Field name="courseAddress" type="text" placeholder="Address 1" maxLength="100" />
                        {errors.courseAddress && touched.courseAddress ? <div>{errors.courseAddress}</div> : null}
                    </Grid>

                    <Grid item xs={1} >课程简介</Grid>
                    <Grid item xs={11}>
                        <Field name="courseBio" type="text" placeholder="Bio 1" maxLength="100" />
                        {errors.courseBio && touched.courseBio ? <div>{errors.courseBio}</div> : null}
                    </Grid>

                    <Grid item xs={1} >课程重点</Grid>
                    <Grid item xs={11}>
<<<<<<< HEAD
                        <input type="text" />
=======
                        <Field name="courseHighlights" type="text" placeholder="Highlight 1" maxLength="100" />
                        {errors.courseHighlights && touched.courseHighlights ? <div>{errors.courseHighlights}</div> : null}
>>>>>>> dev_melody2
                    </Grid>

                    <Grid item xs={1} >课程收益</Grid>
                    <Grid item xs={11}>
                        <Field name="courseBenefits" type="text" placeholder="Benefit 1" maxLength="100" />
                        {errors.courseBenefits && touched.courseBenefits ? <div>{errors.courseBenefits}</div> : null}
                    </Grid>

                    <Grid item xs={1} >联系电邮</Grid>
                    <Grid item xs={11}>
                        <Field name="contactEmail" type="text" placeholder="abc@abc.com" maxLength="100" />
                        {errors.contactEmail && touched.contactEmail ? <div>{errors.contactEmail}</div> : null}
                    </Grid>

                    <Grid item xs={1} >联系微信</Grid>
                    <Grid item xs={11}>
                        <Field name="contactWechat" type="text" placeholder="user123" maxLength="100" />
                        {errors.contactWechat && touched.contactWechat ? <div>{errors.contactWechat}</div> : null}
                    </Grid>

                    <Grid item xs={1} >联系电话</Grid>
                    <Grid item xs={11}>
                        <Field name="contactNumber" type="text" placeholder="12345678" maxLength="100" />
                        {errors.contactNumber && touched.contactNumber ? <div>{errors.contactNumber}</div> : null}
                    </Grid>

                    <Grid item xs={1} >报名开始</Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">2019</option>
                            <option value="2">2020</option>
                            <option value="3">2021</option>
                            <option value="4">2022</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >报名结束</Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">2019</option>
                            <option value="2">2020</option>
                            <option value="3">2021</option>
                            <option value="4">2022</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >课程名额</Grid>
                    <Grid item xs={11}>
                        <Field name="courseSpots" type="text" placeholder="100" maxLength="100" />
                        {errors.courseSpots && touched.courseSpots ? <div>{errors.courseSpots}</div> : null}
                    </Grid>

                    <Grid item xs={1} >课程学分</Grid>
                    <Grid item xs={11}>
                        <Field name="courseCredits" type="text" placeholder="10" maxLength="100" />
                        {errors.courseCredits && touched.courseCredits ? <div>{errors.courseCredits}</div> : null}
                    </Grid>

                    <Grid item xs={1} >
                        课程费用
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="courseFees" type="text" placeholder="10000" maxLength="100" />
                        {errors.courseFees && touched.courseFees ? <div>{errors.courseFees}</div> : null}
                    </Grid>

                    <Grid item xs={1} >预计学费</Grid>
                    <Grid item xs={11}>
                        <Field name="projectedFees" type="text" placeholder="10000" maxLength="100" />
                        {errors.projectedFees && touched.projectedFees ? <div>{errors.projectedFees}</div> : null}                    
                    </Grid>

                    <Grid item xs={1} >实际收费</Grid>
                    <Grid item xs={11}>
                        <Field name="actualFees" type="text" placeholder="10000" maxLength="100" />
                        {errors.actualFees && touched.actualFees ? <div>{errors.actualFees}</div> : null}         
                    </Grid>

                    <Grid item xs={12} >课程日期和时间</Grid>

                    <Grid item xs={12} >#1</Grid>

                    <Grid item xs={1} >课程标题</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >课程日期</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >课程地点</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >授课老师</Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">A</option>
                            <option value="2">B</option>
                            <option value="3">C</option>
                            <option value="4">D</option>
                        </select>
                    </Grid>

                    <Grid item xs={12} >#2</Grid>

                    <Grid item xs={1} >课程标题</Grid>
                    <Grid item xs={11}>
                        <Field name="className2" type="text" placeholder="第一课" maxLength="100" />
                        {errors.className2 && touched.className2 ? <div>{errors.className2}</div> : null}     
                    </Grid>

                    <Grid item xs={1} >课程日期</Grid>
                    <Grid item xs={11}>
                        <Field name="classDate2" type="text" placeholder="2019 / 3 / 22" maxLength="100" />
                        {errors.classDate2 && touched.classDate2 ? <div>{errors.classDate2}</div> : null}    
                    </Grid>

                    <Grid item xs={1} >课程地点</Grid>
                    <Grid item xs={11}>
                        <Field name="classLocation2" type="text" placeholder="5号厅" maxLength="100" />
                        {errors.classLocation2 && touched.classLocation2 ? <div>{errors.classLocation2}</div> : null}    
                    </Grid>

                    <Grid item xs={1} >授课老师</Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">A</option>
                            <option value="2">B</option>
                            <option value="3">C</option>
                            <option value="4">D</option>
                        </select>
                    </Grid>
                </Grid>
                <div className="bottomControl clearfix">
                    <Button type="submit" className={classes.editButton}>編輯</Button>
                    <span className="right"><Button type="submit" className={classes.editButton}>編輯</Button></span>
                </div>
            </Form>
        )
    }

    handleSubmit = (values, { setFieldError }) => {
        // call api
        // TODO
        console.log('GREAT!');
    }

    render() {
        // const { classes, t, i18n } = this.props;

        const Schema = Yup.object().shape({
            courseCode: Yup.string()
                .required('Course Code is required'),
            courseName: Yup.string()
                .required('Course Name is required'),
            courseAddress: Yup.string()
                .required('Course Address is required'),
            courseBio: Yup.string()
                .required('Course Bio is required'),
            courseHighlights: Yup.string()
                .required('Course Bio is required'),
            courseBenefits: Yup.string()
                .required('Course Bio is required'),
            contactEmail: Yup.string()
                .email('Valid email is required'),
            contactWechat: Yup.string()
                .matches(/^[0-9]+$/,{message:'WeChat Number is required', excludeEmptyString: false }),
            contactNumber: Yup.string()
                .matches(/^[0-9]+$/,{message:'Contact Number is required', excludeEmptyString: false }),
            courseSpots: Yup.string()
                .matches(/^[0-9]+$/,{message:'Course Spots is required', excludeEmptyString: false }),
            courseCredits: Yup.string()
                .matches(/^[0-9]+$/,{message:'Course Credits is required', excludeEmptyString: false }),
            courseFees: Yup.string()
                .required('Fees is required'),
            projectedFees: Yup.string()
                .required('Projected Fees is required'),
            actualFees: Yup.string()
                .required('Actual Fees is required'),
            className2: Yup.string()
                .required('Class Name is required'),
            classDate2: Yup.string()
                .required('Class Date is required'),
            classLocation2: Yup.string()
                .required('Class Location is required'),
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
                                    initialValues={{
                                        courseCode: '',
                                        courseName: '',
                                        courseAddress: '',
                                        courseBio: '',
                                        courseHighlights:'',
                                        courseBenefits: '',
                                        contactEmail: '',
                                        contactWechat: '',
                                        contactNumber: '',
                                        courseSpots: '',
                                        courseCredits: '',
                                        courseFees: '',
                                        projectedFees: '',
                                        actualFees: '',
                                        className2: '',
                                        classDate2: '',
                                        classLocation2: '',
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

CourseInformation.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(CourseInformation)));