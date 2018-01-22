import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';
import { messages } from '../config/constants';

export const ACTION_TYPES = {
  FETCH_PACIENTES: 'pacienteManagement/FETCH_PACIENTES',
  FETCH_PACIENTE:  'pacienteManagement/FETCH_PACIENTE',
  CREATE_PACIENTE: 'pacienteManagement/CREATE_PACIENTE',
  UPDATE_PACIENTE: 'pacienteManagement/UPDATE_PACIENTE',
  DELETE_PACIENTE: 'pacienteManagement/DELETE_PACIENTE'
};

const initialState = {
  loading: false,
  errorMessage: null,
  pacientes: [],
  paciente: {},
  updating: false,
  updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PACIENTES):
    case REQUEST(ACTION_TYPES.FETCH_PACIENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PACIENTE):
    case REQUEST(ACTION_TYPES.UPDATE_PACIENTE):
    case REQUEST(ACTION_TYPES.DELETE_PACIENTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PACIENTES):
    case FAILURE(ACTION_TYPES.FETCH_PACIENTE):
    case FAILURE(ACTION_TYPES.CREATE_PACIENTE):
    case FAILURE(ACTION_TYPES.UPDATE_PACIENTE):
    case FAILURE(ACTION_TYPES.DELETE_PACIENTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTES):
      return {
        ...state,
        loading: false,
        pacientes: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PACIENTE):
      return {
        ...state,
        loading: false,
        paciente: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PACIENTE):
    case SUCCESS(ACTION_TYPES.UPDATE_PACIENTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        paciente: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PACIENTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        paciente: {}
      };
    default:
      return state;
  }
};

const apiUrl = '/api/paciente';
// Actions
export const getPacientes: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PACIENTES,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getPaciente: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PACIENTE,
    payload: axios.get(requestUrl)
  };
};

export const createPaciente: ICrudPutAction = paciente => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PACIENTE,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.post(apiUrl, paciente)
  });
  dispatch(getPacientes());
  return result;
};

export const updatePaciente: ICrudPutAction = paciente => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PACIENTE,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.put(apiUrl, paciente)
  });
  dispatch(getPacientes());
  return result;
};

export const deletePaciente: ICrudDeleteAction = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PACIENTE,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getPacientes());
  return result;
};
