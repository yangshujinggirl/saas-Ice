import Dialog from './Dialog';

import * as ProductAction from '../../../actions/ProductAction.js'
import { PchConnect } from 'base';

export default PchConnect(Dialog, ProductAction, 'ProductReducer');