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
        this.state = {
            noteFile: [],
            content: '',
            name: '',
            activeTab: 'text'
        };
    }

    componentDidMount() {
        this._getNoteFile();

        this._changeNoteType(EventTypes.CHANGE_TYPE_NOTE, 'text');

        const { viewingNote } = this.props

        this.setState({
            ...this.state,
            content: viewingNote.content,
            name: viewingNote.name,
        });

        // emitter.addListener(EventTypes.ADD_FILE_TO_NOTE, (data) => {
        //     apiFile.createFile(data).then((res) => {
        //         console.log(res);
        //         apiNoteFile.createNoteFile({ file: res.file_id, note: viewingNote.note_id }).then((resp) => {
        //             console.log('rr', resp);
        //             this._getNoteFile();
        //         });
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // });
    }
    componentWillUnmount() {
        // emitter.removeListener(EventTypes.ADD_FILE_TO_NOTE);
    }

    _getNoteFile = () => {
        const { viewingNote } = this.props;

        const cb = (obj) => {
            // console.log("cb : ", obj);
            this.setState({
                noteFile: obj.body,
            });
        }
        const eCb = (obj) => {
            console.log("eCb : ", obj);
        }

        const params = null;

        apiNoteFile.getNoteFileForNote(viewingNote.note_id, params, this.props.auth.token, cb, eCb);
    }

    _switchTab = (tab) => {
        this.setState({
            activeTab: tab
        })
        this._changeNoteType(EventTypes.CHANGE_TYPE_NOTE, tab);
    }

    _changeNoteType = (eventName, data) => {
        // emitter.emit(eventName, data);
    }

    render() {
        const { classes, profile } = this.props;
        const { noteFile, content, name, activeTab } = this.state;

        return (
            <div>
                <div className="wrapper-container-main">
                    <div className="container-main">

                        <h2 className="pageTitle">報名歷史</h2>

                        <div className="wrapper-content">
                            <BreadCrumb />

                            <div className="content">
                                <div className={classes.root}>
                                    <AppBar position="static">
                                        <Tabs
                                            variant="scrollable"
                                            variant="fullWidth"
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
                                                value={content}
                                                placeholder="请输入"
                                                className={classes.input}
                                                disabled
                                            />


                                        </div>
                                    ) : (
                                            <div className={classes.divScroll}>
                                                {/* <DocumentList
                                                    onUpdate={() => this._getNoteFile()}
                                                    documents={noteFile}
                                                    listingType="note"
                                                    profile={profile}
                                                /> */}
                                            </div>

                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NoteContent.propTypes = {
    classes: PropTypes.object.isRequired,
    // history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    library: state.libraryReducer.library,
    profile: state.profileReducer,
    viewingNote: state.eventReducer.viewingNote,
});

const combinedStyles = combineStyles(CommonStyles, NoteContentStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, null)(withStyles(combinedStyles)(NoteContent))));
