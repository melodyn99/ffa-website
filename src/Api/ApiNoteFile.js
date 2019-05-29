import { api } from './_ApiFactoryWithHeader';

export const apiNoteFile = {
  getNoteFile: () => api.get('note_files?$expand=file/mime_type'),

  getNoteFileForNote: noteId => api.get(`note_files?note=${noteId}&$expand=file/mime_type`),

  createNoteFile: data => api.post('note_files', data),

  deleteNoteFile: noteFileId => api.delete('note_files', { note_file_id: noteFileId }),
};
