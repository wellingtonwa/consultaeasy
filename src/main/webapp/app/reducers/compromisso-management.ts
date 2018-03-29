import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';
import { messages } from '../config/constants';
import { request } from 'https';

export const ACTION_TYPES = {
  FETCH_COMPROMISSOS: 'compromissoManagement/FETCH_COMPROMISSOS',
  FETCH_COMPROMISSO:  'compromissoManagement/FETCH_COMPROMISSO',
  CREATE_COMPROMISSO: 'compromissoManagement/CREATE_COMPROMISSO',
  UPDATE_COMPROMISSO: 'compromissoManagement/UPDATE_COMPROMISSO',
  DELETE_COMPROMISSO: 'compromissoManagement/DELETE_COMPROMISSO'
};

const initialState = {
  loading: false,
  errorMessage: null,
  compromissos: [],
  compromisso: {},
  updating: false,
  updateSuccess: false
};

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
    default:
      return state;
  }
};

const apiUrl = '/api/compromisso';
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
