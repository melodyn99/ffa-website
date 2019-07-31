// Essential for all components
import React, { Component } from 'react';
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

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
// import { apiConferences } from '../../../Api/ApiConferences';
import { apiStudent } from '../../../Api/ApiStudent';

// Redux
import { connect } from 'react-redux';

// Utils
import { Form } from 'formik';
import { dateToDayMonthYearWithoutWord } from '../../../Util/DateUtils';


// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/02STUDENTS/01Register/StudentRegister';

class StudentRegisterPersonalInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formSubmitted: false,
            infoList: [],
        }
    }

    componentDidMount = () => {
        this._getSchoolStudent();
    }
    /* start API*/
    _getSchoolStudent = () => {

        const cb = (obj) => {
            console.log("cb : ", obj);
            const theList = obj.body[0];
            console.log(theList);
            this.setState({ infoList: theList });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        if (this.props.auth.userInfo.student) {
            const params = {
                student_id: this.props.auth.userInfo.student.student_id,
            }
            // console.log(JSON.stringify(body, null, 2));
            apiStudent.getSchoolStudent(params, this.props.auth.token, cb, eCb);
        }
    }

    convertIdType = (id_type) => {
        let result = "";
        if (id_type === "id_card") {
            result = "居民身份证";
        }
        return result;
    }

    /* end API*/
    navigationTo = (url) => {
        // const data = {
        //     ...this.props.auth.relatedData.course,
        //     conferenceId: '',
        // }

        // this.props.setRelatedCourseDataP(data);
        this.props.history.push(url);
    }

    render() {
        const { classes } = this.props;
        const { infoList } = this.state;
        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">报名申请</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <Form>
                                    <Grid container spacing={32} alignItems="stretch">
                                        <Grid item xs={2} >
                                            姓
                                        </Grid>
                                        <Grid item xs={10}>
                                            {infoList.last_name}
                                        </Grid>
                                        <Grid item xs={2} >
                                            名
                                        </Grid>
                                        <Grid item xs={10}>
                                            {infoList.first_name}
                                        </Grid>
                                        <Grid item xs={12} >&nbsp;</Grid>


                                        <Grid item xs={2} >
                                            中文姓名
                                        </Grid>
                                        <Grid item xs={10}>
                                            {infoList.name_zh}
                                        </Grid>
                                        <Grid item xs={2} >
                                            证件类别和号码 :
                                        </Grid>
                                        <Grid item xs={1} >
                                            {this.convertIdType(infoList.id_type)}
                                        </Grid>
                                        <Grid item xs={9}>
                                            {infoList.id_no}
                                        </Grid>
                                        <Grid item xs={2} >
                                            出生日期
                                        </Grid>
                                        <Grid item xs={10}>
                                            {infoList.date_of_birth?dateToDayMonthYearWithoutWord(infoList.date_of_birth):null}
                                        </Grid>
                                        <Grid item xs={2} >
                                            手提电话号码
                                        </Grid>
                                        <Grid item xs={10}>
                                            {infoList.mobile}
                                        </Grid>
                                        <Grid item xs={12} >&nbsp;</Grid>


                                        <Grid item xs={2} >
                                            电邮
                                        </Grid>
                                        <Grid item xs={10}>
                                            {infoList.email}
                                        </Grid>
                                        <Grid item xs={2} >
                                            微信
                                        </Grid>
                                        <Grid item xs={10}>
                                            {infoList.wechat_id}
                                        </Grid>
                                        <Grid item xs={2} >
                                            QQ
                                        </Grid>
                                        <Grid item xs={10}>
                                            {infoList.qq_id}
                                        </Grid>
                                    </Grid>
                                    <div className="bottomControl clearfix">
                                        <span className="right">
                                            <Button onClick={() => { }} className={classes.greyButton}>编辑资料</Button>
                                            <Button onClick={() => { this.navigationTo('student-register-document-upload') }} className={classes.blackButton}>下一步</Button>
                                        </span>
                                    </div>
                                </Form >
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(StudentRegisterPersonalInformation))));
