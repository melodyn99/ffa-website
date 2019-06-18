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

// Material UI
import Grid from '@material-ui/core/Grid';

// Api
// import { apiAuth } from '../../Api/ApiAuth';
// import { apiConferences } from '../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils


// Children components
import BreadCrumb from '../../../components/100Include/breadcrumb';
// import data from '../../data/09Account/EnrollmentHistory';

class NewNews extends React.Component {

   render() {
       // const { classes } = this.props;

       return (
           <div>
               <div className="wrapper-container-main">
                   <div className="container-main">

                       <h2 className="pageTitle">新闻管理</h2>

                       <div className="wrapper-content">
                           <BreadCrumb />

                           <div className="content">
                               <Grid container spacing={16} alignItems="center">
                                   <Grid item xs={1} >
                                       新闻标题
                                   </Grid>
                                   <Grid item xs={11}>
                                       <input type="text" />
                                   </Grid>

                                   <Grid item xs={1} >
                                       新闻内容
                                   </Grid>
                                   <Grid item xs={11}>
                                       <input type="text" />
                                   </Grid>

                                   <Grid item xs={12} >
                                       新闻图片
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

NewNews.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(NewNews)));
