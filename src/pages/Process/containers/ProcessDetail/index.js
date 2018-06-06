import ProcessDetail from './ProcessDetail';
import ProcessActions from '../../actions/ProcessAction_.js'
import { PchConnect } from 'base';

export default PchConnect(ProcessDetail, ProcessActions, 'ProcessReducer');