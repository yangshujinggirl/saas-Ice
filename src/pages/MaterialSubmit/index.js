import MaterialSubmit from './MaterialSubmit'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as MaterialSubmitActions from './actions/MaterialSubmitAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.MaterialSubmitReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(MaterialSubmitActions, dispatch)
    }
}

let MaterialSubmitObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(MaterialSubmit);


export default {
	MaterialSubmit: MaterialSubmitObj,
}
