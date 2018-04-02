import Product from './Product'
// import ProductForm from './ProductForm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ProductActions from './actions/ProductAction.js'
import ProductSearch from './ProdSearch'
import SearchEdit from './components/ProdSearch/SearchEdit'
import ProductDetail from './components/ProdSearch/ProdDetail'
import ProductAdd from './ProdAdd'
import AddOne from './components/ProdAdd/addOne'
import AddTwo from './components/ProdAdd/addTwo'
import FileList from './components/FileList'
import Fileedit from './components/FileList/Dialog'
const mapStateToProps = (state, ownProps) => {
    const data = state.ProductReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(ProductActions, dispatch)
    }
}

let ProductObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);

//查询
let productSearch = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductSearch);
//查询-编辑
let searchEdit = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchEdit);

//查询-查看
let productDetail = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductDetail);

//增加
let productAdd = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductAdd);

//AddOne
let addOne = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddOne);

//AddTwo
let addTwo = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTwo);

//资料清单
let fileList = connect(
    mapStateToProps,
    mapDispatchToProps
)(FileList);

let fileedit = connect(
    mapStateToProps,
    mapDispatchToProps
)(Fileedit);

export default {
    Product: ProductObj,
    ProductSearch: productSearch,
    ProductAdd: productAdd,
    FileList: fileList,
	SearchEdit: searchEdit,
    ProductDetail: productDetail,
    AddOne:addOne,
    AddTwo:addTwo,
    FileEdit:fileedit,
}