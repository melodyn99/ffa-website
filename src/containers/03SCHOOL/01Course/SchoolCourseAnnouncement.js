// Essential for all components
import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../../utils/01MaterialJsStyles/00Common/common'
import combineStyles from '../../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';

// Material UI
import PropTypes from 'prop-types';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import Checkbox from '@material-ui/core/Checkbox';

// Api
// import { apiAuth } from '../../../Api/ApiAuth';
// import { apiConferences } from '../../../Api/ApiConferences';

// Redux
import { connect } from 'react-redux';

// Utils
// import { getSorting } from '../../../utils/02MaterialDesign/EnhancedTable';

// Children components
import BreadCrumb from '../../../components/100Include/Breadcrumb';
import SubMenu from '../../../components/104SubMenus/03SCHOOL/01Course/SchoolCourse';
import ListType4 from '../../../components/102Grids/ListType4';
// import EnhancedTableHead from '../../../components/103MaterialDesign/EnhancedTable/EnhancedTableHead';

function Block(props) {
    return (
        <ListType4
            name={props.name}
            content={props.content}
        />
    )
}

function Cluster(props) {
    let rows = [];
    for (let i = 0; i < 3; i++) {
        rows.push(
            <div key={i}>
                <div className="align-center">4分钟前</div>
                <div className="sep-10"></div>
                <Block
                    key={i}
                    name={props.name}
                    content={props.content}
                />
                <div className="sep-10"></div>
            </div>
        )
    }
    return (rows);
}

class SchoolCourseAnnouncement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: ['彭'],
            content: ['abcabacabcabcabacabcabcacbacbabcabafdsfadsfadsfadfasdfasdfasdfasdfadsfasdabcabacabcabcabacabcabcacbacbabcabafdsfadsfadsfadfasdfasdfasdfasdfadsfasdabcabacabcabcabacabcabcacbacbabcabafdsfadsfadsfadfasdfasdfasdfasdfadsfdfasdfadfasdfadsafdsfasdfadfadsfdaasd']
        }
    }

    render() {
        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">S1-001品牌盈利模式</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />
                            <SubMenu />

                            <div className="content">
                                <Cluster
                                    name={this.state.name}
                                    content={this.state.content}
                                /></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

SchoolCourseAnnouncement.propTypes = {
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

export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(SchoolCourseAnnouncement)));
