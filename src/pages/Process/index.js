import Process from './containers/Process'
import ProcessForm from './containers/ProcessForm'
import ProcessDetail from './containers/ProcessDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ProcessActions from './actions/ProcessAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.ProcessReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(ProcessActions, dispatch)
    }
}

let ProcessObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(Process);

let ProcessFormObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProcessForm);

let ProcessDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProcessDetail);



export default {
	Process: ProcessObj,
	ProcessForm: ProcessFormObj,
    ProcessDetail: ProcessDetailObj,
}