import T from '../constants/ProcessConstant'
import PROCESS_COLUMNS from '../columns/ProcessColumn';

const index = (state = {
  isFetching: false,
  pageData: {}, //列表分页数据1
  customMenuList:[],//流程模块数据
  formData: { //表单数据
    taskItems: []
  },
  columns: PROCESS_COLUMNS
}, action) => {
  switch (action.type) {
    case T.FETCH_START:
      return { ...state, isFetching: true, ...action }
    case T.FETCH_SUCCESS:
      return { ...state, isFetching: false, ...action }
    case T.FETCH_FAILED:
      return { ...state, isFetching: false, ...action }
    case T.CHANGE:
      return { ...state, ...action }
    default:
      return state
  }
}

export default index
