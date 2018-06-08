import ProcessConfig from './ProcessConfig';
import ProcessActions from '../../actions/ProcessAction_.js'
import { PchConnect } from 'base';

export default PchConnect(ProcessConfig, ProcessActions, 'ProcessReducer');