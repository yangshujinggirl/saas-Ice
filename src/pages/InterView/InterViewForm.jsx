import React, { Component } from 'react';
import InterViewForm from './components/InterViewForm';


import * as InterViewActions from './actions/InterViewAction.js'
import { PchConnect } from 'base';

export default PchConnect(InterViewForm, InterViewActions, 'InterViewReducer');
