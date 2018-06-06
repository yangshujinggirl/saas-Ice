import React, { Component } from 'react';
import AuditList from './components/AuditList';


import * as ExamineApproveActions from './actions/ExamineApproveAction.js'
import { PchConnect } from 'base';

export default PchConnect(AuditList, ExamineApproveActions, 'ExamineApproveReducer');
