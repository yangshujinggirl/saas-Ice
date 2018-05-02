import ExamineApprove from './ExamineApprove';
import ExamineAudit from './ExamineAudit';
import CheckEssential from './CheckEssential';
import CheckAuthority from './CheckAuthority';
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

let CheckEssentialObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckEssential);

let CheckAuthorityObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckAuthority);


export default {
	ExamineApprove: ExamineApproveObj,
	ExamineAudit: ExamineAuditObj,
	CheckAuthority: CheckAuthorityObj,
	CheckEssential: CheckEssentialObj,
}
