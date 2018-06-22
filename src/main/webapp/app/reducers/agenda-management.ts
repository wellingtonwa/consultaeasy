import moment = require('moment');

export const ACTION_TYPES = {
  CLOSE_EDITDIALOG: 'agendaManagement/CLOSE_EDITDIALOG',
  OPEN_DELETEDIALOG: 'agendaManagement/OPEN_DELETEDIALOG',
  CLOSE_DELETEDIALOG: 'agendaManagement/CLOSE_DELETEDIALOG',
  CLOSE_DELETE: 'agendaManagement/CLICK_DELETE',
  EVENT_CLICK: 'agendaManagement/EVENT_CLICK',
  CHANGE_DEFAULTVIEW: 'agendaManagement/CHANGE_DEFAULTVIEW',
  ADD_COMPROMISSO: 'agendaManagement/ADD_COMPROMISSO',
  CHANGE_DATE: 'agendaManagement/CHANGE_DATE'
};

const header = {
  left: 'prev,next today',
  center: 'title',
  right: 'month,agendaWeek,agendaDay'
};

const initialState = {
  showEditDialog: false,
  showDeleteDialog: false,
  defaultView: 'month',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
  header,
  isNew: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.EVENT_CLICK:
      return{
        ...state,
        showEditDialog: true,
        isNew: action.payload
      };
    case ACTION_TYPES.CLOSE_EDITDIALOG:
      return {
        ...state,
        showEditDialog: false
      };
    case ACTION_TYPES.CHANGE_DEFAULTVIEW:
      return {
        ...state,
        defaultView: action.payload
      };
    case ACTION_TYPES.CHANGE_DATE:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate
      };
    case ACTION_TYPES.OPEN_DELETEDIALOG:
      return {
        ...state,
        showDeleteDialog: true
      };
    case ACTION_TYPES.CLOSE_DELETEDIALOG:
      return {
        ...state,
        showDeleteDialog: false
      };
    default:
      return state;
  }
};

export const eventClick = isNew => dispatch => {
  return dispatch({
                    type: ACTION_TYPES.EVENT_CLICK,
                    payload: isNew
                  });
};

export const changeDefaultView = newView => dispatch => {
  return dispatch({
                    type: ACTION_TYPES.CHANGE_DEFAULTVIEW,
                    payload: newView
                  });
};

export const closeEditDialog = () => dispatch => {
  return dispatch({ type: ACTION_TYPES.CLOSE_EDITDIALOG });
};

export const changeDate = (startDate, endDate) => dispatch => {
  return dispatch({
                    type: ACTION_TYPES.CHANGE_DATE,
                    payload: { startDate, endDate }
  });
};

export const openDeleteDialog = () => dispatch => {
  return dispatch({ type: ACTION_TYPES.OPEN_DELETEDIALOG });
};

export const closeDeleteDialog = () => dispatch => {
  return dispatch({ type: ACTION_TYPES.CLOSE_DELETEDIALOG });
};
