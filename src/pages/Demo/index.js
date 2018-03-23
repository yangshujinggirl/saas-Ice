import Demo from './Demo'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as DemoActions from './actions/DemoAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.DemoReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(DemoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo);