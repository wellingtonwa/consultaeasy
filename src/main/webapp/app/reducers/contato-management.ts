import axios from 'axios';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';
import { messages } from '../config/constants';
import { request } from 'https';

export const ACTION_TYPES = {
  FETCH_CONTATO:  'pacienteManagement/FETCH_CONTATO',
  FETCH_CONTATOS:  'pacienteManagement/FETCH_CONTATOS',
  CREATE_CONTATO: 'pacienteManagement/CREATE_CONTATO',
  UPDATE_CONTATO: 'pacienteManagement/UPDATE_CONTATO',
  DELETE_CONTATO: 'pacienteManagement/DELETE_CONTATO'
};

const initialState = {
  loading: false,
  errorMessage: null,
  contatos: [],
  contato: {},
  updating: false,
  updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONTATOS):
    case REQUEST(ACTION_TYPES.FETCH_CONTATO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTATO):
    case REQUEST(ACTION_TYPES.UPDATE_CONTATO):
    case REQUEST(ACTION_TYPES.DELETE_CONTATO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CONTATOS):
    case FAILURE(ACTION_TYPES.FETCH_CONTATO):
    case FAILURE(ACTION_TYPES.CREATE_CONTATO):
    case FAILURE(ACTION_TYPES.UPDATE_CONTATO):
    case FAILURE(ACTION_TYPES.DELETE_CONTATO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTATOS):
      return {
        ...state,
        loading: false,
        contatos: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTATO):
      return {
        ...state,
        loading: false,
        contato: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTATO):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTATO):
      return {
        ...state,
        updating: false,
        paciente: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTATO):
      return {
        ...state,
        updating: false,
        paciente: {}
      };
    default:
      return state;
  }
};
const apiUrl = '/api/contato';
// Actions
export const getContatos: ICrudGetAction = idPaciente => ({
  type: ACTION_TYPES.FETCH_CONTATOS,
  payload: axios.get(`${apiUrl}/paciente/${idPaciente}`)
});

export const getContato: ICrudGetAction = idContato => {
  const requestUrl = `${apiUrl}/${idContato}`;
  return {
    type: ACTION_TYPES.FETCH_CONTATO,
    payload: axios.get(requestUrl)
  };
};

export const createContato: ICrudPutAction = (idPaciente, contato) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTATO,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.post(`${apiUrl}/${idPaciente}`, contato)
  });
  dispatch(getContatos(result.value.data.idPaciente));
  return result;
};
export const updateContato: ICrudPutAction = (idContato, contato) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTATO,
    meta: {
      successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.put(`${apiUrl}/${idContato}`, contato)
  });
  dispatch(getContatos());
  return result;
};

export const deleteContato: ICrudDeleteAction = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTATO,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
  dispatch(getContatos());
  return result;
};
