// auth
const GET_TOKEN = 'GET_TOKEN';
const VERIFY_TOKEN = 'VERIFY_TOKEN';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const LOGOUT = 'LOGOUT';
// start from here
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
const GET_USER_INFO = 'GET_USER_INFO';

// subject
const GET_SIMPLE_SUBJECT = 'GET_SIMPLE_SUBJECT';

// account
const SET_VIEWING_ACCOUNT = 'SET_VIEWING_ACCOUNT';
const SET_ACCOUNTS = 'SET_ACCOUNTS';
const HAS_EDIT_BUTTON_ACCOUNT = 'HAS_EDIT_BUTTON_ACCOUNT';
const UPDATE_NEW_USER = 'UPDATE_NEW_USER';
const UPDATE_USER_TAB = 'UPDATE_USER_TAB';
const SET_TYPE_VIEW_SEMINAR_USER = 'SET_TYPE_VIEW_SEMINAR_USER';

// company
const IS_EDITTING_COMPANY = 'IS_EDITTING_COMPANY';
const SET_VIEWING_COMPANY = 'SET_VIEWING_COMPANY';
const HAS_EDIT_BUTTON_COMPANY = 'HAS_EDIT_BUTTON_COMPANY';
const IS_STUDENT_ACCOUNT_TAB = 'IS_STUDENT_ACCOUNT_TAB';
const SET_COMPANIES_ACCOUNTMGT = 'SET_COMPANIES_ACCOUNTMGT';
const SET_TAB_COMPANY = 'SET_TAB_COMPANY';
const SET_COMPANY_SORT_TYPE = 'SET_COMPANY_SORT_TYPE';

//library
const ADD_LIBRARY = 'ADD_LIBRARY';
const GET_LIBRARY = 'GET_LIBRARY';
const SET_OPENED_LIBRARY = 'SET_OPENED_LIBRARY';
const VIEWING_LIBRARY = 'VIEWING_LIBRARY';
const SET_FILES = 'SET_FILES';
const VIEWING_MATERIAL = 'VIEWING_MATERIAL';
const ADD_FOLDER = 'ADD_FOLDER';

//message
const ADD_MESSAGE = 'ADD_MESSAGE';
const GET_MESSAGE = 'GET_MESSAGE';

//profile
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const IS_EDITTING_USER = 'IS_EDITTING_USER';

//reminder
const GET_REMINDER = 'GET_REMINDER';
const GET_REMINDER_COUNT = 'GET_REMINDER_COUNT'
const DISMISS_REMINDER = 'DISMISS_REMINDER';
const DISMISS_ALL_REMINDER = 'DISMISS_ALL_REMINDER';

//seatingPlan
// Add room seating plan for given dimensions.
const ADD_SEATING_PLAN = 'ADD_SEATING_PLAN';
const ISEDIT_SEATING_PLAN = 'ISEDIT_SEATING_PLAN';
const VIEWING_SEATING_PLAN_TYPE = 'VIEWING_SEATING_PLAN_TYPE';
const PLAN_TYPE_SELECTED = 'PLAN_TYPE_SELECTED';
const EDIT_ENABLE = 'EDIT_ENABLE';
const SET_PLAN = 'SET_PLAN';
const SET_EDIT_PLAN_TYPE = 'SET_EDIT_PLAN_TYPE';
const SET_EDIT = 'SET_EDIT';

//seatMap
const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_COLOR = 'UPDATE_COLOR';
const UPDATE_EMPTY = 'UPDATE_EMPTY';
const RESET_SEATS = 'RESET_SEATS';
const SET_SEATS = 'SET_SEATS';

//seminar
const LOAD_SEMINAR = 'LOAD_SEMINAR';
const SET_VIEWING_SEMINAR = 'SET_VIEWING_SEMINAR';
const SET_EDIT_ONSITE_TIME = 'SET_EDIT_ONSITE_TIME';
const ADD_SEMINAR = 'ADD_SEMINAR';
const GET_SEMINAR = 'GET_SEMINAR';
const CHANGE_TAB = 'CHANGE_TAB';
const UPDATE_CLASS_MATERIAL = 'UPDATE_CLASS_MATERIAL';
const UPDATE_LIBRARY_DOCUMENTS = 'UPDATE_LIBRARY_DOCUMENTS';
const IS_EDITTING_SEMINAR = 'IS_EDITTING_SEMINAR';
const CONFIRM_EDIT_SEMINAR = 'CONFIRM_EDIT_SEMINAR';
const UPDATE_SEMINAR_EDITABLE = 'UPDATE_SEMINAR_EDITABLE';

//studentContainer
const GET_STUDENT_CONTAINER = 'GET_STUDENT_CONTAINER';
const UPDATE_SEAT_NO = 'UPDATE_SEAT_NO';
const UPDATE_DRAGGABLE = 'UPDATE_DRAGGABLE';
const UPDATE_COMPANY_COLOR = 'UPDATE_COMPANY_COLOR';
const RESET_STUDENT_CONTAINER = 'RESET_STUDENT_CONTAINER';
const SET_STUDENT_CONTAINER = 'SET_STUDENT_CONTAINER';

