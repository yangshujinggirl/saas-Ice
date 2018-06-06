import AddOne from './addOne';
import * as ProductAction from '../../../actions/ProductAction.js'
import { PchConnect } from 'base';

export default PchConnect(AddOne, ProductAction, 'ProductReducer');
