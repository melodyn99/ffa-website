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
import { apiNoteTaking } from '../../../Api/ApiNoteTaking';

// Redux
import { connect } from 'react-redux';

// Utils
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ErrorMessage from '../../../components/01General/ErrorMessage';
// import data from '../../data/09Account/EnrollmentHistory';

class SchoolCourseNewNote extends React.Component {

    _handleInput = (value, key) => {
        console.log(value);
        this.setState({
            ...this.state,
            [key]: value
        })
    }

    handleSubmit = (event, { setFieldError }) => {
        // console.log('event: ' + JSON.stringify(event, null, 2));
        const conferenceId = this.props.auth.relatedData.course.conferenceId;

        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.props.history.goBack();
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            //viewingSeminar ? viewingSeminar.conference_id : '',
            conference: conferenceId,
            name: event.notesName,
            content: event.notesContent,
        }

        apiNoteTaking.createNoteTaking(params, this.props.auth.token, cb, eCb);
    }

    form = ({ values, errors, touched, handleChange }) => {
        const { classes
            //, t, i18n
        } = this.props;

        return (
            <Form>
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1} >
                        记录标题
                        </Grid>
                    <Grid item xs={11}>
                        <Field name="notesName" type="text" placeholder="课程编号 123" maxLength="100" />
                        {errors.notesName && touched.notesName ? <ErrorMessage message={errors.notesName} /> : null}
                    </Grid>

                    <Grid item xs={1} >
                        记录内容
                        </Grid>
                    <Grid item xs={11}>
                        <Field name="notesContent" type="text" placeholder="课程编号 123" maxLength="100" />
                        {errors.notesContent && touched.notesContent ? <ErrorMessage message={errors.notesContent} /> : null}
                    </Grid>
                </Grid>
                <div className="bottomControl clearfix">
                    <Button className={classes.greyButton}
                        onClick={() => this.props.history.goBack()}
                    >取消</Button>
                    <span className="right"><Button type="submit" className={classes.blackButton}
                        onClick={() => this.handleSubmit}
                    >确认</Button></span>
                </div>
            </Form>
        )
    }

    render() {
        // const { classes, t, i18n } = this.props;

        const Schema = Yup.object().shape({
            notesName: Yup.string()
                .required('Note Name is required'),
            notesContent: Yup.string()
                .required('Note Content is required'),
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
                                        notesName: '',
                                        notesContent: '',
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

SchoolCourseNewNote.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseNewNote))));
