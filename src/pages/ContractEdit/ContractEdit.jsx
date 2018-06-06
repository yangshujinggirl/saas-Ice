import React, { Component } from 'react';
import Edit from './components/Edit';


import * as ContractEditActions from './actions/ContractEditAction.js'
import { PchConnect } from 'base';

export default PchConnect(Edit, ContractEditActions, 'ContractEditReducer');
