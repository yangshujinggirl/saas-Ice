import React, { Component } from 'react';
import ProdSearchList from './components/ProdSearch/ProdSeachList';
import ProductDetail from './components/ProdSearch/ProdDetail';


export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount(){
    console.log('productDetail componentDidMount')
    this.props.actions.getDetail();
  }

  render() {
    let {view, actions, formData,pageData} = this.props;
    
    return (
      <div className="product-page">
        {/* <ProdSearchList {...this.props} /> */}
        <ProductDetail {...this.props} />
      </div>
    );
  }
}
