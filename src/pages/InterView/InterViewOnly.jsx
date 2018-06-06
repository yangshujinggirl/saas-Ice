import React, { Component } from 'react';
import InterViewOnly from './components/InterViewOnly';


import * as InterViewActions from './actions/InterViewAction.js'
import { PchConnect } from 'base';

export default PchConnect(InterViewOnly, InterViewActions, 'InterViewReducer');
