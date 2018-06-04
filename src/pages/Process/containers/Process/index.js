import Process from './Process';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// import * as ProcessActions from './actions/ProcessAction.js'
import ProcessActions from '../../actions/ProcessAction_.js'

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
// )(require('./containers/Process').default);

export default ProcessObj;
