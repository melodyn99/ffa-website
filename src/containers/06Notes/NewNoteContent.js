import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Tabs, Tab, AppBar,
} from '@material-ui/core';
import { connect } from 'react-redux';
import DocumentList from '../../../Library/DocumentList';
import { apiNoteFile } from '../../../../Api/ApiNoteFile';
import { apiFile } from '../../../../Api/ApiFile';
import { emitter, EventTypes } from '../../../../Util/EventEmitter';
import { apiNoteTaking } from '../../../../Api/ApiNoteTaking';
import { autoScrollTop } from '../../../../Misc/ScrollToTop';


const styles = () => ({
  root: {
    height: '100vh',
  },
  content: {
    flex: 1,
    padding: '10px'
  },
  input: {
    border: 'none',
    width: '100%',
    minHeight: '50vh',
    maxWidth: '96vw',
    '& :focus ': {
      border: 'none',
    },
  },
});

class NewNoteContent extends Component {
  constructor(props) {
    super(props);
    console.log('pr', props);
    const { location: { state: { newNote } } } = props;
    this.state = {
      activeTab: 'text',
      noteFile: [],
      noteText: newNote.content,
    };
  }

  componentDidMount() {
    const { location: { state: { newNote } } } = this.props;
    console.log(newNote);
    this.getNoteFile();
    emitter.addListener(EventTypes.CONFIRM_NOTE_TEXT, () => {
      this.submitNote();
    });
    emitter.addListener(EventTypes.ADD_FILE_TO_NOTE, (data) => {
      apiFile.createFile(data).then((res) => {
        console.log(res);
        apiNoteFile.createNoteFile({ file: res.file_id, note: newNote.note_id }).then((resp) => {
          console.log('rr', resp);
          this.getNoteFile();
        });
      }).catch((err) => {
        console.log(err);
      });
    });
  }


  componentWillUnmount() {
    emitter.removeListener(EventTypes.CONFIRM_NOTE_TEXT);
    emitter.removeListener(EventTypes.ADD_FILE_TO_NOTE);
  }

  getNoteFile = () => {
    const { location: { state: { newNote } } } = this.props;
    apiNoteFile.getNoteFileForNote(newNote.note_id).then((rs) => {
      console.log(rs);
      this.setState({ noteFile: rs });
    }).catch(err => console.log(err));
  }

  changeNoteType = (eventName, data) => {
    emitter.emit(eventName, data);
  }


  submitNote = () => {
    const { history } = this.props;
    const { newNote } = this.props.location.state;
    newNote.content = this.state.noteText;
    apiNoteTaking.editNoteTaking(newNote.note_id, newNote).then((resp) => {
      alert('成功');
      history.push({
        pathname: '/notestaking',
        state: {
          viewingSeminar: {
            conference_id: resp.conference,
          },
        },
      });
    });
  }

  switchTab(activeTab) {
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
            <Tab label="笔记" value="text" onClick={() => this.switchTab('text')} />
            <Tab label={`文件 (${noteFile.length})`} value="file" onClick={() => this.switchTab('file')} />
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
            overflowY:'scroll'
          }}>
            <DocumentList
            onUpdate={() => this.getNoteFile()}
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
  history: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  library: state.libraryReducer.library,
  profile: state.profileReducer,
});


const CompWithStyle = withStyles(styles)(NewNoteContent);
export default autoScrollTop(connect(mapStateToProps)(CompWithStyle));
