// AKA Api Seminars.
import { api } from './_ApiFactoryWithHeader';
// import { sortBy } from 'lodash-es';


// Api
import { apiGeneral } from './_General';

const CONTRACT_TYPE_TERM_ID = '87b8750b-525c-4f73-9509-2b7e3fa6590b';

export const apiConferences = {

    // getConferenceFullList: (params, token, cb, eCb) => {
    //     apiGeneral.apiFetch('conference_list', params, token, cb, eCb)
    // },

    getConferenceFullListHaveSort: params => api.get('conference_list', params),

    getSeminarList: (sortType, params, cancelToken) => {
        let orderByStr = "";
        orderByStr = sortType === 'teacher_names' ? '$orderby=status desc&$orderby=teacher_names&$orderby=start_date' : sortType === 'start_date' ? '$orderby=status desc&$orderby=start_date' : sortType === 'createddate' ? "$orderby=status desc&$orderby=createddate desc" : `$orderby=status desc&$orderby=${sortType}`
        const url = 'conference_list?' + orderByStr;
        return api.get(url, params, null, cancelToken);
    },

    // getConferenceDefail: conferenceId => {
    //     const url = `conferences/${encodeURIComponent(conferenceId)}?$expand=conference_officers/user,conference_sections/teachers,conference_sections/time_managements,contracts/contract_teachers,contracts/company,contracts/contract_file,contracts/contract_incomes`;
    //     return api.get(url).then(response => {
    //         const conferenceSections = response.conference_sections;
    //         if (conferenceSections && conferenceSections.length > 1) {
    //             response.conference_sections = sortBy(conferenceSections, 'sequence');
    //         }
    //         return response;
    //     });
    // },
    getConferenceDefail: (conferenceId, params, token, cb, eCb) => {
        apiGeneral.apiFetch(`conferences/${encodeURIComponent(conferenceId)}`, params, token, cb, eCb)
    },

    // createConference: data => api.post('create_conference', data),

    // editConference: (conferenceId, data) => api.post(`conferences/${conferenceId}?$expand=conference_sections/teachers,conference_sections/time_managements,contracts/contract_teachers,contracts/contract_file,contracts/contract_incomes`, data),

    getTimeManagerment: params => api.get('time_managements', params),

    getConferenceSection: conferenceId => api.get(`conference_sections?conference=${conferenceId}&$orderby=sequence&$expand=teachers`),

    getConferenceSectionList: conferenceId => api.get(`conference_sections?conference=${conferenceId}&$expand=teachers/user&$orderby=start_date asc`),

    teacherCheckIn: (instructorId, params) => api.put(`instructors/${instructorId}`, { checked_in: true, ...params }),

    teacherChangeLocation: (instructorId, params) => api.put(`instructors/${instructorId}`, { ...params }),

    updateTimeManager: (conferenceId, data) => api.post(`time_managements/?conference=${conferenceId}`, data),

    updateTimeManagementNews: (timeManagementId, data) => api.post(`time_management_news/${timeManagementId == null ? '' : encodeURIComponent(timeManagementId)}`, data),

    getConferenceByUser: username => api.get(`conferences?$select=conference_id&$groupby=conference_id&conference_sections/teachers/user=${username}`),

    getConferenceListById: (listId) => {
        if (listId) {
            return api.get(`conference_list/?conference_id[in]=${listId}&$orderby=start_date desc`);
        }
        return api.get('conference_list/?$orderby=start_date desc');
    },

    getUsersConference: conferenceId => api.get('user_seminar', { conference: conferenceId }),

    getConferenceByCompanyId: companyId => api.get(`conference_list/?company=${companyId}&$orderby=teacher_names&$orderby=status desc&$orderby=start_date`),

    createCompaniesForConference: params => api.post('conference_companies', params),

    getCompaniesForConference: params => api.get('conference_companies', params),

    deleteConferenceCompany: (company, conference) => api.delete(`conference_companies/?company=${company}&conference=${conference}`),

    getConferenceStudent: (conferenceId, studentId) => api.get(`conference_students?conference_company/conference=${conferenceId}&conference_student_id=${studentId}`),

    getConferenceStudentForQrCode: (conferenceId, studentId) => api.get(`conference_students?conference_company/conference=${encodeURIComponent(conferenceId)}&conference_student_id=${encodeURIComponent(studentId)}&$expand=student&$select=student/name`),

    // deleteConference: conferenceId => api.delete(`conferences/${conferenceId}`),

    sendQrCodeToStudent: conferenceId => api.post(`qr_code_emails/${conferenceId}/send`),

    sendQrCodeToIndividualStudent: (conferenceId, studentId) => api.post(`qr_code_emails/${conferenceId}/send?student_id=${studentId}`),

    getSectionTimeManagement: (conferenceId, sequence) => api.get(`section_time_management/${conferenceId}/${sequence}`),

    getConferenceRelateUser: async (user_id) => {
        const tea = await api.get(`conferences?$select=conference_id&$groupby=conference_id&conference_sections/teachers/user=${user_id}`);
        const off = await api.get(`conferences?$select=conference_id&$groupby=conference_id&conference_officers/user=${user_id}`);
        return tea.concat(off)
    },

    getListConferenceCompanyId: (conference) => api.get(`conference_companies?conference=${conference}&$select=conference_company_id`),

    deleteAllStudent: (listCompany) => api.delete(`conference_students?conference_company[in]=${listCompany}`),

    getEventPptForParameterPage: () => api.get('terms?label[in]=event_ppt_open_seminar,event_ppt&$expand=vocabularies'),

    editEventPptVocabulary: (term_id, data) => api.post(`terms/${term_id}`, data),

    getContractTypes: () => api.get(`vocabularies?term=${CONTRACT_TYPE_TERM_ID}&$orderby=createddate`),

    createContractType: name => api.post('vocabularies', { text_value: name, term: CONTRACT_TYPE_TERM_ID }),


    /* All Course start */
    getConferenceList: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('conference_list', params, token, cb, eCb)
    },

    createConference: (body, token, cb, eCb) => {
        apiGeneral.apiPost('create_conference', body, token, cb, eCb)
    },

    editConference: (conferenceId, body, token, cb, eCb) => {
        apiGeneral.apiPost(`conferences/${conferenceId}`, body, token, cb, eCb)
    },

    // deleteConference: (conferenceId, token, cb, eCb) => {
    //     apiGeneral.apiDelete('conferences', conferenceId, token, cb, eCb)
    // },
    /* All Course end */

    /* Course Information start */
    getConferenceDefailByUser: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('conferences', params, token, cb, eCb)
    },
    /* Course Information end */

    /* Course preparation start */
    getConferencePreparations: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('event_preparations', params, token, cb, eCb)
    },
    /* Course preparation end */

    /* Course material start */
    getConferenceMaterial: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('class_materials', params, token, cb, eCb)
    },
    createConferenceMaterial: (params, token, cb, eCb) => {
        apiGeneral.apiPost('class_materials', params, token, cb, eCb)
    },
    deleteConferenceMaterial: (id, token, cb, eCb) => {
        apiGeneral.apiDelete('class_materials', id, token, cb, eCb)
    },

    getConferenceMaterialFile: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('class_material_files', params, token, cb, eCb)
    },
    createConferenceMaterialFile: (body, token, cb, eCb) => {
        apiGeneral.apiPost('class_material_files', body, token, cb, eCb)
    },
    deleteConferenceMaterialFile: (id, token, cb, eCb) => {
        apiGeneral.apiDelete('class_material_files', id, token, cb, eCb)
    },
    /* Course material end */

    /* Course work start */
    getConferenceAssignmentList: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('conference_assignment_list', params, token, cb, eCb)
    },

    deleteConferenceAssignmentList: (id, token, cb, eCb) => {
        apiGeneral.apiDelete('conference_assignment_list', id, token, cb, eCb)
    },
    /* Course work end */

    /* Course student-management start */
    getSubmittedStudentEnrollmentsByConferenceId: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('conference_enrollment_list', params, token, cb, eCb)
    },
    getSubmittedAttendaceRecordsByConferenceEnrollmentId: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('attendance', params, token, cb, eCb)
    },
    /* Course student-management end */

    /* Course announcement start */
    getConferenceMessages: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('messages', params, token, cb, eCb)
    },
    /* Course announcement end */

    /* Course q-and-a start */
    getConferenceQandA: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('qa_list', params, token, cb, eCb)
    },
    // getOneConferenceQandA: (params, token, cb, eCb) => {
    //     apiGeneral.apiFetch('messages', params, token, cb, eCb)
    // },
    insertOneConferenceQandA: (body, token, cb, eCb) => {
        apiGeneral.apiPost('messages', body, token, cb, eCb) // correct
    },
    /* Course q-and-a end */

    /* Course note start */
    /* Course note end */

    /* Course assessment start */
    getConferenceAssessment: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('conference_assignment_list', params, token, cb, eCb)
    },
    createConferenceAssessment: (params, token, cb, eCb) => {
        apiGeneral.apiPost('assignments', params, token, cb, eCb)
    },
    deleteConferenceAssessment: (id, token, cb, eCb) => {
        apiGeneral.apiDelete('assignments', id, token, cb, eCb)
    },

    getConferenceAssessmentQuestion: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('assignment_questions', params, token, cb, eCb)
    },
    createConferenceAssessmentQuestion: (body, token, cb, eCb) => {
        apiGeneral.apiPost('assignment_questions', body, token, cb, eCb)
    },
    deleteConferenceAssessmentQuestion: (id, token, cb, eCb) => {
        apiGeneral.apiDelete('assignment_questions', id, token, cb, eCb)
    },

    /* Course assessment end */




    /* Course material && assessment start */
    getLibraries: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('libraries', params, token, cb, eCb)
    },
    getLibrariesList: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('library_list', params, token, cb, eCb)
    },
    /* Course material && assessment end */
};
