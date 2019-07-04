import { api } from './_ApiFactoryWithHeader';

import { apiGeneral } from './_General';

export const apiFile = {
    //   createFile: url => api.post('files', { url }),
    createFile: (body, token, cb, eCb) => {
        apiGeneral.apiPost('files', body, token, cb, eCb)
    },

    getConferenceStudentAttendanceXlsx: conference_id => api.getXlsxFile(`export_student_attendances?conference=${conference_id}&type=xlsx`),

    getItineraryXlsx: (option) => api.getXlsxFile('export_conference?type=xlsx', { responseType: 'blob', ...option }),

    getInvoiceXlsx: (option) => api.getXlsxFile('export_invoice?type=xlsx', { responseType: 'blob', ...option }),

    getConsultingHourXlsx: (option, params) => api.getXlsxFile(`export_consulting_hour?type=xlsx&${params}`, { responseType: 'blob', ...option }),

    getStudentXlsx: (option) => api.getXlsxFile('export_students?type=xlsx', { responseType: 'blob', ...option }),

};
