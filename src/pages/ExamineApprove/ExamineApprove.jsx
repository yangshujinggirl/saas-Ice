import React, { Component } from 'react';
import ExamineApproveComponent from './components/ExamineApproveComponent';

import * as ExamineApproveActions from './actions/ExamineApproveAction.js'
import { PchConnect } from 'base';

export default PchConnect(ExamineApproveComponent, ExamineApproveActions, 'ExamineApproveReducer');