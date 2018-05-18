import T from '../constants/ReviewApproveConstant'
import Req from '../reqs/ReviewApproveReq'

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
      dispatch(fetchSuccess({ pageData: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}


// 签收
export const signIn = (condition) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.signIn(condition).then((res) => {
      dispatch(fetchSuccess({ signIn: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}


// 获取进件详情
export const getDetail = (id) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.getDetail(id).then((res) => {
      dispatch(fetchSuccess({ detail: res.data, view: 'form' }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 获取轨迹详情
export const getTrackDetail = (data) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.getTrackDetail(data).then((res) => {
      dispatch(fetchSuccess({ trackDetail: res.data, view: 'form' }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//获取进件材料详情
export const getLoadMaterialDetails = (data) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.getLoadMaterialDetails(data).then((res) => {
      dispatch(fetchSuccess({ loadMaterialDetails: res.data, view: 'form' }))
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

export function changeViewToForm() {
  return dispatch({ view: 'form' });
}

export function changeViewToList() {
  return dispatch({ view: 'list' });
}

export function changeViewToView() {
  return dispatch({ view: 'view' });
}
