import React, { Component } from 'react';
import FilterTable from './components/FilterTable';
import CreateActivityForm from './components/CreateActivityForm';

export default class Demo extends Component {
  static displayName = 'Demo';

  constructor(props) {
    super(props);
    
  }

  componentDidMount(){
  }

  render() {
    let {view, actions, formData} = this.props;
    let children;
    
    switch(view){
      case 'form':{
        children = <CreateActivityForm data={formData} onSubmit={actions.save.bind(this)} />
        break;
      }
      default: {
        children = <FilterTable {...this.props} />
        break;
      }
    }

    return (
      <div className="demo-page">
        {children}
      </div>
    );
  }
}
