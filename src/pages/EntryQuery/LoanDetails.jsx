import React, { Component } from 'react';
import LoanDetails from './components/LoanDetails';

import * as EntryQueryActions from './actions/EntryQueryAction.js'
import { PchConnect } from 'base';

export default PchConnect(LoanDetails, EntryQueryActions, 'EntryQueryReducer');

// export default class EntryQuery extends Component {
//   static displayName = 'EntryQuery';

//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <div className="entry-query-page">
//         <LoanDetails  {...this.props}/>
//       </div>
//     );
//   }
// }
