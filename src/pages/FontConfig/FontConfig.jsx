import React, { Component } from 'react';
import FilterTable from './components/FilterTable';
import SearchTable from './components/SearchTable';
import AddFont from './components/AddFont';
import SetFont from './components/SetFont';



export default class FontConfig extends Component {
  static displayName = 'FontConfig';

  constructor(props) {
    super(props);
    this.state = {
      iscompont: '',
      Component: ''
    };
  }
  changeCpm(toggleCompont) { 
    this.state.iscompont = toggleCompont
    switch (this.state.iscompont) {
      case 'FilterTable':
        this.setState({
          Component:<FilterTable tts={this.changeCpm.bind(this)}/>
        })
        break;
      case 'SearchTable':
        this.setState({
          Component:<SearchTable tts={this.changeCpm.bind(this)}/>
        })
        break;
      case 'AddFont':
        this.setState({
          Component:<AddFont tts={this.changeCpm.bind(this)}/>
        })
        break;  
      case 'SetFont':
        this.setState({
          Component:<SetFont tts={this.changeCpm.bind(this)}/>
        })
      break;   
      default:
        break;
    }
  }
  componentWillMount() { 
    this.state.Component = <FilterTable toggleCompont={this.changeCpm.bind(this)}/>
  }
  render() {
    return (
      <div className="font-config-page">
        {this.state.Component}
      </div>
    );
  }
}
