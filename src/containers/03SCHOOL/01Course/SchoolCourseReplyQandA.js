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

// Material UI
import { Button } from '@material-ui/core';

// Api
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ToolBar from '../../../components/105ToolBars/General';
import ErrorMessage from '../../../components/01General/ErrorMessage';
import ListType5 from '../../../components/102Grids/ListType5';

function Block(props) {
    return (
        <ListType5
            from={props.from}
            name={props.name}
            content={props.content}
        />
    )
}

function Cluster(props) {
    let rows = [];
    for (let i = 0; i < 5; i++) {
        if (i % 2 === 0) {
            rows.push(
                <div key={i}>
                    <Block
                        key={i}
                        from='me'
                        name={props.name}
                        content={props.content}
                    />
                </div>
            )
        } else {
            rows.push(
                <div key={i}>
                    <Block
                        key={i}
                        from='they'
                        name={props.name}
                        content={props.content}
                    />
                </div>
            )
        }
    }
    return (rows);
}

class SchoolCourseReplyQandA extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ['彭'],
            content: ['abcabacabcabcabacabcabcacbacbabcabafdsfadsfadsfadfasdfasdfasdfasdfadsfasdabcabacabcabcabacabcabcacbacbabcabafdsfadsfadsfadfasdfasdfasdfasdfadsfasdabcabacabcabcabacabcabcacbacbabcabafdsfadsfadsfadfasdfasdfasdfasdfadsfdfasdfadfasdfadsafdsfasdfadfadsfdaasd'],
            message: ''
        }
    }

    componentDidMount = () => {
        this._getOneConferenceQandAList();
    }

    // get Q and A
    _getOneConferenceQandAList = () => {
        // const cb = (obj) => {
        //     console.log("cb : ", obj);
        // }

        // const eCb = (obj) => {
        //     console.log("eCb : ", obj);
        // }

        // const params = {
        //     'conference': 'b16beeb2-6fca-4653-8e36-a764aa62d767'
        // }

        // apiConferences.getOneConferenceQandA(params, this.props.auth.token, cb, eCb); 
    }

    // insert Q and A
    _handleSubmit = (values, { resetForm }) => {
        this._insertOneConferenceQandAList(values, resetForm);
    }

    _insertOneConferenceQandAList = (values, resetForm) => {

        const cb = (obj) => {
            console.log("cb : ", obj);
            resetForm();
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const body = {
            conversation: '8c9af8ae-3e91-4f60-9ee1-6695cbbe61f5',
            message: values.message,
            read: false,
            image: null
        }

        apiConferences.insertOneConferenceQandA(body, this.props.auth.token, cb, eCb);
    }

    // ToolBar
    _backButtonAction = (url) => {
        this.props.history.push(url);
    }

    // Formik form
    form = ({
        // values,
        errors, touched
        // , handleChange
    }) => {

        const {
            // i18n,
            classes } = this.props;

        return (
            <Form>
                <div className="messageBar">
                    <Field name="message" type="text" placeholder="公告标题" />
                    <Button type="submit" className={classes.greenButton}>發送</Button>
                    {errors.message && touched.message ? <div><ErrorMessage message={errors.message} /></div> : null}
                </div>
            </Form>
        )
    }

    render() {

        const Schema = Yup.object().shape({
            message: Yup.string()
                .required('Message is required'),
        });

        // console.log(this.props.auth.relatedData.conversationId);

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">S1-001品牌盈利模式</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <ToolBar
                                    backButton={true}
                                    backButtonText="返回"
                                    backButtonAction={this._backButtonAction}
                                    backButtonActionUrl='school-course-q-and-a'
                                />

                                <Cluster
                                    name={this.state.name}
                                    content={this.state.content}
                                />

                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        message: this.state.message,
                                    }}
                                    validationSchema={Schema}
                                    onSubmit={this._handleSubmit}
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

SchoolCourseReplyQandA.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseReplyQandA))));
