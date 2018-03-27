import EntryQuery from './EntryQuery'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as EntryQueryActions from './actions/EntryQueryAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.EntryQueryReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(EntryQueryActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EntryQuery);