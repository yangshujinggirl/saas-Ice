import React, { Component } from 'react';
import ProdSearchList from './components/ProdSearch/ProdSeachList';


export default class Product extends Component {

  constructor(props) {
    super(props);
  };
  render() {
    return (
      <div className="product-page">
        <ProdSearchList {...this.props} />
      </div>
    );
  }
}
