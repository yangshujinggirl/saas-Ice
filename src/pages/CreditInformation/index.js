import CreditInformation from './containers/CreditInformation'
import CreditInformationForm from './containers/CreditInformationForm'
import CreditInformationDetail from './containers/CreditInformationDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as CreditInformationActions from './actions/CreditInformationAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.CreditInformationReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(CreditInformationActions, dispatch)
    }
}

let CreditInformationObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditInformation);

let CreditInformationFormObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditInformationForm);

let CreditInformationDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditInformationDetail);

export default {
	CreditInformation: CreditInformationObj,
	CreditInformationForm: CreditInformationFormObj,
	CreditInformationDetail: CreditInformationDetailObj
}