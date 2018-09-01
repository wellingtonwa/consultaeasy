import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';
import { messages } from '../config/constants';
import { FORMAT_EVENT_DATETIME } from '../modules/cadastro/agenda/agenda';
import moment from 'moment/src/moment';

export const ACTION_TYPES = {
  FETCH_COMPROMISSOS: 'listaCompromissoManagement/FETCH_COMPROMISSOS',
  FETCH_COMPROMISSO:  'listaCompromissoManagement/FETCH_COMPROMISSO',
  CREATE_COMPROMISSO: 'listaCompromissoManagement/CREATE_COMPROMISSO',
  UPDATE_COMPROMISSO: 'listaCompromissoManagement/UPDATE_COMPROMISSO',
  DELETE_COMPROMISSO: 'listaCompromissoManagement/DELETE_COMPROMISSO',
  SHOW_COMPROMISSO_DIALOG: 'listaCompromissoManagement/SHOW_COMPROMISSO_DIALOG',
  SET_IS_NEW: 'listaCompromissoManagement/SET_IS_NEW',
  CHANGE_DATE: 'listaCompromissoManagement/CHANGE_DATE'
};

const initialState = {
  data: new Date(),
  loading: false,
  errorMessage: null,
  compromissos: [],
  compromisso: {},
  updating: false,
  updateSuccess: false,
  isNew: false,
  showAddCompromissoDialog: false
};

export const apiUrl = '/api/compromisso/listView';

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPROMISSOS):
    case REQUEST(ACTION_TYPES.FETCH_COMPROMISSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_COMPROMISSO):
    case REQUEST(ACTION_TYPES.UPDATE_COMPROMISSO):
    case REQUEST(ACTION_TYPES.DELETE_COMPROMISSO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_COMPROMISSOS):
    case FAILURE(ACTION_TYPES.FETCH_COMPROMISSO):
    case FAILURE(ACTION_TYPES.CREATE_COMPROMISSO):
    case FAILURE(ACTION_TYPES.UPDATE_COMPROMISSO):
    case FAILURE(ACTION_TYPES.DELETE_COMPROMISSO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPROMISSOS):
      return {
        ...state,
        loading: false,
        compromissos: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPROMISSO):
      return {
        ...state,
        loading: false,
        compromisso: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_COMPROMISSO):
    case SUCCESS(ACTION_TYPES.UPDATE_COMPROMISSO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        compromisso: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_COMPROMISSO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        compromisso: {}
      };
    case ACTION_TYPES.CHANGE_DATE:
      return {
        ...state,
        data: action.payload.date
      };
    case ACTION_TYPES.SHOW_COMPROMISSO_DIALOG:
      return {
        ...state,
        showAddCompromissoDialog: action.payload.show
      };
    case ACTION_TYPES.SET_IS_NEW:
      return {
        ...state,
        isNew: action.payload.isNew
      };
    default:
      return state;
  }
};

// Actions
export const getCompromissos: ICrudGetAction = (page, size, sort, data) => {
  const auxData = moment(data).format(FORMAT_EVENT_DATETIME);
  return ({
    type: ACTION_TYPES.FETCH_COMPROMISSOS,
    payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}&data=${auxData}`)
  });
};

export const getCompromisso: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPROMISSO,
    payload: axios.get(requestUrl)
  };
};

export const createCompromisso: ICrudPutAction = compromisso => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPROMISSO,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.post(apiUrl, compromisso)
  });
  dispatch(getCompromissos());
  return result;
};
export const _createCompromisso: ICrudPutAction = compromisso => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.CREATE_COMPROMISSO,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.post(apiUrl, compromisso)
  });
  return result;
};

export const updateCompromisso: ICrudPutAction = compromisso => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPROMISSO,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.put(apiUrl, compromisso)
  });
  dispatch(getCompromissos());
  return result;
};

export const _updateCompromisso: ICrudPutAction = compromisso => dispatch => {
  const result = dispatch({
    type: ACTION_TYPES.UPDATE_COMPROMISSO,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.put(apiUrl, compromisso)
  });
  return result;
};

export const deleteCompromisso: ICrudDeleteAction = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_COMPROMISSO,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getCompromissos());
  return result;
};

export const _deleteCompromisso: ICrudDeleteAction = id => dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = dispatch({
    type: ACTION_TYPES.DELETE_COMPROMISSO,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const changeDate = date => dispatch => {
  return dispatch ({
    type: ACTION_TYPES.CHANGE_DATE,
    payload: { date }
  })
};

export const showCompromissoDialog = show => dispatch => {
  return dispatch ({
    type: ACTION_TYPES.SHOW_COMPROMISSO_DIALOG,
    payload: { show }
  })
};

export const setIsNew = isNew => dispatch => {
  return dispatch ({
    type: ACTION_TYPES.SET_IS_NEW,
    payload: { isNew }
  })
};
