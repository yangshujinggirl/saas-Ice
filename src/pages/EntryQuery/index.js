import EntryQuery from './EntryQuery'
import  LoanDetails  from './LoanDetails'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as EntryQueryActions from './actions/EntryQueryAction.js'
import Demo from '../Demo/Demo';
import DemoForm from '../Demo/DemoForm';
import DemoDetail from '../Demo/DemoDetail';

const mapStateToProps = (state, ownProps) => {
    const data = state.EntryQueryReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(EntryQueryActions, dispatch)
    }
}

let LoanDetailsObj = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanDetails);

let EntryQueryObj = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryQuery);


export default {
  LoanDetails: LoanDetailsObj,
  EntryQuery: EntryQueryObj
}
