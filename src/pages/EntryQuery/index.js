import EntryQuery from './EntryQuery'
import  LoanDetails  from './LoanDetails'
import  LoanModify  from './LoanModify'
import  LoanApplication  from './LoanApplication'
import  LoanApplicationOne  from './LoanApplicationOne'
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

let LoanDetailsObj = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanDetails);

let EntryQueryObj = connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryQuery);

let LoanModifyObj = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanModify);

let LoanApplicationObj = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanApplication);

let LoanApplicationOneObj = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoanApplicationOne);

export default {
  LoanDetails: LoanDetailsObj,
  EntryQuery: EntryQueryObj,
  LoanModify: LoanModifyObj,
  LoanApplication: LoanApplicationObj,
  LoanApplicationOne: LoanApplicationOneObj
}
