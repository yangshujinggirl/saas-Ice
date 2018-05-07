import T from '../constants/InterViewConstant'
import InterView_COLUMNS from '../columns/InterViewColumn';
import InterView_Column_From from '../columns/InterViewColumnFrom'
const index = (state = {
  isFetching: false,
  pageData: {}, //列表分页数据
  formData: {}, //表单数据
  columns: InterView_COLUMNS,
  columns2:InterView_Column_From,

}, action) => {
  switch (action.type) {
    case T.FETCH_START:
      return { ...state, isFetching: true }
    case T.FETCH_SUCCESS:
      return { ...state, isFetching: false, ...action }
    case T.FETCH_FAILED:
      return { ...state, isFetching: false }
    case T.CHANGE:
      return { ...state, ...action }
    default:
      return state
  }
}

export default index
