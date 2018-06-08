import DownLoad from './components/DownLoad';

import * as ContractFileActions from './actions/ContractFileAction.js'
import { PchConnect } from 'base';

export default PchConnect(DownLoad, ContractFileActions, 'ContractFileReducer');