//student
const ADD_STUDENT = 'ADD_STUDENT';
const GET_STUDENT = 'GET_STUDENT';
const UPDATE_STUDENT_STATUS = 'UPDATE_STUDENT_STATUS';
const UPDATE_CURRENT_STUDENT = 'UPDATE_CURRENT_STUDENT';
const UPDATE_EDITABLE = 'UPDATE_EDITABLE';
const IS_EDITTING_STUDENT = 'IS_EDITTING_STUDENT';
const VIEWING_CURRENT_STUDENT = 'VIEWING_CURRENT_STUDENT';
const GET_LIST_STUDENT_COMPANY = 'GET_LIST_STUDENT_COMPANY';

//viewContent
const UPDATE_CURRENT_SEMINAR = 'UPDATE_CURRENT_SEMINAR';
const UPDATE_CURRENT_LIBRARY = 'UPDATE_CURRENT_LIBRARY';
const UPDATE_CURRENT_EVENT = 'UPDATE_CURRENT_EVENT';
const UPDATE_LIBRARY_CHECK = 'UPDATE_LIBRARY_CHECK';
const UPDATE_DOCUMENT_CHECK = 'UPDATE_DOCUMENT_CHECK';
const UPDATE_TEACHER_TAB = 'UPDATE_TEACHER_TAB';

//event
const SET_NOTE_TITLE = 'SET_NOTE_TITLE';
const GET_EVENT = 'GET_EVENT';
const ADD_EVENT = 'ADD_EVENT';
const SET_VIEWING_EVENT = 'SET_VIEWING_EVENT';
const VIEWING_NOTE = 'VIEWING_NOTE';

const EDIT_STATE = {
    NEW: "new",
    EDIT: "edit",
    EDITING: "editing",
};
export {
    // auth
    GET_TOKEN, VERIFY_TOKEN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REFRESH_TOKEN_SUCCESS, GET_USER_INFO,

    // subject
    GET_SIMPLE_SUBJECT,

    // account
    SET_VIEWING_ACCOUNT, SET_ACCOUNTS, HAS_EDIT_BUTTON_ACCOUNT,
    UPDATE_NEW_USER, UPDATE_USER_TAB, SET_TYPE_VIEW_SEMINAR_USER,

    // company
    IS_EDITTING_COMPANY, SET_VIEWING_COMPANY, HAS_EDIT_BUTTON_COMPANY,
    IS_STUDENT_ACCOUNT_TAB, SET_COMPANIES_ACCOUNTMGT, SET_TAB_COMPANY,
    SET_COMPANY_SORT_TYPE,

    //library
    ADD_LIBRARY, GET_LIBRARY, SET_OPENED_LIBRARY, VIEWING_LIBRARY, SET_FILES,
    VIEWING_MATERIAL, ADD_FOLDER,

    //message
    ADD_MESSAGE, GET_MESSAGE,

    //profile
    SET_USER_PROFILE, IS_EDITTING_USER,

    //reminder
    GET_REMINDER, GET_REMINDER_COUNT, DISMISS_REMINDER, DISMISS_ALL_REMINDER,

    //seatingPlan
    ADD_SEATING_PLAN, ISEDIT_SEATING_PLAN, VIEWING_SEATING_PLAN_TYPE, PLAN_TYPE_SELECTED,
    EDIT_ENABLE, SET_PLAN, SET_EDIT_PLAN_TYPE, SET_EDIT,

    //seatMap
    UPDATE_NAME, UPDATE_COLOR, UPDATE_EMPTY, RESET_SEATS, SET_SEATS,

    //seminar
    LOAD_SEMINAR, SET_VIEWING_SEMINAR, SET_EDIT_ONSITE_TIME, ADD_SEMINAR, GET_SEMINAR,
    CHANGE_TAB, UPDATE_CLASS_MATERIAL, UPDATE_LIBRARY_DOCUMENTS, IS_EDITTING_SEMINAR,
    CONFIRM_EDIT_SEMINAR, UPDATE_SEMINAR_EDITABLE,

    //studentContainer
    GET_STUDENT_CONTAINER, UPDATE_SEAT_NO, UPDATE_DRAGGABLE, UPDATE_COMPANY_COLOR,
    RESET_STUDENT_CONTAINER, SET_STUDENT_CONTAINER,

    //student
    ADD_STUDENT, GET_STUDENT, UPDATE_STUDENT_STATUS, UPDATE_CURRENT_STUDENT, UPDATE_EDITABLE,
    IS_EDITTING_STUDENT, VIEWING_CURRENT_STUDENT, GET_LIST_STUDENT_COMPANY,

    //viewContent
    UPDATE_CURRENT_SEMINAR, UPDATE_CURRENT_LIBRARY, UPDATE_CURRENT_EVENT, UPDATE_LIBRARY_CHECK,
    UPDATE_DOCUMENT_CHECK, UPDATE_TEACHER_TAB,

    //event
    SET_NOTE_TITLE, GET_EVENT, ADD_EVENT, SET_VIEWING_EVENT, VIEWING_NOTE,

    //unknown
    EDIT_STATE,
};
