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
import ErrorMessage from '../../../components/01General/ErrorMessage';
// import data from '../../data/09Account/EnrollmentHistory';

class NewMaterial extends React.Component {

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n 
        } = this.props;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1} >
                        教材标题
                    </Grid>
                    <Grid item xs={11}>
                        <Field name="name" type="text" placeholder="4" maxLength="100" />
                        {errors.name && touched.name ? <ErrorMessage message={errors.name} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        学科
                    </Grid>
                    <Grid item xs={11}>
                    <select>
                            <option value="1">战略课程</option>
                            <option value="2">战略课程</option>
                            <option value="3">战略课程</option>
                            <option value="4">战略课程</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >
                        编辑用户#1
                    </Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">请选择</option>
                            <option value="2">选择1</option>
                            <option value="3">选择2</option>
                            <option value="4">选择3</option>
                        </select>
                    </Grid>

                    <Grid item xs={1} >
                        一般用户#1
                    </Grid>
                    <Grid item xs={11}>
                        <select>
                            <option value="1">请选择</option>
                            <option value="2">选择1</option>
                            <option value="3">选择2</option>
                            <option value="4">选择3</option>
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
            name: Yup.string()
                .required('Material is required'),
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
                                        name: '',
                                        subject: '',
                                        editor1: '',
                                        user1: '',
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

NewMaterial.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(NewMaterial)));
