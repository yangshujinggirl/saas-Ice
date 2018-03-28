import T from '../constants/FontConfigConstant'

const index = (state = {
  isFetching: false,
  pageData: {}, //列表分页数据
  formData: { //表单数据
    title: '',
    area: 'location1',
    time: [],
    delivery: false,
    type: ['地推活动'],
    resource: '线下场地免费',
    extra: '',
  },
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
