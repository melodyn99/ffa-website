// Essential for all components
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

// Styling
import { CommonStyles } from '../../utils/01MaterialJsStyles/00Common/common'
import { DocumentStyles } from '../../utils/01MaterialJsStyles/Document.js'
import combineStyles from '../../utils/01MaterialJsStyles/00Common/combineStyles';
import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, Checkbox, Dialog } from '@material-ui/core';
import {
    MailOutline as Mail, GetApp as Download, Delete as TrashCan, CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon,
} from '@material-ui/icons';

// Api
import { apiMaterial } from '../../Api/ApiMaterial';
import { apiEventPptFile } from '../../Api/ApiEventPptFile';
import { apiNoteFile } from '../../Api/ApiNoteFile';
// import { apiStudents } from '../../Api/ApiStudents';

// Redux
import { connect } from 'react-redux';

// Utils
import { autoScrollTop } from '../../Util/ScrollToTop';
import { last } from 'lodash-es'
import CommonUtils, { getErrorMessage, getThumbnail } from '../../Util/CommonUtils';
import moment from 'moment';

class DocumentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expandControl: [],
            prevExpand: -1,
            check: new Array(props.documents.length).fill(false),
            student_mails: null,
            review: {
                url: ''
            },
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    async componentDidMount() {
        // const { viewingSeminar
        //     // , setStudentContainer 
        // } = this.props;
        // const student_mails = [];

        // try {
        //     const companies = await apiStudents.getConferenceStudent(viewingSeminar.conference_id);
        //     for (const company of companies) {
        //         student_mails.push(...company.students.map(s => s.email));
        //     }
        // } catch (_) { }

        // this.setState({
        //     student_mails,
        // });
    }

    getPermissionObject() {
        let permission = {
            sendToAllStudents: false,
            sendToStudent: false,
            download: true,
            deleteFile: false
        };
        const { profile, viewingSeminar } = this.props;
        if (profile.role === 1) {
            permission.sendToAllStudents = true;
            permission.sendToStudent = true;
            permission.download = true;
            permission.deleteFile = true;
        } else if (profile.role === 2) {
            permission.sendToAllStudents = true;
            permission.sendToStudent = true;
            permission.download = true;
            permission.deleteFile = false;
        } else if (viewingSeminar) {
            const currentUsername = profile.username;
            function checkWhetherLoginUserIsSeminarTeacher(teacher) {
                const teacherUser = teacher.user;
                const teacherUsername = teacherUser.username || teacherUser;
                return teacherUsername === currentUsername;
            }
            const conferenceSections = viewingSeminar.conference_sections;
            const isSeminarTeacher = conferenceSections && conferenceSections.length > 0 && conferenceSections.some(confSect => {
                const teachers = confSect.teachers;
                return teachers && teachers.length > 0 && teachers.some(checkWhetherLoginUserIsSeminarTeacher);
            });

            if (isSeminarTeacher) {
                permission.sendToAllStudents = true;
                permission.sendToStudent = true;
                permission.download = true;
                permission.deleteFile = true;
            } else {
                permission.sendToAllStudents = false;
                permission.sendToStudent = false;
                permission.download = true;
                permission.deleteFile = false;
            }
        }
        return permission;
    }

    handleClick(key) {
        const { expandControl, prevExpand } = this.state;
        const array = expandControl;
        array[key] = !array[key];
        if (prevExpand !== -1 && prevExpand !== key && array[prevExpand]) {
            array[prevExpand] = !array[prevExpand];
        }
        this.setState({
            expandControl: array,
            prevExpand: key,
        });
    }

    makeEmail(file, mails = []) {
        const {
            // viewingEvent, 
            profile, viewingSeminar } = this.props;
        // const { student_mails } = this.state;
        return {
            mails,
            subject: `[菲力FABLEAD][${viewingSeminar.name}] ${profile.display_name}发送一个课件给你`,
            body: `${profile.display_name}经${viewingSeminar.name}发送${decodeURI(file.name)}给你
      
      连结：${file.url}
      
      `,
        };
    }

    handleDelete(d) {
        const { onUpdate, listingType, profile } = this.props;
        const result = window.confirm('您确定要删除此文件吗?');
        if (result) {
            if (listingType === 'material') {
                apiMaterial.deleteMaterial(d.material_id)
                    .then(() => {
                        onUpdate();
                    })
                    .catch((e) => {
                        let message = getErrorMessage(e) || 'Failed to delete material';
                        onUpdate();
                        alert(message);
                    });
            }
            if (listingType === 'note') {
                apiNoteFile.deleteNoteFile(d.note_file_id)
                    .then(() => {
                        onUpdate();
                    })
                    .catch((e) => {
                        let message = getErrorMessage(e) || 'Failed to delete note';
                        onUpdate();
                        alert(message);
                    });
            }
            if (listingType === 'eventppt') {
                apiEventPptFile.deleteEventPptFile(d.event_preparation_file_id)
                    .then((rs) => {
                        onUpdate();
                    }).catch((e) => {
                        let message = getErrorMessage(e) || 'Failed to delete file';
                        onUpdate();
                        alert(message);
                    });
            }
            if (listingType === 'material_class' && profile.role !== 2) {
                this.props.removeFile(d.material_id);
            }
        }
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    renderItem(d, i) {
        const {
            classes, hasCheckbox, handleCheckbox, sendStudents,
            // profile,
        } = this.props;
        const { expandControl, check, student_mails } = this.state;
        const { file } = d;
        const date = new Date(file.createddate);
        const permission = this.getPermissionObject();
        return (
            <div
                key={i}
                className={!expandControl[i]
                    ? classes.documentWrapper : classes.documentWrapperOpen}
            >
                <div className={classes.document} onClick={() => !hasCheckbox && this.handleClick(i)}>
                    {hasCheckbox && (
                        <Checkbox
                            className={classes.checkBox}
                            icon={<CheckBoxOutlineBlankIcon style={{ fontSize: 36 }} />}
                            checkedIcon={<CheckBoxIcon style={{ fontSize: 36 }} />}
                            checked={check[i]}
                            onChange={() => {
                                handleCheckbox(d, !check[i]);
                                const excheck = check;
                                excheck[i] = !excheck[i];
                                this.setState({ check: excheck });
                            }}
                        />
                    )}
                    <div style={{ flex: '1', flexGrow: '1', textAlign: 'center' }}>
                        <img
                            src={file.mime_type.text_value.startsWith('image/') ? file.url : getThumbnail(file.mime_type.text_value)}
                            alt="document"
                            width="42px"
                            height="42px"
                            onClick={() => {
                                console.log('onclick', last(file.url.split('/')))
                                if (file.mime_type.text_value.startsWith('image/')) {
                                    this.setState({
                                        review: file,
                                        open: true
                                    })
                                }
                            }}
                        />
                    </div>
                    <div className={classes.rightDocumentWrapper}>
                        <div style={{ width: "calc(100% - 150px)", wordBreak: "break-all" }}>
                            {decodeURI(last(file.url.split('/')))}
                        </div>
                        <div className={classes.documentInfo}>
                            <Typography variant="subtitle1">{file.size / 1000} KB</Typography>
                            <Typography variant="subtitle1" style={{ marginRight: '30px' }}>
                                {`${moment(date).format('MM[月] DD[日]')}`}
                            </Typography>
                        </div>
                    </div>
                </div>
                {
                    expandControl[i] && (
                        <div className={classes.editBar} onClick={() => this.handleClick(i)}>
                            {permission.sendToAllStudents && student_mails && sendStudents && (
                                <Button
                                    classes={{ label: classes.label }}
                                    onClick={() => {
                                        CommonUtils.sendMailWithLink(this.makeEmail(file, student_mails));
                                    }}
                                >
                                    <img className={classes.iconSpeaker} src="https://image.ibb.co/dD2xK9/speaker.png" alt="img" />发给所有学生
                                </Button>
                            )}
                            {permission.sendToStudent && (
                                <Button
                                    classes={{ label: classes.label }}
                                    onClick={() => {
                                        CommonUtils.sendMailWithLink(this.makeEmail(file, null));
                                    }}
                                >
                                    <Mail className={classes.icon} />发送
                                </Button>
                            )}
                            {permission.download && (
                                <Button
                                    onClick={() => {
                                        return CommonUtils.forceDownload(file.url, CommonUtils.extractFileName(file.url));
                                    }}
                                    classes={{ label: classes.label }}
                                >
                                    <Download className={classes.icon} />下载
                                </Button>
                            )}
                            {permission.deleteFile && (
                                <Button
                                    onClick={() => this.handleDelete(d)}
                                    classes={{ label: classes.label }}
                                >
                                    <TrashCan className={classes.icon} />移除
                                </Button>
                            )}
                        </div>
                    )
                }
            </div>
        );
    }

    render() {
        const { documents } = this.props;
        return (
            <Fragment>
                {documents.map(this.renderItem)}
                <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <img src={this.state.review.url} alt="" style={{ width: '100%', height: 'auto' }} />
                </Dialog>
            </Fragment>
        );
    }
}

DocumentList.propTypes = {
    classes: PropTypes.object.isRequired,
    documents: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    listingType: PropTypes.string.isRequired,
    removeFile: PropTypes.func,
};

const mapStateToProps = state => ({
    viewingEvent: state.eventReducer.viewingEvent,
    viewingSeminar: state.seminarReducer.viewingSeminar,
});

const combinedStyles = combineStyles(CommonStyles, DocumentStyles);

export default withTranslation()(autoScrollTop(connect(mapStateToProps, null)(withStyles(combinedStyles)(DocumentList))));

