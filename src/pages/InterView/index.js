import InterView from './InterView'
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
	InterViewForm: InterViewFormObj,
	InterViewDetail: InterViewDetailObj
}