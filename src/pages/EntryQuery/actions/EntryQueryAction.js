import T from '../constants/EntryQueryConstant'
import Req from '../reqs/EntryQueryReq'
import { Feedback } from "@icedesign/base";

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

// 获取第一页字段
export const searchField = (condition) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.searchField(condition).then((res) => {
      dispatch(fetchSuccess({ fieldList: res.data }))
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
export const getDetail = (data) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.getDetail(data).then((res) => {
      dispatch(fetchSuccess({ detail: res.data, view: 'form' }))
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


//表单保存
export const saveFrom = (data) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.saveFrom(data).then((res) => {
      if(res&& res.code == 200){
        if(data.status == 'submit'){
          Toast.success('提交成功');
        }else {
          Toast.success('保存成功');
        }
      }
      dispatch(fetchSuccess({data: res}))

    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 下拉列表options
export const getSelectList = () => {
  return (dispatch) => {
    dispatch(fetchStart())
    Req.getSelectList(id).then((res) => {
      dispatch(fetchSuccess({data: res.data}))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 获取产品列表
export const getProductList = () => {
  return (dispatch) => {
    dispatch(fetchStart())
    Req.getProductNumApi(id).then((res) => {
      dispatch(fetchSuccess({data: res.data}))
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
