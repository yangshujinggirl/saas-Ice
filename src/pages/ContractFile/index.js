import ContractFileList from './ContractFileList'
import ContractFileDetail from './ContractFileDetail'
import ContractFileDownLoad from './ContractFileDownLoad'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ContractFileActions from './actions/ContractFileAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.ContractFileReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(ContractFileActions, dispatch)
    }
}

let ContractFileListObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractFileList);

let ContractFileDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractFileDetail);

let ContractFileDownLoadObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContractFileDownLoad);

export default {
	ContractFileList: ContractFileListObj,
	ContractFileDetail: ContractFileDetailObj,
	ContractFileDownLoad: ContractFileDownLoadObj,
}
