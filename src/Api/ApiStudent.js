// import { sortBy } from 'lodash-es';
import { api } from './_ApiFactoryWithHeader';
// import { getLowerCaseIteratee } from '../Util/CommonUtils';

import { apiGeneral } from './_General';

export const apiStudent = {

    postStudent: data => api.post('students', data),

    getStudent: () => api.get('students?$expand=contacts'),

    editStudent: (studentId, params) => api.post(`students/${studentId}?$expand=contacts`, params),

    // OLD
    // getConferenceStudent: (conferenceId) => {
    //     const url = `conference_students?conference=${encodeURIComponent(conferenceId)}&$expand=student,students/contacts,student/business_license_copy`;
    //     return api.get(url).then(conferenceStudent => {
    //         const nameIteratee = getLowerCaseIteratee('name');
    //         return sortBy(conferenceStudent, getLowerCaseIteratee('brand')).map(conferenceStudent => {
    //             const students = conferenceStudent.students;
    //             if (students && students.length > 0) {
    //                 conferenceStudent.students = sortBy(students, nameIteratee);
    //             }
    //             return conferenceStudent;
    //         })
    //     })
    // },

    getConferenceStudentAccMgt: (params) => api.get(`conference_students`, { ...params }),

    postConferenceStudent: params => api.post('conference_students', params),

    getAttendance: params => api.get('attendance?$select=attendance_id', params),

    postAttendance: body => api.post('attendance', body),

    deleteAttendance: attendanceId => api.delete(`attendance/${encodeURIComponent(attendanceId)}`),

    editConferenceStudent: (conferenceStudentId, params) => api.put(`conference_students/${conferenceStudentId}`, { ...params, $expand: 'student' }),

    getStudentByCompany: companyId => api.get(`students?company=${companyId}&$expand=contacts`),

    getStudentByCompanyCustom: (params, cancelToken) => api.get('students', params, null, cancelToken),

    getCurrnetStudentByCompany: params => api.get('students', params),

    deleteStudent: id => api.delete(`students/${id}`),

    deleteAllStudent: companyId => api.delete(`students?company=${companyId}`),

    getCurentStudent: (id, params) => api.get(`students/${id}/`, { ...params, '$expand': ['contacts', 'company'] }),

    getCurentConferenceStudent: conferenceId => api.get(`conference_students/${conferenceId}?$expand=student,students/contacts,student/business_license_copy`),

    importStudentByCSV: (companyId, csvFile) => api.post(`import_students?company=${companyId}`, csvFile),

    deleteConferenceStudent: studentId => api.delete(`conference_students/${studentId}`),

    getStudentAttendance: (conference_student, conference_section) => api.get(`attendance?conference_student=${conference_student}&conference_section=${conference_section}`),

    // new
    getConferenceStudent: (conferenceId, params, token, cb, eCb) => {
        apiGeneral.apiFetch(`conference_students?conference=${encodeURIComponent(conferenceId)}&$expand=student,students/contacts,student/business_license_copy`, params, token, cb, eCb)
    },

    createConferenceStudent: (body, token, cb, eCb) => {
        apiGeneral.apiPost('student_schools', body, token, cb, eCb)
    },

};
