import Demo from './Demo'
import DemoAdd from './DemoAdd'
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

let demo1 = connect(
  mapStateToProps,
  mapDispatchToProps
)(Demo);

let demo2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(DemoAdd);

export default {
  Demo: demo1,
  DemoAdd: demo2
}
