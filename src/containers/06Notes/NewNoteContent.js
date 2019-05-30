// Essential for all components
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/common';
import { NewNoteContentStyles } from '../../utils/01MaterialJsStyles/NewNoteContent';
import combineStyles from '../../utils/01MaterialJsStyles/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, AppBar } from '@material-ui/core';

// Api
import { apiNoteTaking } from '../../Api/ApiNoteTaking';
import { apiNoteFile } from '../../Api/ApiNoteFile';
import { apiFile } from '../../Api/ApiFile';

// Redux
import { connect } from 'react-redux';

// Utils
import { autoScrollTop } from '../../Util/ScrollToTop';
import { emitter, EventTypes } from '../../Util/EventEmitter';
import DocumentList from '../Library/DocumentList';

// Children components
import BreadCrumb from '../../components/100Include/breadcrumb';

class NewNoteContent extends Component {
    constructor(props) {

        super(props);

        this.state = {
            activeTab: 'text',
            noteFile: [],
            noteText: '',
        };
    }

    componentDidMount() {
        // const { location: { state: { newNote } } } = this.props;
        // console.log(newNote);

        this._getNoteFile();
        // emitter.addListener(EventTypes.CONFIRM_NOTE_TEXT, () => {
        this._submitNote();
        // });
        // emitter.addListener(EventTypes.ADD_FILE_TO_NOTE, (data) => {

        // apiFile.createFile(data).then((res) => {
        //     console.log(res);
        //     apiNoteFile.createNoteFile({ file: res.file_id, note: newNote.note_id }).then((resp) => {
        //         console.log('rr', resp);
        //         this._getNoteFile();
        //     });
        // }).catch((err) => {
        //     console.log(err);
        // });
        // });
    }

    _getNoteFile = () => {
        // const { location: { state: { newNote } } } = this.props;
        // apiNoteFile.__getNoteFileForNote(newNote.note_id).then((rs) => {
        //     console.log(rs);
        //     this.setState({ noteFile: rs });
        // }).catch(err => console.log(err));
    }

    // changeNoteType = (eventName, data) => {
    //     emitter.emit(eventName, data);
    // }

    _submitNote = () => {
        // const { history } = this.props;
        // const { newNote } = this.props.location.state;
        // newNote.content = this.state.noteText;

        // apiNoteTaking.editNoteTaking(newNote.note_id, newNote).then((resp) => {
        //     alert('成功');
        //     history.push({
        //         pathname: '/notestaking',
        //         state: {
        //             viewingSeminar: {
        //                 conference_id: resp.conference,
        //             },
        //         },
        //     });
        // });
    }

    _switchTab(activeTab) {
        this.setState({ activeTab });
        this.changeNoteType(EventTypes.CHANGE_TYPE_NOTE, activeTab);
    }

    render() {
        const { classes, profile } = this.props;
        const { noteFile, noteText } = this.state;
        const { activeTab } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        scrollable
                        fullWidth
                        classes={{ indicator: classes.indicator }}
                        value={activeTab}
                    >
                        <Tab label="笔记" value="text" onClick={() => this._switchTab('text')} />
                        <Tab label={`文件 (${noteFile.length})`} value="file" onClick={() => this._switchTab('file')} />
                    </Tabs>
                </AppBar>
                {activeTab === 'text' ? (
                    <div className={classes.content}>
                        <textarea
                            cols="30"
                            rows="10"
                            value={noteText}
                            onChange={(e) => {
                                e.preventDefault();
                                this.setState({
                                    noteText: e.target.value,
                                });
                            }}
                            placeholder="请输入"
                            className={classes.input}
                        />
                    </div>
                ) : (
                        <div style={{
                            height: 'calc(100% - 130px)',
                            overflowY: 'scroll'
                        }}>
                            <DocumentList
                                onUpdate={() => this._getNoteFile()}
                                documents={noteFile}
                                listingType="note"
                                profile={profile}
                            />
                        </div>
                    )}
            </div>
        );
    }
}

NewNoteContent.propTypes = {
    classes: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    library: state.libraryReducer.library,
    profile: state.profileReducer,
});

const combinedStyles = combineStyles(CommonStyles, NewNoteContentStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, null)(withStyles(combinedStyles)(NewNoteContent))));
