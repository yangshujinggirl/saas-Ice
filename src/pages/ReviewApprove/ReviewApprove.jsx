import React, { Component } from 'react';
import ReviewApprove from './components/ReviewApprove';

import * as ReviewApproveAction from './actions/ReviewApproveAction.js'
import { PchConnect } from 'base';

export default PchConnect(ReviewApprove, ReviewApproveAction, 'ReviewApproveReducer');
