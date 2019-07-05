import React, { Fragment } from 'react';
// import { Publish } from '@material-ui/icons';
import PropTypes from 'prop-types';
import mime from 'mime-types';
import { emitter, EventTypes } from '../Util/EventEmitter';

const ALLOWED_MIME = [
    'text/plain',
    'text/csv',
    'text/tab-separated-values',
    'text/html',
    'text/xml',
    'text/uri-list',
    'text/calendar',
    'text/x-vcard',
    'text/javascript',
    'application/javascript',
    'image/bmp',
    'image/gif',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/x-icon',
    'audio/basic',
    'audio/mpeg',
    'audio/midi',
    'audio/x-pn-realaudio',
    'audio/x-wav',
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/msvideo',
    'video/x-msvideo',
    'video/x-ms-wmv',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.oasis.opendocument.text',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.oasis.opendocument.presentation',
    'application/zip',
];

const ALLOWED_EXTENSTIONS = [
    'txt',
    'csv',
    'tsv',
    'htm',
    'html',
    'xml',
    'js',
    'doc',
    'gif',
    'bmp',
    'gif',
    'jpeg',
    'jpg',
    'png',
    'ico',
    'snd',
    'mp3',
    'mid',
    'midi',
    'ra',
    'rm',
    'wav',
    'mp4',
    'mpg',
    'mpeg',
    'qt',
    'mov',
    'moov',
    'avi',
    'wmv',
    'pdf',
    'doc',
    'docx',
    'odt',
    'xls',
    'xlsx',
    'ods',
    'ppt',
    'pptx',
    'odp',
    'zip',
];

export default class FileInput extends React.Component {
    static propTypes = {
        onSelected: PropTypes.func.isRequired,
    }

    inputElem = null;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setInputElem = this.setInputElem.bind(this);
    }

    componentDidMount() {
        emitter.addListener(EventTypes.OPEN_FILE_BROWSER, this.handleClick);
    }

    componentWillUnmount() {
        emitter.removeListener(EventTypes.OPEN_FILE_BROWSER, this.handleClick);
    }

    handleSubmit(e) {
        e.stopPropagation();
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const alertMessages = [];
            const fileExt = file.name.split('.').pop();
            const isAllowedMime = ALLOWED_MIME.indexOf(file.type) > -1;
            if (!isAllowedMime && ALLOWED_EXTENSTIONS.indexOf(fileExt) === -1) {
                console.log('Unsupported file type: ', file.name, file.type);
                alertMessages.push('档案类型不支援（只接受doc, ppt, mp4, jpg, pdf, ...）');
            }
            if (file.size > 100 * 1024 * 1000) {
                console.log('Invalid file size: ', file.size);
                alertMessages.push('档案大小超出上限（必顺小于 100mb）');
            }
            if (alertMessages.length > 0) {
                alert(alertMessages.join('\n'));
            } else {
                const type = isAllowedMime ? file.type : mime.lookup(fileExt);
                this.handleFile(file, type);
            }
        }
        e.target.value = null;
    }

    handleClick() {
        const inputElem = this.inputElem;
        if (inputElem) {
            inputElem.click();
        }
    }

    handleFile(file, type) {
        const reader = new FileReader();
        const { onSelected } = this.props;
        const fileName = (file.name).replace(/\s|-/g, '_');

        reader.onload = (evt) => {
            const fileData = {
                type,
                content: evt.target.result.split('base64,')[1],
                extension: type.split('/')[1],
            };
            const data = {
                url: `Content-Type:${fileData.type || 'text/csv'}\r\nContent-Disposition:attachment;filename=\"${encodeURI(fileName)}\"\r\nContent-Transfer-Encoding: base64\r\n\r\n${fileData.content}`
            };
            console.log("data", data)
            onSelected(data);
        };
        reader.readAsDataURL(file);
    }

    setInputElem(elem) {
        this.inputElem = elem;
    }

    render() {
        // const { title } = this.props;
        return (
            <Fragment>
                {/* {title
                    ? <div style={{ textTransform: 'lowercase' }}>{title}</div>
                    : <Publish />} */}
                <input
                    type="file"
                    onChange={this.handleSubmit}
                    onClick={this.handleClick}
                    accept={ALLOWED_MIME.join(',')}
                    style={{ display: 'none' }}
                    multiple
                    ref={this.setInputElem}
                />
            </Fragment>
        );
    }
}
