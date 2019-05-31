// import { sortBy } from 'lodash-es';
import { api } from './_ApiFactoryWithHeader';
// import { getLowerCaseIteratee } from '../Util/CommonUtils';

import { apiGeneral } from './_General';

export const apiSeatingPlan = {
  seatingPlanType: () => api.get('seating_plan_types'),

  createSeatingPlanType: params => api.post('seating_plan_types', { ...params }),

  editSeatingPlanType: (seatingPlanTypeId, params) => api.post(`seating_plan_types/${seatingPlanTypeId}`, { ...params }),

  deleteSeatingPlanType: (seatingPlanTypeId) => api.delete(`seating_plan_types/${seatingPlanTypeId}`),

  // seatingPlanDetail: eventPptId => {
  //   const url = `seating_plan_details?event_preparation=${encodeURIComponent(eventPptId)}`;
  //   return api.get(url).then(plan => {
  //     plan.brands = sortBy(plan.brands, getLowerCaseIteratee('brand'));
  //     plan.seating_plan = sortBy(plan.seating_plan, 'sequence', getLowerCaseIteratee('seat'));
  //     return plan;
  //   });
  // },
  seatingPlanDetail: (eventPptId, params, token, cb, eCb) => {
    apiGeneral.apiFetch(`seating_plan_details?event_preparation=${encodeURIComponent(eventPptId)}`, params, token, cb, eCb)
  },

  editSeatingPlan: (seatingPlanId, params) => api.post(`seating_plans/${seatingPlanId}`, params),

  createSeatingPlan: params => api.post('seating_plans', params),

  resetSeatingPlan: eventPptId => api.delete(`seating_plans/?event_preparation=${eventPptId}`),

  deleteSeatingPlanById: seatingPlanId => api.delete(`seating_plans/${seatingPlanId}`),
};
