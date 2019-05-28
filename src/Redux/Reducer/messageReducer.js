import {
  ADD_MESSAGE, GET_MESSAGE,
} from '../Constant/ActionType';

const initialState = {
  messages: [
    {
      owner: 0, timestamp: 1535140125, text: '火車訂票', type: 'text',
    },
    {
      owner: 1, timestamp: 1535140125, text: '請問酒店怎麼樣?', type: 'text',
    },
    {
      owner: 1, timestamp: 1535140125, image: null, type: 'image',
    },
  ],
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      state.messages.push({ owner: 0, text: action.text });
      return state;
    case GET_MESSAGE:
      return state;
    default:
      return state;
  }
};

export default messageReducer;
