import React, { Component } from 'react';
import List from './components/List';


import * as ContractFileActions from './actions/ContractFileAction.js'
import { PchConnect } from 'base';

export default PchConnect(List, ContractFileActions, 'ContractFileReducer');