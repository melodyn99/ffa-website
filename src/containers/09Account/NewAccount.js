// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import Grid from '@material-ui/core/Grid';

// Api
// import { apiAuth } from '../../Api/ApiAuth';
// import { apiConferences } from '../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils


// Children components
import BreadCrumb from '../../components/100Include/breadcrumb';
// import data from '../../data/09Account/EnrollmentHistory';

class NewAccount extends React.Component {

    render() {
        // const { classes } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">账户管理</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <Grid container spacing={16} alignItems="center">
                                    <Grid item xs={1} >
                                        姓*
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        名*
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        账户类型*
                                    </Grid>
                                    <Grid item xs={11}>
                                        <select>
                                            <option value="1">老师</option>
                                            <option value="2">老师</option>
                                            <option value="3">老师</option>
                                            <option value="4">老师</option>
                                        </select>
                                    </Grid>

                                    <Grid item xs={1} >
                                        性别*
                                    </Grid>
                                    <Grid item xs={11}>
                                        <select>
                                            <option value="boy">男</option>
                                            <option value="girl">女</option>
                                        </select>
                                    </Grid>

                                    <Grid item xs={1} >
                                        联络电话*
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        电邮*
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        微信
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        省市区
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        联络住址
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NewAccount.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(NewAccount)));
