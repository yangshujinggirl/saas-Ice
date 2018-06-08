import React, { Component } from 'react';
import Detail from './components/Detail';


import * as ContractActions from './actions/ContractAction.js'
import { PchConnect } from 'base';

export default PchConnect(Detail, ContractActions, 'ContractReducer');
