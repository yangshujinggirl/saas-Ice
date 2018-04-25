import React, { Component } from 'react';
import FileList from './components/FileList/FileList'

export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  };

  componentDidMount(){
    console.log('productDetail componentDidMount')
    
  }

  render() {
    let {view, actions, formData} = this.props;
    
    return (
      <div className="product-page">
        <FileList {...this.props} />
      </div>
    );
  }
}
