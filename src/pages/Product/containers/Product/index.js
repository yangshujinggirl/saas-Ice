import Product from './Product';
import * as ProductAction from '../../actions/ProductAction.js'
import { PchConnect } from 'base';

export default PchConnect(Product, ProductAction, 'ProductReducer');