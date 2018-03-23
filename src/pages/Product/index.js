import Product from './Product'
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