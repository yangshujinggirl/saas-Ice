import React, { Component } from 'react';
import FilterTable from './components/EnterTable/FilterTable';

import * as EntryQueryActions from './actions/EntryQueryAction.js'
import { PchConnect } from 'base';

export default PchConnect(FilterTable, EntryQueryActions, 'EntryQueryReducer');

// export default class EntryQuery extends Component {
//   static displayName = 'EntryQuery';

//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <div className="entry-query-page">
//         <FilterTable  {...this.props}/>
//       </div>
//     );
//   }
// }
