import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';
import { messages } from '../config/constants';
import { request } from 'https';
import moment from 'moment/src/moment';

const FORMAT_EVENT_DATETIME = 'YYYY-MM-DD[T]HH:mm';

export const ACTION_TYPES = {
  FETCH_COMPROMISSOS: 'compromissoManagement/FETCH_COMPROMISSOS',
  FETCH_COMPROMISSOS_BY_DATA: 'compromissoManagement/FETCH_COMPROMISSOS_BY_DATA',
  FETCH_COMPROMISSO:  'compromissoManagement/FETCH_COMPROMISSO',
  CREATE_COMPROMISSO: 'compromissoManagement/CREATE_COMPROMISSO',
  UPDATE_COMPROMISSO: 'compromissoManagement/UPDATE_COMPROMISSO',
  DELETE_COMPROMISSO: 'compromissoManagement/DELETE_COMPROMISSO',
  ADD_COMPROMISSO: 'compromissoManagement/ADD_COMPROMISSO',
  SET_COMPROMISSO: 'compromissoManagement/SET_COMPROMISSO'
};

const initialState = {
  loading: false,
  errorMessage: null,
  compromissos: [],
  compromisso: {},
  updating: false,
  updateSuccess: false
};

export const apiUrl = '/api/compromisso';

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_COMPROMISSOS):
    case REQUEST(ACTION_TYPES.FETCH_COMPROMISSO):
    case REQUEST(ACTION_TYPES.FETCH_COMPROMISSOS_BY_DATA):
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
    case FAILURE(ACTION_TYPES.FETCH_COMPROMISSOS_BY_DATA):
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
    case SUCCESS(ACTION_TYPES.FETCH_COMPROMISSOS_BY_DATA):
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
    case ACTION_TYPES.ADD_COMPROMISSO:
      return {
        ...state,
        compromisso: { start: action.payload }
      };
    case ACTION_TYPES.SET_COMPROMISSO:
      return {
        ...state,
        compromisso: action.payload
      };
    default:
      return state;
  }
};

// Actions
export const getCompromissos: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_COMPROMISSOS,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getCompromisso: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_COMPROMISSO,
    payload: axios.get(requestUrl)
  };
};

export const createCompromisso: ICrudPutAction = (compromisso, data=null) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_COMPROMISSO,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.post(apiUrl, compromisso)
  });
  if (data) {
    dispatch(getCompromissosByData(null, null, null, data))
  } else {
    dispatch(getCompromissos());
  }
  return result;
};
export const _createCompromisso: ICrudPutAction = (compromisso) => dispatch => {
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

export const updateCompromisso: ICrudPutAction = (compromisso, data=null) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_COMPROMISSO,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.put(apiUrl, compromisso)
  });
  if (data) {
    dispatch(getCompromissosByData(null, null, null, data))
  } else {
    dispatch(getCompromissos());
  }
  return result;
};

export const _updateCompromisso: ICrudPutAction = (compromisso) => dispatch => {
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

export const addCompromisso = startDate => dispatch => {
  return dispatch({
    type: ACTION_TYPES.ADD_COMPROMISSO,
    payload: startDate
           });
};

export const setCompromisso = compromisso => dispatch => {
  return dispatch({
    type: ACTION_TYPES.SET_COMPROMISSO,
    payload: compromisso
           });
};

export const getCompromissosByData: ICrudGetAction = (page, size, sort, data) => {
  const auxData = moment(data).format(FORMAT_EVENT_DATETIME);
  return ({
    type: ACTION_TYPES.FETCH_COMPROMISSOS_BY_DATA,
    payload: axios.get(`${apiUrl}/listView?cacheBuster=${new Date().getTime()}&data=${auxData}`)
  });
};
