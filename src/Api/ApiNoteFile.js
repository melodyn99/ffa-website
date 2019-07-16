// import { api } from './_ApiFactoryWithHeader';

import { apiGeneral } from './_General';

export const apiNoteFile = {
    // getNoteFile: () => api.get('note_files?$expand=file/mime_type'),
    getNoteFile: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('note_files', params, token, cb, eCb)
    },

    // getNoteFile: noteId => api.get(`note_files?note=${noteId}&$expand=file/mime_type`),

    // createNoteFile: data => api.post('note_files', data),
    createNoteFile: (body, token, cb, eCb) => {
        apiGeneral.apiPost('note_files', body, token, cb, eCb)
    },

    // deleteNoteFile: noteFileId => api.delete('note_files', { note_file_id: noteFileId }),
    deleteNoteFile: (id, token, cb, eCb) => {
        apiGeneral.apiDelete('note_files', id, token, cb, eCb)
    },

};
