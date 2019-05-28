import {
  ADD_STUDENT, GET_STUDENT, UPDATE_STUDENT_STATUS, UPDATE_CURRENT_STUDENT,
  IS_EDITTING_STUDENT, UPDATE_EDITABLE, VIEWING_CURRENT_STUDENT,GET_LIST_STUDENT_COMPANY,
} from '../Constant/ActionType';

const initialState = {
  currentStudent: null,
  currentStudentViewing: null,
  editable: false,
  listStudent: [],
  students: [
    {
      id: 0,
      name: 'Chan Tai Man',
      company: 'EHE 有限公司',
      brand: 'EHE',
      phone: [{ type: 'company', number: '1234 5678' }],
      email: 'chantaiman@email.com',
      wechat: '',
      district: '',
      address: '',
      courses: '',
      fee: 1000,
      discount: 70,
      feeHandIn: true,
      carpark: true,
      attended: true,
    },
    {
      id: 1,
      name: 'Sze Sze',
      company: 'EHE 有限公司',
      brand: 'EHE',
      phone: [{ type: 'home', number: '1234 5678' }],
      email: 'szesze@email.com',
      wechat: '',
      district: '',
      address: '',
      courses: '',
      fee: 1000,
      discount: 70,
      feeHandIn: false,
      carpark: true,
      attended: false,
    },
    {
      id: 2,
      name: 'Wong Ka Man',
      company: 'EHE 有限公司',
      brand: 'EHE',
      phone: [{ type: 'mobile', number: '1234 5678' }],
      email: 'wongkaman@email.com',
      wechat: '',
      district: '',
      address: '',
      courses: '',
      fee: 1000,
      discount: 70,
      feeHandIn: true,
      carpark: true,
      attended: true,
    },
  ],
  isEditting: false,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STUDENT:
      state.students.push({
        name: action.name,
        company: action.company,
        brand: action.brand,
        phone: action.phone,
        email: action.email,
        wechat: action.wechat,
        district: action.district,
        address: action.address,
        courses: action.courses,
        fee: '',
        discount: 70,
        feeHandIn: true,
        carpark: true,
        attended: true,
      });
      return state;
    case GET_STUDENT:
      return state;
    case UPDATE_STUDENT_STATUS:
      state.students[action.idx].feeHandIn = !state.students[action.idx].feeHandIn;
      return {
        ...state,
        students: state.students,
      };
    case UPDATE_CURRENT_STUDENT:
      return {
        ...state,
        currentStudent: action.student,
      };
    case UPDATE_EDITABLE:
      console.log('wwhats i: ', action)
      return {
        ...state,
        editable: action.editable,
      };
    case IS_EDITTING_STUDENT:
      return {
        ...state,
        isEditting: action.isEditting,
      };
    case VIEWING_CURRENT_STUDENT:
      return {
        ...state,
        currentStudentViewing: action.currentStudent,
      };
    case GET_LIST_STUDENT_COMPANY:
      return {
        ...state,
        listStudent: action.listStudent,
      };
    default:
      return state;
  }
};

export default studentReducer;
