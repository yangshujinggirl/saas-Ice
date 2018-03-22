import React, { Component } from 'react';
import ProdSearch from './components/ProdSearch';
import ProdAdd from './components/ProdAdd';
// import './Prodsearch.scss'

export default class Product extends Component {
  static displayName = 'Product';

  constructor(props) {
    super(props);
    this.state = {};
  };
  componentDidMount() {
    console.log(this.props.params.id);
    console.log(this.props.routes);

  };

  render() {
    return (
      <div className="product-page">
        { this.props.params.id == 1 ? <ProdSearch /> : <ProdAdd /> }
        


      </div>
    );
  }
}
