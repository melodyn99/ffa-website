// AKA Event CoursePreparations.
import { api } from './_ApiFactoryWithHeader';

import { apiGeneral } from './_General';

export const apiEventPpt = {

    // getEventPptList: conferenceId => api.get('event_preparations', { conference: conferenceId, $expand: 'conference', $orderby: 'createddate desc' }),
    getEventPptList: (params, token, cb, eCb) => {
        apiGeneral.apiFetch('event_preparations', params, token, cb, eCb);
    },

    editEventPpt: (eventId, params) => api.put(`event_preparations/${eventId}/?$expand=conference`, params),

    createEventPpt: params => api.post('event_preparations', params),

    deleteEventPpt: id => api.delete(`event_preparations/${id}`),

    getEventPpt: eventId => api.get('event_preparations', { event_preparation_id: eventId, $expand: 'event_preparation_files/file/mime_type,conference/conference_sections' }),
};
