import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale from './locale';
import layout from './layout';
import authentication from './authentication';
import administration from './administration';
import userManagement from './user-management';
import pacienteManagement from './paciente-management';
import marcadorManagement from './marcador-management';
import contatoManagement from './contato-management';
import compromissoManagement from './compromisso-management';
import agendaManagement from './agenda-management';
import listaCompromissoManagement from './lista-compromisso-management';

export default combineReducers({
  authentication,
  locale,
  layout,
  administration,
  userManagement,
  loadingBar,
  pacienteManagement,
  marcadorManagement,
  contatoManagement,
  compromissoManagement,
  agendaManagement,
  listaCompromissoManagement
});
