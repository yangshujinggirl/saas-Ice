import AddThree from './addThree';

import * as ProductAction from '../../../actions/ProductAction.js'
import { PchConnect } from 'base';

export default PchConnect(AddThree, ProductAction, 'ProductReducer');