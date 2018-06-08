import React, { Component } from 'react';
import InterView from './components/InterView';

import * as InterViewActions from './actions/InterViewAction.js'
import { PchConnect } from 'base';

export default PchConnect(InterView, InterViewActions, 'InterViewReducer');
