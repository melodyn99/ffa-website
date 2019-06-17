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

class NewQuestion extends React.Component {

    render() {
        // const { classes } = this.props;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">资源库管理</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <Grid container spacing={16} alignItems="center">
                                    <Grid item xs={1} >
                                        问题
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        分数
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        选择#A
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        选择#B
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        选择#C
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
                                    </Grid>

                                    <Grid item xs={1} >
                                        选择#D
                                    </Grid>
                                    <Grid item xs={11}>
                                        <input type="text" />
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
