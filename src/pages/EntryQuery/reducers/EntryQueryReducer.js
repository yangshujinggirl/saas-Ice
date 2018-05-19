import T from '../constants/EntryQueryConstant'
import EntryQuery_COLUMNS from '../columns/EntryQueryColumn';
const index = (state = {
  isFetching: false,
  pageData: {}, //列表分页数据
  formData: { },//表单数据
  columns: EntryQuery_COLUMNS,
  view: 'list' //展示界面类型，list列表、form表单、view详情等
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
