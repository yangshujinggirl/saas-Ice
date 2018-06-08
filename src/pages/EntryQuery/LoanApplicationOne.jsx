import React, { Component } from 'react';
import LoanApplication from './components/LoanApplicationOne';


import * as EntryQueryActions from './actions/EntryQueryAction.js'
import { PchConnect } from 'base';

export default PchConnect(LoanApplication, EntryQueryActions, 'EntryQueryReducer');

// export default class LoanApplicationOne extends Component {
//   static displayName = 'LoanApplicationOne';

//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <div className="entry-query-page">
//         <LoanApplication  {...this.props}/>
//       </div>
//     );
//   }
// }
