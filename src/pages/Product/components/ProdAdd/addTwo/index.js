import AddTwo from './addTwo';
import * as ProductAction from '../../../actions/ProductAction.js'
import { PchConnect } from 'base';

export default PchConnect(AddTwo, ProductAction, 'ProductReducer');
