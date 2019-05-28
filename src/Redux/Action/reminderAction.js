import {
  GET_REMINDER, DISMISS_REMINDER, DISMISS_ALL_REMINDER,GET_REMINDER_COUNT
} from '../Constant/ActionType';

export const getReminder = ({
  type: GET_REMINDER,
});

export const dismissReminder = index => ({
  type: DISMISS_REMINDER,
  index,
});

export const dismissAllReminder = ({
  type: DISMISS_ALL_REMINDER,
});
export const getReminderCount = count => ({
  type: GET_REMINDER_COUNT,
  count
});
