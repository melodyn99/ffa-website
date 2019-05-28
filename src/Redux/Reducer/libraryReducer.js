import {
  ADD_LIBRARY, GET_LIBRARY, SET_OPENED_LIBRARY, VIEWING_LIBRARY, SET_FILES, VIEWING_MATERIAL,ADD_FOLDER,
} from '../Constant/ActionType';

const initialState = {
  library: {
    opened: '',
    details: [

    ],
  },
  viewingLibrary: {
    library: {},
  },
  files: [],
  viewingMaterial: {
    name: '',
  },
  classMaterial: [],
};

const libraryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIBRARY:
      state.library.details.push(
        { name: action.name, seminar: action.seminar, documents: [] },
      );
      return state;
    case GET_LIBRARY:
      return state;
    case SET_OPENED_LIBRARY:
      return {
        ...state,
        library: {
          ...state.library,
          opened: action.name,
        },
      };
    case VIEWING_LIBRARY:
      return {
        ...state,
        viewingLibrary: action.library,
      };
    case SET_FILES:
      return {
        ...state,
        files: action.files,
      };
    case VIEWING_MATERIAL:
      return {
        ...state,
        viewingMaterial: action.viewingMaterial,
      };
    case ADD_FOLDER:
      return {
        ...state,
        classMaterial: action.classMaterial,
      };
    default:
      return state;
  }
};

export default libraryReducer;
