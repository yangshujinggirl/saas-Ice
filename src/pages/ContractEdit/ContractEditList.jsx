import React, { Component } from 'react';
import List from './components/List';

import * as ContractEditActions from './actions/ContractEditAction.js'
import { PchConnect } from 'base';

export default PchConnect(List, ContractEditActions, 'ContractEditReducer');

