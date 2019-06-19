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
                    <Grid item xs={1} >课程编号</Grid>
                    <Grid item xs={11}>
                        <Field name="courseCode" type="text" placeholder="课程编号 123" maxLength="100" />
                        {errors.courseCode && touched.courseCode ? <div>{errors.courseCode}</div> : null}
                    </Grid>

                    <Grid item xs={1} >课程名称</Grid>
                    <Grid item xs={11}>
                        <Field name="courseName" type="text" placeholder="课程名称 456" maxLength="100" />
                        {errors.courseName && touched.courseName ? <div>{errors.courseName}</div> : null}
                    </Grid>

                    <Grid item xs={1} >学科名称</Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">战略课程</option>
                            <option value="2">战略课程</option>
                            <option value="3">战略课程</option>
                            <option value="4">战略课程</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >课程类型</Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">大商品公开课程1</option>
                            <option value="2">大商品公开课程2</option>
                            <option value="3">大商品公开课程3</option>
                            <option value="4">大商品公开课程4</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >课程地址</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >课程简介</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >课程重点</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >课程收益</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >联系电邮</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >联系微信</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >联系电话</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
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
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >课程学分</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >
                        课程费用
                    </Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >预计学费</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
                    </Grid>

                    <Grid item xs={1} >实际收费</Grid>
                    <Grid item xs={11}>
                        <input type="text" />
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
                    <Grid item xs={12}>
                        <Button type="submit" className={classes.editButton}>編輯</Button>
                        <Button type="submit" className={classes.editButton}>編輯</Button>
                    </Grid>
                </Grid>
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
                                        courseName: ''
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