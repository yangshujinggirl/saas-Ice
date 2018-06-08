import React, { Component } from 'react';
import AddEdit from './components/AddEdit/index0';


import * as ContractActions from './actions/ContractAction.js'
import { PchConnect } from 'base';

export default PchConnect(AddEdit, ContractActions, 'ContractReducer');
