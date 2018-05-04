import ContractEdit from './ContractEdit'
import ContractEditList from './ContractEditList'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContractEditActions from './actions/ContractEditAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.ContractEditReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(ContractEditActions, dispatch)
    }
}

let ContractEditObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractEdit);

let ContractEditListObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractEditList);

export default {
	ContractEdit: ContractEditObj,
	ContractEditList: ContractEditListObj
}
