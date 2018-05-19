import T from '../constants/ContractFileConstant'
import Req from '../reqs/ContractFileReq';
import { Dialog, Button, Feedback } from "@icedesign/base";

const Toast = Feedback.toast;

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
export const search = (condition={}) => {
  condition = Object.assign(condition,{lineType:1})
  return (dispatch) => {

    dispatch(fetchStart())

    Req.search(condition).then((res) => {
      if (!res || res.code != 200 || !res.data) return;
      dispatch(fetchSuccess({ pageData: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 获取详情
export const getDetail = (id) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.contractDetailApi(id).then((res) => {
      if (!res || res.code != 200 || !res.data) {
        Toast.error(res.msg);
        return;
      }
      dispatch(fetchSuccess({ formData: res.data}))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
// 获取下载列表
export const getDownLoadList = (id) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.searchFilesApi(id).then((res) => {
      if (!res || res.code != 200 || !res.data) {
        Toast.error(res.msg);
        return;
      }
      dispatch(fetchSuccess({ pageData: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
