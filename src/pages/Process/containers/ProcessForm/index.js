import ProcessForm from './ProcessForm';
import ProcessActions from '../../actions/ProcessAction_.js'
import { PchConnect } from 'base';

export default PchConnect(ProcessForm, ProcessActions, 'ProcessReducer');