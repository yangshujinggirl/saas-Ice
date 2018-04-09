import ExamineApprove from './ExamineApprove'
import ExamineAudit from './ExamineAudit'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ExamineApproveActions from './actions/ExamineApproveAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.ExamineApproveReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(ExamineApproveActions, dispatch)
    }
}

let ExamineApproveObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExamineApprove);

let ExamineAuditObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExamineAudit);


export default {
	ExamineApprove: ExamineApproveObj,
	ExamineAudit: ExamineAuditObj,
}
