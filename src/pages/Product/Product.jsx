import React, { Component } from 'react';
import ProdSearch from './components/ProdSearch';
import ProdAdd from './components/ProdAdd';
import FileList from './components/FileList'
// import SearchDetail from './components/SearchDetail';
// import './Prodsearch.scss'

export default class Product extends Component {
  static displayName = 'Product';

  constructor(props) {
    super(props);
    this.state = {};
  };
  componentDidMount() {
    console.log(this.props)
  };

  render() {
    let {view, actions, formData} = this.props;
    let children;
    
    switch(view){
      case 'search':{
        children = <ProdSearch data={formData} onSubmit={actions.save.bind(this)} />
        break;
      }
      default: {
        children = <ProdAdd {...this.props} />
        break;
      }
    }
    return (
      <div className="product-page">
        {children}
        {/* { this.props.routes[1].path == 'search' ?<ProdSearch {...this.props}/> : (this.props.routes[1].path == 'add' ? <ProdAdd data={formData} />:<FileList />)} */}
      </div>
    );
  }
}
