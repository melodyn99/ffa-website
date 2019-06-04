// Essential for all components
import React from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import { NotesTakingStyles } from '../../utils/01MaterialJsStyles/06Notes/NotesTaking'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, Typography, } from '@material-ui/core';

// Api
import { apiNoteTaking } from '../../Api/ApiNoteTaking';

// Redux
import { connect } from 'react-redux';
import { setNoteTitle, viewingNoteAction } from '../../Redux/Action/eventAction';

// Utils
import { autoScrollTop } from '../../Util/ScrollToTop';
import { dateToDayAndMonth } from '../../Util/DateUtils';

// Children components
import BreadCrumb from '../../components/100Include/breadcrumb';

class NotesTaking extends React.Component {
    state = {
        listNote: [],
    }

    componentDidMount() {
        this._getNoteTakingList();
    }

    _getNoteTakingList = () => {

        // const { viewingSeminar } = this.props;

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
        const { i18n, classes } = this.props;
        const { listNote } = this.state;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">報名歷史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">

                                <div className={classes.notesWrapper}>
                                    <List className={classes.list}>
                                        {
                                            listNote.map((item, i) => (
                                                <ListItem
                                                    onClick={() => {
                                                        this.props.setNoteTitle(item.name);
                                                        this.props.viewingNoteAction(item);
                                                    }}
                                                    component={Link}
                                                    to={{
                                                        pathname: '/' + i18n.language + '/notes-content',
                                                        search: 'notes=' + item.note_id,
                                                        // state: item,
                                                    }}
                                                    className={classes.listItem}
                                                    key={i}
                                                >
                                                    <ListItemText
                                                        primary={item.name}
                                                        secondary={item.created_by}
                                                        className={classes.listItemText}
                                                    />
                                                    <Typography className={classes.typography}>
                                                        {dateToDayAndMonth(item.createddate)}
                                                    </Typography>
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NotesTaking.propTypes = {
    classes: PropTypes.object.isRequired,
    viewingSeminar: PropTypes.object.isRequired,
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    viewingSeminar: state.seminarReducer.viewingSeminar,
});

const mapDispatchToProps = dispatch => ({
    setNoteTitle: data => dispatch(setNoteTitle(data)),
    viewingNoteAction: data => dispatch(viewingNoteAction(data)),
});

const combinedStyles = combineStyles(CommonStyles, NotesTakingStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(NotesTaking))));
