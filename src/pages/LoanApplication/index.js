import LoanApplicationFixed from './LoanApplicationFixed'
import LoanApplicationConfig from './LoanApplicationConfig'
import LoanApplicationDetail from './LoanApplicationDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as LoanApplicationActions from './actions/LoanApplicationAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.LoanApplicationReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(LoanApplicationActions, dispatch)
    }
}

let LoanApplicationObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoanApplicationFixed);

let LoanApplicationConfigObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoanApplicationConfig);

let LoanApplicationDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoanApplicationDetail);

export default {
	LoanApplicationFixed: LoanApplicationObj,
	LoanApplicationConfig: LoanApplicationConfigObj,
	LoanApplicationDetail: LoanApplicationDetailObj
}
