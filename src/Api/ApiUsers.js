import { api } from './_ApiFactoryWithHeader';

export const apiUsers = {
  getUserList: (params, cancelToken) => api.get('user_list', params, null, cancelToken),

  getUserDetail: email => api.get(`users/${email}/?$expand=profile_image,contacts,user_conference_records/conference`),

  getTeacherContract: email => api.get(`users/${email}/?$expand=teacher_contract,contacts,user_conference_records`),

  getTeacherContractNew: (user, year, month) => api.get('teacher_contract_list', {
    user,
    year,
    month,
  }),

  getMonthlyTutoringDays: (user, year, month) => api.get('monthly_tutoring_days', {
    user,
    year,
    month,
  }),

  editMonthlyTutoringDays: (data) => {
    const id = data.monthly_tutoring_day_id;
    let endpoint = 'monthly_tutoring_days';
    if (id != null) {
      endpoint += '/' + encodeURIComponent(id);
    }
    return api.post(endpoint, data);
  },

  getTeacherInfo: email => api.get(`users/${email}/?$expand=teacher_contract,contacts`),

  updateTeacherContract: (email, params) => api.post(`users/${email}/?$expand=teacher_contract`, { ...params }),

  editUserDetail: (username, params) => api.post(`users/${username}/?$expand=contacts`, { ...params }),

  editTeacherContract: (username, params) => api.post(`users/${username}/?$expand=teacher_contract`, { ...params }),

  updateUserAvatar: (username, fileId) => api.put(`users/${username}?$expand=profile_image`, { profile_image: fileId }),

  addUser: params => api.post('users', params),

  resetPassword: (username, data, token) => api.putWithCustomToken(`users/${username}/reset_password`, { ...data }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),

  forgetPassword: (username, token) => api.getWithCustomToken(`users/${username}/forget_password`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),

  deleteUser: username => api.delete(`users/${username}`),
};
