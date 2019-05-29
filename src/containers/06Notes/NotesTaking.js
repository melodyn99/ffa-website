import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
    List, ListItem, ListItemText, Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { apiNoteTaking } from '../../Api/ApiNoteTaking';
import { dateToDayAndMonth } from '../../Util/DateUtils';
import { setNoteTitle, viewingNoteAction } from '../../Redux/Action/eventAction';
import { autoScrollTop } from '../../Util/ScrollToTop';

const styles = () => ({
    list: {
        padding: '0px',
    },
    listItem: {
        '&:nth-of-type(even)': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        paddingTop: '20px',
        paddingBottom: '20px',
    },
    listItemText: {
        marginLeft: '20px',
        '& p ': {
            padding: 0,
        },
    },
    typography: {
        color: 'rgba(0, 0, 0, 0.4)',
        fontSize: '20px',
    },
});

class Calendar extends React.Component {
    state = {
        listNote: [],
    }

    componentDidMount() {
        // const { viewingSeminar } = this.props;
        // apiNoteTaking.getNoteTakingList({ conference: viewingSeminar ? viewingSeminar.conference_id : '', $orderby: 'name' }).then(
        //     (resp) => {
        //         console.log(resp);
        //         this.setState({
        //             listNote: resp,
        //         });
        //     },
        // );

        this._getNoteTakingList();
    }

    _getNoteTakingList = () => {

        const { viewingSeminar } = this.props;

        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.setState({
                listNote: obj.body,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = {
            conference: 'f0c3b12a-0ec7-4958-8d7c-b31602f4065e'
            //viewingSeminar ? viewingSeminar.conference_id : ''
            , $orderby: 'name'
        }

        apiNoteTaking.getNoteTakingList(params, this.props.auth.token, cb, eCb);
    }

    render() {
        const { classes, dispatch } = this.props;
        const { listNote } = this.state;
        return (
            <div className={classes.notesWrapper}>
                <List className={classes.list}>
                    {
                        listNote.map(item => (
                            <ListItem
                                onClick={() => {
                                    dispatch(setNoteTitle(item.name));
                                    dispatch(viewingNoteAction(item));
                                }}
                                component={Link}
                                to={{
                                    pathname: '/notecontent',
                                    search: item.note_id,
                                    state: item,
                                }}
                                className={classes.listItem}
                                key={Math.random()}
                            >
                                <ListItemText
                                    primary={item.name}
                                    secondary={item.created_by}
                                    className={classes.listItemText}
                                />
                                <Typography className={classes.typography}>
                                    {
                                        dateToDayAndMonth(item.createddate)
                                    }
                                </Typography>
                            </ListItem>
                        ))
                    }
                </List>
            </div>
        );
    }
}

Calendar.propTypes = {
    classes: PropTypes.object.isRequired,
    viewingSeminar: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    viewingSeminar: state.seminarReducer.viewingSeminar,
});

export default autoScrollTop(
    connect(mapStateToProps)(withStyles(styles)(Calendar)));

// import React, { Component } from 'react';
// // import { Redirect } from 'react-router';
// import { withTranslation } from 'react-i18next';

// import { CommonStyles } from '../../utils/01MaterialJsStyles/common'
// import { HeaderStyles } from '../../utils/01MaterialJsStyles/header'
// import combineStyles from '../../utils/01MaterialJsStyles/combineStyles';
// import { withStyles } from '@material-ui/core/styles';
// import { Button } from '@material-ui/core';

// import BreadCrumb from '../../components/100Include/breadcrumb';

// import { apiNoteTaking } from '../../Api/ApiNoteTaking';

// import { connect } from 'react-redux';

// class NotesTaking extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             formSubmitted: false
//         }
//     }

//     componentDidMount = () => {
//         this._getNotes();
//     }

//     componentDidUpdate = () => {
//         // sessionStorage.setItem('state', JSON.stringify(this.state));
//         // console.log(this.state);
//     }

//     windowResize = () => {
//         var resizeTimer;
//         clearTimeout(resizeTimer);
//         resizeTimer = setTimeout(function () {
//             // do something
//         }, 100);
//     }

//     _getNotes = () => {

//         const cb = (obj) => {
//             console.log("cb : ", obj);
//         }
//         const eCb = (obj) => {
//             console.log("eCb : ", obj);
//         }

//         apiNoteTaking.getNoteTakingList(this.props.auth.token, cb, eCb);
//     }

//     render() {
//         // const { i18n } = this.props;

//         return (
//             <div>
//                 <div className="wrapper-container-main">
//                     <div className="container-main">

//                         <h2 className="pageTitle">報名歷史</h2>

//                         <div className="wrapper-content">
//                             <BreadCrumb />

//                             <div className="content">
//                                 <Button
//                                     className={this.props.classes.createButton}
//                                     onClick={() => { this._signInAsync() }}
//                                 >Hello</Button>
//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }

// const mapStateToProps = (state) => ({
//     auth: state.auth
// });

// const mapDispatchToProps = dispatch => ({
//     // loginP: data => dispatch(login(data)),
//     // verifyT: token => dispatch(verifyToken(token)),
// });

// const combinedStyles = combineStyles(CommonStyles, HeaderStyles);

// export default withTranslation()(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(NotesTaking)));
