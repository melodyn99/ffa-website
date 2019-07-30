// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
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
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';

// Api
import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
// import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ErrorMessage from '../../../components/01General/ErrorMessage';
import ListType6 from '../../../components/102Grids/ListType6';
// import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';

// function Block(props) {
//     return (
//         <ListType6
//             from={props.from}
//             same={props.same}
//             name={props.name}
//             content={props.content}
//         />
//     )
// }

// function Cluster(props) {
//     let rows = [];
//     const currLoginUser = props.currLoginUser;
//     const theList = props.list;
//     let i = 0;

//     theList.map(n => {
//         const theMessageCreator = n.created_by
//         let messageCreator = 'me';
//         if (currLoginUser !== theMessageCreator) {
//             messageCreator = 'they'
//         }
//         rows.push(
//             <div key={i}>
//                 <Block
//                     key={i}
//                     from={messageCreator}
//                     same={false}
//                     name={n.display_name.substring(0, 1)}
//                     content={n.message}
//                 />
//             </div>
//         )
//         return i++;
//     })
//     return (rows);
// }

class SchoolCourseAnnouncement extends React.Component {
    state = {
        currLoginAccount: this.props.auth.userInfo.username,
        conferenceId: this.props.auth.relatedData.course.conferenceId,
        messagesList: [],
    }

    componentDidMount() {
        this._getConferenceMessages();
    }

    // display the message of this conference
    _getConferenceMessages = () => {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            const theList = obj.body;
            // console.log(theList);
            this.setState({
                messagesList: theList,
            });
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            'conversation/conference': this.props.auth.relatedData.course.conferenceId,
            $orderby: `createddate desc`,
            $expand: `conversation,image`
        }

        apiConferences.getConferenceMessages(params, this.props.auth.token, cb, eCb);
    }

    // handle new message submmit
    handleSubmit = (values) => {
        this._getAccouncementConversation(values);
    }

    // call API to get conversation id
    _getAccouncementConversation = (values) => {
        const cb = (obj) => {
            console.log("cb : ", obj);
            this._createAnnouncement(values, obj.body[0].conversation_id)
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            conference: this.props.auth.relatedData.course.conferenceId
        }

        apiConferences.getAccouncementConversation(params, this.props.auth.token, cb, eCb);
    }

    // api post to create record
    _createAnnouncement = (values, conversation_id) => {
        const cb = (obj) => {
            console.log("cb : ", obj);
        }

        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const body = {
            conversation: conversation_id,
            message: values.announcementContent,
            read: false,
            image: null
        }

        apiConferences.createAnnouncement(body, this.props.auth.token, cb, eCb);
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
                <Grid container spacing={16} alignItems="center">
                    <Grid item xs={1}>公告标题</Grid>
                    <Grid item xs={11}>
                        <Field name="announcementName" type="text" placeholder="公告标题" maxLength="100" />
                        {errors.announcementName && touched.announcementName ? <ErrorMessage message={errors.announcementName} /> : null}
                    </Grid>

                    <Grid item xs={1}>公告内容</Grid>
                    <Grid item xs={11}>
                        <Field name="announcementContent" type="text" placeholder="公告内容" maxLength="100" />
                        {errors.announcementContent && touched.announcementContent ? <ErrorMessage message={errors.announcementContent} /> : null}
                    </Grid>
                </Grid>
                <div className="bottomControl clearfix">
                    {/* <Button
                        className={classes.greyButton}
                        onClick={() => this.props.history.goBack()}
                    >返回</Button> */}
                    <span className="right">
                        <Button type="submit" className={classes.blackButton}>确认</Button>
                    </span>
                </div>
            </Form>
        )
    }

    render() {

        const Schema = Yup.object().shape({
            announcementName: Yup.string()
                .required('Announcement Name is required'),
            announcementContent: Yup.string()
                .required('Announcement Content is required'),
        });

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">S1-001品牌盈利模式</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                {/* <Cluster
                                    currLoginUser={this.state.currLoginAccount}
                                    list={this.state.messagesList}
                                /> */}

                                {(this.state.messagesList.map(
                                    (message) => {
                                        return (
                                            <div key={message.message_id}>
                                                <ListType6
                                                    date={message.createddate}
                                                    name={message.display_name}
                                                    content={message.message}
                                                />
                                            </div>
                                        )
                                    }
                                ))}

                                <Formik
                                    enableReinitialize
                                    initialValues={{
                                        announcementName: '',
                                        announcementContent: '',
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

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(SchoolCourseAnnouncement))));
