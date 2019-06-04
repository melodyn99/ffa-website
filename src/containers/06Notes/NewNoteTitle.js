// Essential for all components
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common';
import { NewNoteTitleStyles } from '../../utils/01MaterialJsStyles/06Notes/NewNoteTitle';
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Input, List, ListItem, ListItemText, Button } from '@material-ui/core';

// Api
import { apiNoteTaking } from '../../Api/ApiNoteTaking';

// Redux
import { connect } from 'react-redux';
import { setNoteTitle, viewingNoteAction } from '../../Redux/Action/eventAction';

// Utils
import { autoScrollTop } from '../../Util/ScrollToTop';
// import { emitter, EventTypes } from '../../Util/EventEmitter';

// Children components
import BreadCrumb from '../../components/100Include/breadcrumb';

class NewNoteTitle extends Component {
    state = {
        title: '',
        content: '',
        formSubmitted: false,
    }

    componentDidMount() {
        // console.log(this.props);

        // Have params, editing note.
        // if (state) {
        //     const { name, content } = state;
        //     this.setState({ title: name, content });
        // }
        // emitter.addListener(EventTypes.UPDATE_TITLE_NOTE, () => {
        this._toNoteCreateContent();
        // });
    }

    // componentWillUnmount() {
    //     emitter.removeAllListeners(EventTypes.UPDATE_TITLE_NOTE);
    // }

    _toNoteCreateContent = () => {

        // const { viewingSeminar } = this.props;
        const { title, content } = this.state;
        // const { location: { state } } = this.props;

        if (!title) return;

        const newNote = {
            // conference: viewingSeminar.conference_id,
            conference: 'f0c3b12a-0ec7-4958-8d7c-b31602f4065e',
            name: title,
            content: content || '',
        };

        this.props.setNoteTitle(title);

        // if (state.note_id) {
        //     apiNoteTaking.editNoteTaking(state.note_id, newNote).then((resp) => {
        //         window.alert('成功');
        //         this.props.viewingNoteAction(resp);
        //         // history.push({
        //         //     pathname: '/notecontent',
        //         //     state: { newNote: resp },
        //         // });
        //     });
        // } else {

        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.setState({
                ...this.state,
                formSubmitted: true
            })
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        apiNoteTaking.createNoteTaking(newNote, this.props.auth.token, cb, eCb);

        // apiNoteTaking.createNoteTaking(newNote).then((resp) => {
        //     console.log(resp);
        //     this.props.viewingNoteAction(resp);
        //     // history.push({
        //     //     pathname: '/newnotecontent',
        //     //     state: { newNote: resp },
        //     // });
        // });
        // }
    }

    render() {
        const { classes, i18n } = this.props;
        const { title, content } = this.state;

        if (this.state.formSubmitted) {
            return <Redirect push to={'/' + i18n.language + '/new-note-content'} />
        }

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">報名歷史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <div className={classes.root}>
                                    <List className={classes.list}>
                                        <ListItem>
                                            <ListItemText className={classes.listItemText} primary="记录名称" />
                                            <Input
                                                disableUnderline
                                                placeholder="请输入"
                                                inputProps={{ maxLength: 32 }}
                                                value={this.state.title}
                                                onChange={(e) => {
                                                    e.preventDefault();
                                                    this.setState({
                                                        ...this.state,
                                                        title: e.target.value,
                                                    });
                                                }}
                                            />
                                        </ListItem>
                                    </List>
                                    {
                                        this.props.location.search && (
                                            <div className={classes.content}>
                                                <textarea
                                                    value={content}
                                                    onChange={(e) => {
                                                        e.preventDefault();
                                                        this.setState({
                                                            content: e.target.value,
                                                        });
                                                    }}
                                                    placeholder="请输入"
                                                    className={classes.input}
                                                />
                                            </div>)
                                    }
                                    {
                                        !this.props.location.search && (
                                            <Button
                                                className={classes.createButton}
                                                disabled={!title}
                                                onClick={() => this._toNoteCreateContent()}
                                            >创建</Button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NewNoteTitle.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
    viewingSeminar: PropTypes.object.isRequired,
    // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    location: state.router,
    auth: state.auth,
    viewingSeminar: state.seminarReducer.viewingSeminar,
});

const mapDispatchToProps = dispatch => ({
    setNoteTitle: data => dispatch(setNoteTitle(data)),
    viewingNoteAction: data => dispatch(viewingNoteAction(data)),
});

const combinedStyles = combineStyles(CommonStyles, NewNoteTitleStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, mapDispatchToProps)(withStyles(combinedStyles)(NewNoteTitle))));
