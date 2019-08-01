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
import { Button, RadioGroup, FormControlLabel, Radio, FormGroup, Checkbox } from '@material-ui/core';

// Material UI
import Grid from '@material-ui/core/Grid';

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
// import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
import { Form } from 'formik';
import { dateToDayMonthYear } from '../../../Util/DateUtils';


// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/02STUDENTS/01Register/StudentRegister';

class StudentRegisterQuestionnaire extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formSubmitted: false,
            selection1: "",
            selection2a: false,
            selection2b: false,
            selection2c: false,
            isEnableNext: false,
        }
    }

    componentDidMount = () => {

    }

    checkingIsEnbaleNext = () => {
        let bool1 = false;
        let bool2 = false;

        if (this.state.selection1 !== "") {
            bool1 = true;
        }

        if (this.state.selection2a || this.state.selection2b || this.state.selection2c) {
            bool2 = true;
        }

        const resultBool = (bool1 && bool2) ? true : false;
        console.log("checkingIsEnbaleNext()");
        console.log(this.state);
        this.setState({ isEnableNext: resultBool });
    }

    handleRadioSelection = (e) => {
        console.log("e.taget");
        console.log(e.target.name);
        console.log(e.target.value.toString());
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.checkingIsEnbaleNext();
        });
    }

    handleCheckboxesSelection = (e) => {
        console.log("e.taget");
        let result = false;
        const targetCurrBool = this.state[e.target.name];
        if (targetCurrBool === true) {
            result = false;
        } else {
            result = true;
        }
        this.setState({ [e.target.name]: result }, () => {
            this.checkingIsEnbaleNext();
        });
    }

    handleSubmit = () => {
        this.setState({ formSubmitted: true });
    }

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
                                    <Grid container spacing={8} alignItems="stretch">
                                        <Grid item xs={1}>
                                            <div className="underline">问卷调查</div>
                                        </Grid>
                                        <Grid item xs={12}>&nbsp;</Grid>
                                        {(!this.state.formSubmitted)
                                            ?
                                            <Grid container spacing={8} alignItems="stretch">
                                                < Grid item xs={12} >
                                                    1. 你对本专业的就业前景了解程度:
                                            </Grid>
                                                <Grid item xs={12}>
                                                    <RadioGroup
                                                        aria-label="selection"
                                                        name="selection1"
                                                        className={classes.group}
                                                        value={this.state.selection1}
                                                        onChange={e => { this.handleRadioSelection(e); }}
                                                    >
                                                        <FormControlLabel value="a" control={<Radio color="default" />} label="A. 非常了解" />
                                                        <FormControlLabel value="b" control={<Radio color="default" />} label="B. 一般了解" />
                                                        <FormControlLabel value="c" control={<Radio color="default" />} label="C. 知之甚少" />
                                                        <FormControlLabel value="d" control={<Radio color="default" />} label="D. 完全不了解" />
                                                        {/* <FormControlLabel
                                                value="disabled"
                                                disabled
                                                control={<Radio />}
                                                label="(Disabled option)"
                                            /> */}
                                                    </RadioGroup>
                                                </Grid>
                                                <Grid item xs={12}>&nbsp;</Grid>

                                                <Grid item xs={12} >
                                                    2.在学习上，你存在的主要困难是（多选）:
                                            </Grid>
                                                <Grid item xs={12}>
                                                    <FormGroup>
                                                        <FormControlLabel
                                                            control={<Checkbox checked={this.selection2a} name="selection2a" onChange={e => { this.handleCheckboxesSelection(e); }} color="default" />}
                                                            label="A. 课堂的教学方式不适应"
                                                        />
                                                        <FormControlLabel
                                                            control={<Checkbox checked={this.selection2b} name="selection2b" onChange={e => { this.handleCheckboxesSelection(e); }} color="default" />}
                                                            label="B. 没有明确的学习目标"
                                                        />
                                                        <FormControlLabel
                                                            control={
                                                                <Checkbox checked={this.selection2c} name="selection2c" onChange={e => { this.handleCheckboxesSelection(e); }} color="default" />
                                                            }
                                                            label="C. 学习缺少动力"
                                                        />
                                                    </FormGroup>
                                                </Grid>
                                                <Grid item xs={12}>&nbsp;</Grid>

                                                {this.state.isEnableNext
                                                    ?
                                                    <Grid item xs={12} className="center" >
                                                        <Button onClick={() => this.handleSubmit()} className={classes.blueButton}>提交</Button>
                                                    </Grid>
                                                    :
                                                    <Grid item xs={12} className="center" >
                                                        <Button onClick={() => { }} className={classes.greyButton}>提交</Button>
                                                    </Grid>
                                                }
                                            </Grid>
                                            :
                                            <Grid container spacing={8} alignItems="stretch">
                                                < Grid item xs={12}>
                                                    问卷已经提交完毕
                                                </Grid>
                                                <Grid item xs={12}>&nbsp;</Grid>

                                                <Grid item xs={1}>
                                                    提交日期
                                                </Grid>
                                                <Grid item xs={11}>
                                                    {dateToDayMonthYear()}
                                                </Grid>

                                            </Grid>
                                        }
                                        <Grid item xs={12}>&nbsp;</Grid>
                                        <Grid item xs={12}>&nbsp;</Grid>
                                    </Grid>
                                    <div className="bottomControl clearfix">
                                        <Button onClick={() => { this.navigationTo('student-register-document-upload') }} className={classes.blackButton}>上一步</Button>

                                        {this.state.formSubmitted ?
                                            <span className="right">
                                                <Button onClick={() => { this.navigationTo('student-register-fee') }} className={classes.blackButton}>下一步</Button>
                                            </span>
                                            :
                                            <span className="right">
                                                <Button className={classes.greyButton}>下一步</Button>
                                            </span>
                                        }
                                    </div>
                                </Form>


                            </div>
                        </div>

                    </div>
                </div >
            </div >
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({

});

const combinedStyles = combineStyles(CommonStyles);

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(withRouter(StudentRegisterQuestionnaire))));
