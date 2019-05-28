import {
  ADD_LIBRARY, GET_LIBRARY, SET_OPENED_LIBRARY, VIEWING_LIBRARY, SET_FILES, VIEWING_MATERIAL, ADD_FOLDER,
} from '../Constant/ActionType';

export const addLibrary = (name, seminar) => ({
  type: ADD_LIBRARY,
  name,
  seminar,
});

export const getLibrary = ({
  type: GET_LIBRARY,
});

export const setOpenedLibrary = name => ({
  type: SET_OPENED_LIBRARY,
  name,
});

export const viewingLibrary = library => ({
  type: VIEWING_LIBRARY,
  library,
});
export const viewingMaterial = (viewingMaterial) => {
  console.log(viewingMaterial);
  return ({
    type: VIEWING_MATERIAL,
    viewingMaterial,
  });
};
export const addFolder = (classMaterial) => {
  console.log(classMaterial);
  return ({
    type: ADD_FOLDER,
    classMaterial,
  });
};
