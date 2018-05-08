import [MODULE] from './containers/[MODULE]'
import [MODULE]Form from './containers/[MODULE]Form'
import [MODULE]Detail from './containers/[MODULE]Detail'
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

let [MODULE]Obj = connect(
    mapStateToProps,
    mapDispatchToProps
)([MODULE]);

let [MODULE]FormObj = connect(
    mapStateToProps,
    mapDispatchToProps
)([MODULE]Form);

let [MODULE]DetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)([MODULE]Detail);

export default {
	[MODULE]: [MODULE]Obj,
	[MODULE]Form: [MODULE]FormObj,
	[MODULE]Detail: [MODULE]DetailObj
}