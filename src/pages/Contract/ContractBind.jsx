import React, { Component } from 'react';
import Bind from './components/Bind';


import * as ContractActions from './actions/ContractAction.js'
import { PchConnect } from 'base';

export default PchConnect(Bind, ContractActions, 'ContractReducer');
