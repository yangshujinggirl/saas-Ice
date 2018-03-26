import React, { Component } from 'react';
import FilterTable from './components/FilterTable';
import CreateActivityForm from './components/CreateActivityForm';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    let {actions, formData} = this.props;

    // let view = this.props.route.path;
    // let children;
    // switch(view){
    //   case 'edit/:id':
    //   case 'detail/:id':{
    //     children = <CreateActivityForm data={formData} onSubmit={actions.save.bind(this)} />
    //     break;
    //   }
    //   default: {
    //     children = <FilterTable {...this.props} />
    //     break;
    //   }
    // }

    // if(this.props.children){
    //   children = this.props.children;
    // }

    return (
      <div className="demo-page">
        <FilterTable {...this.props} />
      </div>
    );
  }
}
