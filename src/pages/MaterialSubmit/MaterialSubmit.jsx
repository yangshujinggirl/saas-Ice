import React, { Component } from 'react';
import Submit from './components/MaterialSubmit';

import * as MaterialSubmitActions from './actions/MaterialSubmitAction.js'
import { PchConnect } from 'base';

export default PchConnect(Submit, MaterialSubmitActions, 'MaterialSubmitReducer');