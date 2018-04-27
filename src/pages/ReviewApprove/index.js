import ReviewApprove from './ReviewApprove'
import ReviewApproveForm from './ReviewApproveForm'
import ReviewApproveDetail from './ReviewApproveDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ReviewApproveActions from './actions/ReviewApproveAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.ReviewApproveReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(ReviewApproveActions, dispatch)
    }
}

let ReviewApproveObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewApprove);

let ReviewApproveFormObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewApproveForm);

let ReviewApproveDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(ReviewApproveDetail);

export default {
	ReviewApprove: ReviewApproveObj,
	ReviewApproveForm: ReviewApproveFormObj,
	ReviewApproveDetail: ReviewApproveDetailObj
}