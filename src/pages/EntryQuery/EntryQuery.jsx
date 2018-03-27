import React, { Component } from 'react';
import FilterTable from './components/EnterTable/FilterTable';
import LoanDetails from './components/LoanDetails';
export default class EntryQuery extends Component {
  static displayName = 'EntryQuery';

  constructor(props) {
    super(props);
    this.state = {
      iscompont: '',
      Component: '',
      code:''
    };
  }
  componentWillMount() {
    this.state.Component = <FilterTable toggleComponent={this.changeComponent} code={this.getLoanCode}/>
    // this.state.Component = <LoanDetails toggleComponent={this.changeComponent}
    //                                     code={this.state.code}/>
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
          Component:<FilterTable
                      toggleComponent={this.changeComponent}
                      code={this.getLoanCode}
                    />
        })
        break;
      case 'LoanDetails':
        this.setState({
          Component:<LoanDetails
                      toggleComponent={this.changeComponent}
                      code={this.state.code}
                    />
        })
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="entry-query-page">
        {this.state.Component}
      </div>
    );
  }
}
