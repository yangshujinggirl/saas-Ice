import Dashboard from './Dashboard'
import DashboardForm from './DashboardForm'
import DashboardDetail from './DashboardDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as DashboardActions from './actions/DashboardAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.DashboardReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(DashboardActions, dispatch)
    }
}

let DashboardObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

let DashboardFormObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardForm);

let DashboardDetailObj = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardDetail);

export default {
	Dashboard: DashboardObj,
	DashboardForm: DashboardFormObj,
	DashboardDetail: DashboardDetailObj
}