import ProdDetail from './ProdDetail';

import * as ProductAction from '../../../actions/ProductAction.js'
import { PchConnect } from 'base';

export default PchConnect(ProdDetail, ProductAction, 'ProductReducer');