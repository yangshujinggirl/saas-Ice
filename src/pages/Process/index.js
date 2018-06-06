import Process from './containers/Process'
import ProcessForm from './containers/ProcessForm'
import ProcessDetail from './containers/ProcessDetail'
import ProcessConfig from './containers/ProcessConfig'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as ProcessActions from './actions/ProcessAction.js'
import ProcessActions from './actions/ProcessAction_.js'
import { PchConnect } from 'base';

// console.log(ProcessActions);

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
let ProcessConfigObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProcessConfig);


export default {
	Process: ProcessObj,
	ProcessForm: ProcessFormObj,
    ProcessDetail: ProcessDetailObj,
    ProcessConfig:ProcessConfigObj
}