import InterView from './InterView'
import InterViewOnly from './InterViewOnly'
import InterViewForm from './InterViewForm'
import InterViewDetail from './InterViewDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as InterViewActions from './actions/InterViewAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.InterViewReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(InterViewActions, dispatch)
    }
}

let InterViewObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(InterView);

let InterViewOnlyObj = connect(
  mapStateToProps,
  mapDispatchToProps
)(InterViewOnly);

let InterViewFormObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(InterViewForm);

let InterViewDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(InterViewDetail);

export default {
	InterView: InterViewObj,
  InterViewOnly: InterViewOnlyObj,
	InterViewForm: InterViewFormObj,
	InterViewDetail: InterViewDetailObj
}
