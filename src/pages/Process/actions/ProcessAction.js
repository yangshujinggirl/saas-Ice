import T from '../constants/ProcessConstant'
import Req from '../reqs/ProcessReq'

/*******以下定义需要通知到reduucer的全局方法，约定返回数据包括类型＋其余参数*******/

/**
 * 请求开始的通知
 */
function fetchStart(data = {}) {
  return {
    type: T.FETCH_START,
    ...data,
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

function change(data) {
  return {
    type: T.CHANGE,
    ...data,
    time: Date.now()
  }
}


// 获取列表
export const search = (condition) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.search(condition).then((res) => {
      if(res.code == 200) {
        dispatch(fetchSuccess({ pageData: res.data }))
      }
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

// 获取详情
export const getDetail = (id) => {
  return (dispatch) => {

    dispatch(fetchStart({formData: {}}))

    Req.getDetail(id).then((res) => {
      dispatch(fetchSuccess({ formData: res.data, view: 'form' }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 获取左侧
export const getCustomMenuList = (id) => {
  return (dispatch) => {
    dispatch(fetchStart({customMenuList: []}))
    Req.getCustomMenuList(id).then((res) => {
      dispatch(fetchSuccess({ customMenuList: res.data, view: 'view' }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 删除一条记录
export const remove = (id) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.delete(id).then((res) => {
      dispatch(fetchSuccess({delete: true}))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 复制流程
export const copyProcess = (id) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.copyProcess(id).then((res) => {
      dispatch(fetchSuccess({copy: true}))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 更改标志
export const changeHasProcess = (hasProcess) => {
  return (dispatch) => {
    dispatch(change({hasProcess}))
  }
}