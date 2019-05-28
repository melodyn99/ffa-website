import {
  GET_EVENT, ADD_EVENT,
  SET_VIEWING_EVENT,
  SET_NOTE_TITLE,VIEWING_NOTE,
} from '../Constant/ActionType';

const initialState = {
  noteTitle: '新增记录',
  viewingNote: {},
  viewingEvent: {},
  events: [
    [
      {
        name: '開课場地及場地確定',
        deadline: '10 days remaining',
        checked: false,
        documents: [
          { name: '开放时间及地点确定.pdf', size: '35KB', uploadDate: '6月20日' },
          { name: '预约酒店.jpg', size: '2.1MB', uploadDate: '6月18日' },
        ],
      },
      {
        name: '招生收費建群', deadline: '10 days remaining', checked: false, documents: [],
      },
      {
        name: '课件準備 物料採購及運輸', deadline: 'Done', checked: true, documents: [],
      },
      {
        name: '現場佈置及物料使用', deadline: '15 days remaining', checked: false, documents: [],
      },
      {
        name: '學員座位表', deadline: '5 days remaining', checked: false, documents: [],
      },
    ],
    [
      {
        name: '開课場地及場地確定', deadline: '10 days remaining', checked: true, documents: [],
      },
      {
        name: '招生收費建群', deadline: '10 days remaining', checked: true, documents: [],
      },
      {
        name: '课件準備 物料採購及運輸', deadline: 'Done', checked: false, documents: [],
      },
      {
        name: '現場佈置及物料使用', deadline: '15 days remaining', checked: false, documents: [],
      },
      {
        name: '學員座位表', deadline: '5 days remaining', checked: false, documents: [],
      },
    ],
    [
      {
        name: '開课場地及場地確定', deadline: '10 days remaining', checked: false, documents: [],
      },
      {
        name: '招生收費建群', deadline: '10 days remaining', checked: false, documents: [],
      },
      {
        name: '课件準備 物料採購及運輸', deadline: 'Done', checked: true, documents: [],
      },
      {
        name: '現場佈置及物料使用', deadline: '15 days remaining', checked: false, documents: [],
      },
      {
        name: '學員座位表', deadline: '5 days remaining', checked: true, documents: [],
      },
    ],
    [
      {
        name: '開课場地及場地確定', deadline: '10 days remaining', checked: true, documents: [],
      },
      {
        name: '招生收費建群', deadline: '10 days remaining', checked: false, documents: [],
      },
      {
        name: '课件準備 物料採購及運輸', deadline: 'Done', checked: false, documents: [],
      },
      {
        name: '現場佈置及物料使用', deadline: '15 days remaining', checked: true, documents: [],
      },
      {
        name: '學員座位表', deadline: '5 days remaining', checked: false, documents: [],
      },
    ],
  ],
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTE_TITLE:
      return {
        ...state,
        noteTitle: action.noteTitle,
      };
    case GET_EVENT:
      return state;
    case ADD_EVENT:
      return {
        ...state,
        events: action.event,
      };
    case SET_VIEWING_EVENT:
      return {
        ...state,
        viewingEvent: action.event,
      };
    case VIEWING_NOTE:
      return {
        ...state,
        viewingNote: action.note
      }
    default:
      return state;
  }
};

export default eventReducer;
