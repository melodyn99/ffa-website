import { api } from './_ApiFactoryWithHeader';

export const apiFile = {
  createFile: url => api.post('files', { url }),

  getConferenceStudentsAttendanceXlsx: conference_id => api.getXlsxFile(`export_student_attendances?conference=${conference_id}&type=xlsx`),

  getItineraryXlsx: (option) => api.getXlsxFile('export_conference?type=xlsx',{responseType: 'blob',...option}),

  getInvoiceXlsx: (option) => api.getXlsxFile('export_invoice?type=xlsx',{responseType: 'blob',...option}),

  getConsultingHourXlsx: (option,params) => api.getXlsxFile(`export_consulting_hour?type=xlsx&${params}`,{responseType: 'blob',...option}),

  getStudentsXlsx: (option) => api.getXlsxFile('export_students?type=xlsx',{responseType: 'blob',...option}),

};
