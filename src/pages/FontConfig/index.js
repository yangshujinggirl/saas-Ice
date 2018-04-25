import FontConfig from './FontConfig'
import AddFont from './AddFont'
import SetFont from './SetFont'
import SetFontView from './SetFontView'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as FontConfigActions from './actions/FontConfigAction.js'

const mapStateToProps = (state, ownProps) => {
    const data = state.FontConfigReducer;
    return data;
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        actions: bindActionCreators(FontConfigActions, dispatch)
    }
}

let viewOne = connect(
    mapStateToProps,
    mapDispatchToProps
)(FontConfig);

let viewTwo = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddFont);

let viewThr = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetFont);

let viewFour = connect(
    mapStateToProps,
    mapDispatchToProps
)(SetFontView);
  

export default ({
    fontConfig: viewOne,
    addFont: viewTwo,
    setFont: viewThr,
    setFontView: viewFour,
});