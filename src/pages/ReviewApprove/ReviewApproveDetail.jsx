import React, { Component } from 'react';
import ReviewApproveDetail from './components/ReviewApproveDetail';

import * as ReviewApproveAction from './actions/ReviewApproveAction.js'
import { PchConnect } from 'base';

export default PchConnect(ReviewApproveDetail, ReviewApproveAction, 'ReviewApproveReducer');
