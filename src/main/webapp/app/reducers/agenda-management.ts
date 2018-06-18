import moment = require('moment');

export const ACTION_TYPES = {
  EVENT_CLICK: 'agendaManagement/EVENT_CLICK',
  CLOSE_EDITDIALOG: 'agendaManagement/CLOSE_EDITDIALOG',
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
  defaultView: 'month',
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month'),
  header,
  isNew: false,
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
    default:
      return state;
  }
};

export const eventClick = isNew => dispatch => {
  return dispatch({
                    type: ACTION_TYPES.EVENT_CLICK,
                    payload: isNew
                  })
};

export const changeDefaultView = newView => dispatch => {
  return dispatch({
                    type: ACTION_TYPES.CHANGE_DEFAULTVIEW,
                    payload: newView
                  });
};

export const closeEditDialog = () => dispatch => {
  return dispatch({type: ACTION_TYPES.CLOSE_EDITDIALOG});
};

export const changeDate = (startDate, endDate) => dispatch => {
  return dispatch({
                    type: ACTION_TYPES.CHANGE_DATE,
                    payload: {startDate, endDate}
  });
}
