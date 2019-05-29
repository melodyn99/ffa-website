
import { api } from './_ApiFactoryWithHeader';

export const apiEventPptFile = {
  getEventPptFiles: eventId => api.get('event_preparation_files', { event_preparation: eventId, $expand: 'file/mime_type' }),

  createEventPptFile: params => api.post('event_preparation_files', params),

  deleteEventPptFile: eventFileId => api.delete(`event_preparation_files/${eventFileId}`),
};
