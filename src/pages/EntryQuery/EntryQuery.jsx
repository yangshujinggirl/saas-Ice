import React, { Component } from 'react';
import FilterTable from './components/EnterTable/FilterTable';
import LoanDetails from './components/LoanDetails';
export default class EntryQuery extends Component {
  static displayName = 'EntryQuery';

  constructor(props) {
    super(props);
    this.state = {};
  }
  getLoanCode = (data) => {
    this.state.code = data.code;
    console.log(this.state.code);
  }

  changeComponent = (toggleComponent) => {
    this.state.iscompont = toggleComponent
    switch (this.state.iscompont) {
      case 'FilterTable':
        this.setState({
          Component:<FilterTable {...this.props}/>
        })
        break;
      case 'LoanDetails':
        this.setState({
          Component:<LoanDetails {...this.props}/>
        })
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="entry-query-page">
        <FilterTable  {...this.props}/>
      </div>
    );
  }
}
