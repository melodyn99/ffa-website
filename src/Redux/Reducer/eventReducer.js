import * as EventActionTypes from '../Constant/ActionType';

// import * as DummyEvents from '../../data/event';

const initialState = {
    noteTitle: '新增记录',
    viewingNote: {},
    viewingEvent: {},
    events: [],
};

const eventReducer = (state = initialState, action) => {

    switch (action.type) {

        case EventActionTypes.SET_NOTE_TITLE: {
            return {
                ...state,
                noteTitle: action.noteTitle,
            }
        }

        case EventActionTypes.GET_EVENT: {
            return {
                ...state
            }
        }

        case EventActionTypes.ADD_EVENT: {
            return {
                ...state,
                events: action.event,
            }
        }

        case EventActionTypes.SET_VIEWING_EVENT: {
            return {
                ...state,
                viewingEvent: action.event,
            }
        }

        case EventActionTypes.VIEWING_NOTE: {
            return {
                ...state,
                viewingNote: action.note
            }
        }

        default:
            return state;
    }
};

export default eventReducer;
