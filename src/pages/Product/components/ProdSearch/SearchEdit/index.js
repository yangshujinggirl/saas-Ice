import SearchEdit from './SearchEdit.jsx';
import * as ProductAction from '../../../actions/ProductAction.js'
import { PchConnect } from 'base';

export default PchConnect(SearchEdit, ProductAction, 'ProductReducer');