import {
  GET_SEMINAR,
  LOAD_SEMINAR,
  ADD_SEMINAR,
  SET_VIEWING_SEMINAR,
  CHANGE_TAB,
  UPDATE_CLASS_MATERIAL,
  UPDATE_LIBRARY_DOCUMENTS,
  IS_EDITTING_SEMINAR,
  CONFIRM_EDIT_SEMINAR,
  SET_EDIT_ONSITE_TIME
} from '../Constant/ActionType';

const initialState = {
  currentTab: 0,
  viewingSeminar: {
  userSeminar: [],
  },
  seminars: [
    {
      name: 'aaa',
      seminarType: 'Seminar',
      officer: ['Testing', 'Testing 2'],
      details: [
        {
          dateStart: new Date('Sun Jun 10 2018 14:00:00 GMT+0800'),
          dateEnd: new Date('Sun Jun 10 2018 16:00:00 GMT+0800'),
          teacher: ['Chan Li Li'],
          location: '北京',
        },
      ],
      countdown: 10,
      materials: [],
    },
  ],
  isEditting: false,
  confirmEdit: false,
  isEditOnsiteTime: false
};

const seminarReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEMINAR:
      return state;
    case LOAD_SEMINAR:
      return state.concat(action.seminars);
    case ADD_SEMINAR:
      state.seminars.push(action.seminar);
      return state;
    case SET_VIEWING_SEMINAR:
      return {
        ...state,
        viewingSeminar: action.seminar,
      };
    case CHANGE_TAB:
      console.log('action.tabValue: ', action.tabValue)
      return {
        ...state,
        currentTab: action.tabValue,
      };
    case UPDATE_CLASS_MATERIAL:
      return {
        ...state,
        seminars: state.seminars.map((seminar, i) => (i === action.currentSeminar
          ? {
            ...seminar,
            materials: seminar.materials.concat(action.classMaterial),
          } : seminar)),
      };
    case UPDATE_LIBRARY_DOCUMENTS:
      return {
        ...state,
        seminars: state.seminars.map((seminar, i) => (i === action.currentSeminar
          ? {
            ...seminar,
            materials: seminar.materials.map((material, index) => (index === action.currentLibrary
              ? {
                ...material,
                documents: material.documents.concat(action.documents),
              } : material)),
          } : seminar)),
      };

    case IS_EDITTING_SEMINAR:
      return {
        ...state,
        isEditting: !state.isEditting,
      };
    case CONFIRM_EDIT_SEMINAR:
      return {
        ...state,
        confirmEdit: action.confirmEdit,
      };
    case SET_EDIT_ONSITE_TIME:
      return {
        ...state,
        isEditOnsiteTime: action.isEdit,
      };
    default:
      return state;
  }
};

export default seminarReducer;
