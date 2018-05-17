import ContractList from './ContractList'
import ContractAdd from './ContractAdd'
import ContractDetail from './ContractDetail'
import ContractBind from './ContractBind'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContractActions from './actions/ContractAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.ContractReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(ContractActions, dispatch)
    }
}

let ContractListObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractList);

let ContractAddObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractAdd);

let ContractDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractDetail);

let ContractBindObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractBind);

export default {
	ContractList: ContractListObj,
	ContractAdd: ContractAddObj,
	ContractDetail: ContractDetailObj,
	ContractBind: ContractBindObj
}
