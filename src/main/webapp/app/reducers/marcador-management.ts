import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';
import { messages } from '../config/constants';
import { request } from 'https';

export const ACTION_TYPES = {
  FETCH_MARCADORES: 'marcadorManagement/FETCH_MARCADORES',
  FETCH_MARCADOR:  'marcadorManagement/FETCH_MARCADOR',
  CREATE_MARCADOR: 'marcadorManagement/CREATE_MARCADOR',
  UPDATE_MARCADOR: 'marcadorManagement/UPDATE_MARCADOR',
  DELETE_MARCADOR: 'marcadorManagement/DELETE_MARCADOR'
};

const initialState = {
  loading: false,
  errorMessage: null,
  marcadores: [],
  marcador: {},
  updating: false,
  updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MARCADORES):
    case REQUEST(ACTION_TYPES.FETCH_MARCADOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MARCADOR):
    case REQUEST(ACTION_TYPES.UPDATE_MARCADOR):
    case REQUEST(ACTION_TYPES.DELETE_MARCADOR):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MARCADORES):
    case FAILURE(ACTION_TYPES.FETCH_MARCADOR):
    case FAILURE(ACTION_TYPES.CREATE_MARCADOR):
    case FAILURE(ACTION_TYPES.UPDATE_MARCADOR):
    case FAILURE(ACTION_TYPES.DELETE_MARCADOR):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MARCADORES):
      return {
        ...state,
        loading: false,
        marcadores: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MARCADOR):
      return {
        ...state,
        loading: false,
        marcador: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MARCADOR):
    case SUCCESS(ACTION_TYPES.UPDATE_MARCADOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        marcador: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MARCADOR):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        marcador: {}
      };
    default:
      return state;
  }
};

const apiUrl = '/api/marcador';
// Actions
export const getMarcadores: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MARCADORES,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getPaciente: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MARCADOR,
    payload: axios.get(requestUrl)
  };
};

export const createMarcador: ICrudPutAction = marcador => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MARCADOR,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.post(apiUrl, marcador)
  });
  dispatch(getMarcadores());
  return result;
};

export const updateMarcador: ICrudPutAction = marcador => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MARCADOR,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.put(apiUrl, marcador)
  });
  dispatch(getMarcadores());
  return result;
};

export const deleteMarcador: ICrudDeleteAction = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MARCADOR,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getMarcadores());
  return result;
};
