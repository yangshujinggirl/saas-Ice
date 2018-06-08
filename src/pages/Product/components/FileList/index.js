import FileList from './FileList';
import * as ProductAction from '../../actions/ProductAction.js'
import { PchConnect } from 'base';

export default PchConnect(FileList, ProductAction, 'ProductReducer');