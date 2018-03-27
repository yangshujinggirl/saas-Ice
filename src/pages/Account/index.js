import Account from './Account'
import AccountForm from './AccountForm'
import AccountDetail from './AccountDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as AccountActions from './actions/AccountAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.AccountReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(AccountActions, dispatch)
    }
}

let AccountObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(Account);

let AccountFormObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountForm);

let AccountDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountDetail);

export default {
	Account: AccountObj,
	AccountForm: AccountFormObj,
	AccountDetail: AccountDetailObj
}