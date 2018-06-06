import React, { Component } from 'react';
import Detail from './components/Detail';


import * as ContractFileActions from './actions/ContractFileAction.js'
import { PchConnect } from 'base';

export default PchConnect(Detail, ContractFileActions, 'ContractFileReducer');