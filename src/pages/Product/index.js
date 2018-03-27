import Product from './Product'
// import ProductDetail from './ProductDetail'
// import ProductSearch from './ProdSearch'
// import ProductAdd from './ProdAdd'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ProductActions from './actions/ProductAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.ProductReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(ProductActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);

// let productDetail = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ProductDetail);

// //查询
// let productSearch = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ProductSearch);

// //增加
// let productAdd = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(ProductAdd);


// export default {
//     Product: product,
//     // ProductDetail: productDetail,
//     // ProductSearch:productSearch,
//     // ProductAdd:productAdd
// }