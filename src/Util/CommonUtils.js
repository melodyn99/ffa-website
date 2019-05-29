import { isNaN, isNumber } from 'lodash-es';
import moment from 'moment';

import mime from 'mime-types';
import FileSaver from 'file-saver';

import mp4Icon from "../images/mp4.png";
import mp3Icon from "../images/mp3.png";
import pptIcon from "../images/ppt.png";
import xlsIcon from "../images/xls.png";
import docIcon from "../images/doc.png";
import unknownIcon from "../images/unknown.png";

const CommonUtils = {
	dataURLtoFile: (dataurl, filename) => {
		const arr = dataurl.split(',');
		const bstr = atob(arr[1]);

		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: '*/*' });
	},

	uploadFile: (file) => {
		const reader = new FileReader();
		return reader.readAsDataURL(file);
	},

	isValidNumber: num => isNumber(num),

	moment: moment.locale('zh-cn'),

	sendMailWithLink: ({ subject, mails, body }) => {
		let uri = 'mailto:?';
		uri += `subject=${encodeURIComponent(subject)}`;
		if (mails) {
			uri += `&bcc=${encodeURIComponent(mails.join(','))}`;
		}
		uri += `&body=${encodeURIComponent(body)}`;
		window.open(uri);
	},

	extractFileName: url => decodeURIComponent(url.split('/').pop()),

	forceDownload: (url, filename) => {
		const link = document.createElement('a');
		link.setAttribute('href', url);
		link.setAttribute('download', filename);
		link.setAttribute('target', '_blank');
		link.style.display = 'none';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	},
};

export function handleXlsxData(res, filename) {
	const content = res.data;
	return FileSaver.saveAs(content, filename);
}

// For things like: 原价
// 10% off = "9折", not "90折"
// 15% off = "85折"
// 20% off = "8折",
export function convertPercentage(num) {
	if (num <= 0) return '原价';
	const resNum = 100 - num;
	const result = `${resNum}折`;
	return result.replace('0', '');
}

export function getThumbnail(mimeType = '') {
	const ext = mime.extension(mimeType);
	if (ext === 'txt') {
		return 'https://image.ibb.co/mOqVXU/ic_text.png';
	} else if (ext === 'pdf') {
		return 'https://image.ibb.co/h1G4sU/ic_pdf.png';
	} else if (ext === "mp3" || ext === "mpga") {
		return mp3Icon;
	} else if (ext === "mp4") {
		return mp4Icon;
	} else if (ext === "ppt" || ext === "pptx") {
		return pptIcon;
	} else if (ext === "xls" || ext === "xlsx") {
		return xlsIcon;
	} else if (ext === 'doc' || ext === 'docx') {
		return docIcon;
	}

	return unknownIcon;
}

export function HEX2RGB(hex) {
	if (hex.charAt(0) === '#') {
		hex = hex.substr(1);
	}
	if ((hex.length < 2) || (hex.length > 6)) {
		return false;
	}
	const values = hex.split('');
	let r;
	let g;
	let b;
	if (hex.length === 2) {
		r = parseInt(values[0].toString() + values[1].toString(), 16);
		g = r;
		b = r;
	} else if (hex.length === 3) {
		r = parseInt(values[0].toString() + values[0].toString(), 16);
		g = parseInt(values[1].toString() + values[1].toString(), 16);
		b = parseInt(values[2].toString() + values[2].toString(), 16);
	} else if (hex.length === 6) {
		r = parseInt(values[0].toString() + values[1].toString(), 16);
		g = parseInt(values[2].toString() + values[3].toString(), 16);
		b = parseInt(values[4].toString() + values[5].toString(), 16);
	} else {
		return false;
	}
	return { r, g, b };
}

export function rgbToHex(r, g, b) {
	return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export function subString(string) {
	for (let i = 0; i < string.length; i++) {
		if (isNaN(parseInt(string[i]))) {
			return i;
		}
	}
	return -1;
}

export function truncateText(selector, maxLength) {
	if (!selector) return '';
	if (selector.length > maxLength) {
		selector = `${selector.substr(0, maxLength)}...`;
	}
	return selector;
}

export function getErrorMessage(error) {
	let message;
	if (error) {
		const response = error.response;
		if (response) {
			const responseData = response.data;
			if (responseData) {
				message = responseData.error_description || responseData.error || JSON.stringify(responseData);
			}
		}
		if (!message && (error instanceof Error || error.message)) {
			message = error.message;
		}
	}
	return message;
}

export function setComponentState(component, newState) {
	return new Promise(function (resolve) {
		component.setState(newState, resolve);
	});
}

export function getLowerCaseIteratee(attr) {
	return function (item) {
		let result = item;
		if (item != null) {
			let prop = item[attr];
			if (prop == null || prop === '') {
				result = '';
			} else {
				result = prop.toString().toLocaleLowerCase();
			}
		}
		return result;
	}
}

export function formatDecimal(number, place) {
	return number == null ? '' : number.toFixed(place);
}

export default CommonUtils;
