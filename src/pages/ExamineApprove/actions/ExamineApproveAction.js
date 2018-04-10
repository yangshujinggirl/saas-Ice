import T from '../constants/ExamineApproveConstant'
import Req from '../reqs/ExamineApproveReq'

/*******以下定义需要通知到reduucer的全局方法，约定返回数据包括类型＋其余参数*******/

/**
 * 请求开始的通知
 */
function fetchStart() {
  return {
    type: T.FETCH_START,
    time: Date.now()
  }
}


/**
 * 请求成功的通知
 * @param data 成功后的数据
 */
function fetchSuccess(data) {
  return {
    type: T.FETCH_SUCCESS,
    ...data,
    time: Date.now()
  }
}

/**
 * 请求失败后的通知
 * @param error 异常信息
 */
function fetchFailed(error) {
  return {
    type: T.FETCH_FAILED,
    error,
    time: Date.now()
  }
}

function dispatch(data) {
  return {
    type: T.CHANGE,
    ...data
  }
}


// 获取列表
export const search = (condition) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.search(condition).then((res) => {
      dispatch(fetchSuccess({ pageData: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
// 获取列表
export const aduitList = (condition) => {
  return (dispatch) => {

    dispatch(fetchStart())
    Req.getAuditListApi(condition).then((res) => {
      if(!res || res.code != 200) {
        return
      }
      dispatch(fetchSuccess({ pageData: res.data}))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 保存表单
export const save = (data) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.save(data).then((res) => {
      dispatch(fetchSuccess({ formData: {}, view: 'list' }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
