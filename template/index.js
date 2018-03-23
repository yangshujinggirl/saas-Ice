import [MODULE] from './[MODULE]'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as [MODULE]Actions from './actions/[MODULE]Action.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.[MODULE]Reducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators([MODULE]Actions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)([MODULE]);