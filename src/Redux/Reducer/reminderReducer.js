import {
  GET_REMINDER, DISMISS_REMINDER, DISMISS_ALL_REMINDER,GET_REMINDER_COUNT
} from '../Constant/ActionType';

const initialState = {
  count : 0,
  reminders: [
    {
      name: 'Seminar A Name', event: '開课計劃及場地確定', date: '6月20日', countdown: '10 days remaining',
    },
    {
      name: 'Training B Name', event: '招生收費建群', date: '6月15日', countdown: '5 days remaining',
    },
    {
      name: 'Training B Name', event: '開课計劃及場地確定', date: '6月10日', countdown: '5 days remaining',
    },
  ],
};

const reminderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REMINDER:
      return state;
    case GET_REMINDER_COUNT:
      return {...state, count: action.count};
    case DISMISS_REMINDER:
      return {
        ...state,
        reminders: state.reminders.filter((item, index) => index !== action.index),
      };
    case DISMISS_ALL_REMINDER:
      return {
        ...state,
        reminders: [],
      };
    default:
      return state;
  }
};

export default reminderReducer;
