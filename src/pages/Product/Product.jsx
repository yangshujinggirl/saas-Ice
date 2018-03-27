import React, { Component } from 'react';
import ProdSearchList from './components/ProdSearch/ProdSeachList'
export default class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  };
  componentDidMount() {
    console.log(this.props)
  };

  render() {
    let {view, actions, formData} = this.props;
    return (
      <div className="product-page">
        <ProdSearchList {...this.props} />
      </div>
    );
    // let children;
    // //path path = 'add' view = 'form'
    
    // let path =  this.props.routes[1].path;
    // console.log(this.props.routes)
    // if(path=='search'|| ''){
    //   view = 'list'
    // }else if(path=='add'){
    //   view = 'from'
    // }else if(path=='searchdetail'){
    //   view = 'searchdetail'
    // }
    
    // switch(view){
    
    //   case 'from':{
    //     children = <ProdAdd {...this.props} />
    //     break;
    //   };
    //   case 'searchdetail1':{
    //     children = <ProdDetail {...this.props} />
    //     break;
    //   }
    //   default: ;
    // }
    
  }
}
