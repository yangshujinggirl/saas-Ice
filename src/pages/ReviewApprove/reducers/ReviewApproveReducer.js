import T from '../constants/ReviewApproveConstant'
import ReviewApprove_COLUMNS from '../columns/ReviewApproveColumn';

const index = (state = {
  isFetching: false,
  pageData: {}, //列表分页数据
  formData: {}, //表单数据
  columns: ReviewApprove_COLUMNS,
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
