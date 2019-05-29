import { api } from './_ApiFactoryWithHeader';

import { apiGeneral } from './_General';

export const apiNoteFile = {
  getNoteFile: () => api.get('note_files?$expand=file/mime_type'),

  // getNoteFileForNote: noteId => api.get(`note_files?note=${noteId}&$expand=file/mime_type`),
  getNoteFileForNote: (noteId, params, token, cb, eCb) => {
    apiGeneral.apiFetch(`note_files?note=${noteId}&$expand=file/mime_type`, params, token, cb, eCb)
  },

  createNoteFile: data => api.post('note_files', data),

  deleteNoteFile: noteFileId => api.delete('note_files', { note_file_id: noteFileId }),
};
