import React, { Component } from 'react';
import ProdSearchList from './components/ProdSearch/ProdSeachList';


export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {};
   
  };

  componentWillMount (){
    // this.props.actions.search();
  }
  componentDidMount(){
    console.log('productDetail componentDidMount')
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
