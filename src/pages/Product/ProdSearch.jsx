import React, { Component } from 'react';
import ProdSearchList from './components/ProdSearch/ProdSeachList';


export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount(){
    console.log('productDetail componentDidMount')
    // 123
    // this.props.actions.search('https://www.easy-mock.com/mock/5a1629ea8eb5f73bfafa4f4f/lxapi/test');
  }

  render() {
    let {view, actions, formData,pageData} = this.props;
    
    return (
      <div className="product-page">
        <ProdSearchList {...this.props} />
      </div>
    );
  }
}
