import Process from './Process';
import ProcessActions from '../../actions/ProcessAction_.js'
import { PchConnect } from 'base';

export default PchConnect(Process, ProcessActions, 'ProcessReducer');
