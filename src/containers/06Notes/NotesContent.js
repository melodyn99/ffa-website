// Essential for all components
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/common'
import { NoteContentStyles } from '../../utils/01MaterialJsStyles/NoteContent.js'
import combineStyles from '../../utils/01MaterialJsStyles/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Tabs, Tab, AppBar, Typography } from '@material-ui/core';

// Api
import { apiNoteTaking } from '../../Api/ApiNoteTaking';
import { apiNoteFile } from '../../Api/ApiNoteFile';
import { apiFile } from '../../Api/ApiFile';

// Redux
import { connect } from 'react-redux';
import { setNoteTitle, viewingNoteAction } from '../../Redux/Action/eventAction';

// Utils
import { autoScrollTop } from '../../Util/ScrollToTop';
import { emitter, EventTypes } from '../../Util/EventEmitter';
// import DocumentList from '../Library/DocumentList';

// Children components
import BreadCrumb from '../../components/100Include/breadcrumb';

class NoteContent extends Component {
    constructor(props) {
        super(props);
        console.log('pr', props);
        this.state = {
            noteFile: [],
            content: '',
            name: '',
            activeTab: 'text'
        };
    }

    componentDidMount() {
        this.getNoteFile();
        this.changeNoteType(EventTypes.CHANGE_TYPE_NOTE, 'text');
        const { viewingNote, location } = this.props
        console.log('viewingNote', viewingNote)
        console.log('location', location)
        this.setState({
            content: viewingNote.content,
            name: viewingNote.name,
        })
        emitter.addListener(EventTypes.ADD_FILE_TO_NOTE, (data) => {
            apiFile.createFile(data).then((res) => {
                console.log(res);
                apiNoteFile.createNoteFile({ file: res.file_id, note: viewingNote.note_id }).then((resp) => {
                    console.log('rr', resp);
                    this.getNoteFile();
                });
            }).catch((err) => {
                console.log(err);
            });
        });
    }
    componentWillUnmount() {
        emitter.removeListener(EventTypes.ADD_FILE_TO_NOTE);
    }

    getNoteFile = () => {
        const { viewingNote } = this.props;
        apiNoteFile.getNoteFileForNote(viewingNote.note_id).then((rs) => {
            console.log(rs);
            this.setState({ noteFile: rs });
        }).catch(err => console.log(err));
    }

    switchTab = (tab) => {
        this.setState({
            activeTab: tab
        })
        this.changeNoteType(EventTypes.CHANGE_TYPE_NOTE, tab);
    }
    changeNoteType = (eventName, data) => {
        emitter.emit(eventName, data);
    }
    render() {
        const { classes, profile } = this.props;
        const { noteFile, content, name, activeTab } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs
                        scrollable
                        fullWidth
                        classes={{ indicator: classes.indicator }}
                        value={activeTab}
                    >
                        <Tab label="笔记" value="text" onClick={() => this.switchTab('text')} />
                        <Tab label={`文件 (${noteFile.length})`} value="file" onClick={() => this.switchTab('file')} />
                    </Tabs>
                </AppBar>
                {activeTab === 'text' ? (
                    <div className={classes.content}>
                        <textarea
                            value={content}
                            placeholder="请输入"
                            className={classes.input}
                            disabled
                        />


                    </div>
                ) : (
                        <div className={classes.divScroll}>
                            {/* <DocumentList
                                onUpdate={() => this.getNoteFile()}
                                documents={noteFile}
                                listingType="note"
                                profile={profile}
                            /> */}
                        </div>

                    )}
            </div>
        );
    }
}

NoteContent.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    library: state.libraryReducer.library,
    profile: state.profileReducer,
    viewingNote: state.eventReducer.viewingNote,
});

const combinedStyles = combineStyles(CommonStyles, NoteContentStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, null)(withStyles(combinedStyles)(NoteContent))));
