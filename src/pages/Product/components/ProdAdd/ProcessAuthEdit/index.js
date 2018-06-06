import ProcessAuthEdit from './ProcessAuthEdit';

import * as ProductAction from '../../../actions/ProductAction.js'
import { PchConnect } from 'base';

export default PchConnect(ProcessAuthEdit, ProductAction, 'ProductReducer');