import Demo from './Demo'
import DemoForm from './DemoForm'
import DemoDetail from './DemoDetail'
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

let DemoObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(Demo);

let DemoFormObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(DemoForm);

let DemoDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(DemoDetail);

export default {
	Demo: DemoObj,
	DemoForm: DemoFormObj,
	DemoDetail: DemoDetailObj
}