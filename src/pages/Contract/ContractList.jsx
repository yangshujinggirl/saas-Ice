import React, { Component } from 'react';
import List from './components/List';


import * as ContractActions from './actions/ContractAction.js'
import { PchConnect } from 'base';

export default PchConnect(List, ContractActions, 'ContractReducer');
