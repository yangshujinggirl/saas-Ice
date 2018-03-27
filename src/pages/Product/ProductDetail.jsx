import React, { Component } from 'react';
import ProdDetail from './components/ProdSearch/ProdDetail'

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount(){
    console.log('productDetail componentDidMount')
    this.props.actions.getDetail(1);
  }

  render() {
    let {view, actions, formData} = this.props;
    
    return (
      <div className="product-page">
        <ProdDetail {...this.props} />
      </div>
    );
  }
}
