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
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import ErrorMessage from '../../../components/01General/ErrorMessage';
// import data from '../../data/09Account/EnrollmentHistory';

class NewQuestion extends React.Component {

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n 
        } = this.props;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1} >
                        问题
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="question" type="text" placeholder="问题1" maxLength="100" />
                        {errors.question && touched.question ? <ErrorMessage message={errors.question} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        分数
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="points" type="text" placeholder="10" maxLength="100" />
                        {errors.points && touched.points ? <ErrorMessage message={errors.points} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        选择#A
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="choiceA" type="text" placeholder="1" maxLength="100" />
                        {errors.choiceA && touched.choiceA ? <ErrorMessage message={errors.choiceA} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        选择#B
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="choiceB" type="text" placeholder="2" maxLength="100" />
                        {errors.choiceB && touched.choiceB ? <ErrorMessage message={errors.choiceB} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        选择#C
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="choiceC" type="text" placeholder="3" maxLength="100" />
                        {errors.choiceC && touched.choiceC ? <ErrorMessage message={errors.choiceC} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        选择#D
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="choiceD" type="text" placeholder="4" maxLength="100" />
                        {errors.choiceD && touched.choiceD ? <ErrorMessage message={errors.choiceD} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        正确答案
                    </Grid>
                    <Grid item xs={11}>
                    <select>
                            <option value="1">选择#A</option>
                            <option value="2">选择#B</option>
                            <option value="3">选择#C</option>
                            <option value="4">选择#D</option>
                        </select>
                    </Grid>
                </Grid>
                <div className="bottomControl clearfix">
                    <Button type="submit" className={classes.greyButton}>取消</Button>
                    <span className="right"><Button type="submit" className={classes.blackButton}>确认</Button></span>
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
       // const { classes } = this.props;

        const Schema = Yup.object().shape({
            question: Yup.string()
                .required('Question is required'),
            points: Yup.string()
                .required('Points is required'),
            choiceA: Yup.string()
                .required('Choice A is required'),
            choiceB: Yup.string()
                .required('Choice B is required'),
            choiceC: Yup.string()
                .required('Choice C is required'),
            choiceD: Yup.string()
                .required('Choice D is required'),
            answer: Yup.string()
                .required('Answer is required'),
        })

        return (
           <div>
               <div className="wrapper-container-main">
                   <div className="container-main">

                       <h2 className="pageTitle">资源库管理</h2>

                       <div className="wrapper-content">
                           <BreadCrumb />

                           <div className="content">
                                <Formik
                                    initialValues={{
                                        question: '',
                                        points: '',
                                        choiceA: '',
                                        choiceB: '',
                                        choiceC: '',
                                        choiceD: '',
                                        answer: '',
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

NewQuestion.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(NewQuestion)));
