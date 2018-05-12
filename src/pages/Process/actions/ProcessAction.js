import T from '../constants/ProcessConstant'
import Req from '../reqs/ProcessReq'
import { Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router'
import FontConfigReq from '../../FontConfig/reqs/FontConfigReq';

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

    dispatch(fetchStart({ formData: {} }))

    Req.search(condition).then((res) => {
      if (res.code == 200) {
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
      if (res.code != 200) {
        Feedback.toast.show({
          type: 'error',
          content: res.msg,
        });
        return;
      }

      // 提交成功后弹框提示“xxx产品流程已提交成功”，停留2秒后自动消失，在跳转到列表
      Feedback.toast.show({
        type: 'success',
        content: data.processName + '产品流程已' + (data.status == 1 ? '提交': '保存') +'成功',
        afterClose: () => {
          dispatch(fetchSuccess({ formData: {} }))
          hashHistory.push('/process');
        }
      });
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 获取详情
export const getDetail = (id) => {
  return (dispatch) => {

    dispatch(fetchStart({ formData: {} }))

    Req.getDetail(id).then((res) => {
      dispatch(fetchSuccess({ formData: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 获取左侧
export const getCustomMenuList = (id) => {
  return (dispatch) => {
    dispatch(fetchStart({ customMenuList: [] }))
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
      dispatch(fetchSuccess({ delete: true }))
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
      if (res.code != 200) {
        Feedback.toast.show({
          type: 'error',
          content: res.msg,
        });
        return;
      }
      dispatch(fetchSuccess({ copy: true }))
      hashHistory.push(`process/edit/${res.data.id}`);
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 更改标志
export const changeHasProcess = (hasProcess) => {
  return (dispatch) => {
    dispatch(change({ hasProcess }))
  }
}
//流程配置产品左侧列表
export const getProcessProdList = (condition) => {
  return (dispatch) => {

    Req.getProcessProdList(condition).then((res) => {
      if (res.code == 200) {
        dispatch(fetchSuccess({ formData: res.data }))
      }
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
//流程配置产品右侧列表 
export const getProcessProdOldList = (id) => {
  return (dispatch) => {

    Req.getProcessProdOldList(id).then((res) => {
      if(res.code==200){
        dispatch(fetchSuccess({ formOldData: res.data }))

      }
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
//流程配置产品保存
export const saveProcessConfigProduct = (data) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.saveProcessConfigProduct(data).then((res) => {
      hashHistory.push('/process')
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
//获取必要字段
export const getTasksFields = (taskTypeId) => {
  return (dispatch) => {
    dispatch(fetchStart())

    Req.getTasksFields(taskTypeId).then((res) => {
      if (res.code != 200) return;
      dispatch(fetchSuccess({ tasksFields: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}


//获取页面配置字段
export const getPageFields = (options) => {
  return (dispatch) => {
    dispatch(fetchStart())

    FontConfigReq.getDetail(options).then((res) => {
      if (res.code != 200) return;
      dispatch(fetchSuccess({ pageFields: {fieldset: res.data.list} }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//获取页面所有的配置字段
export const getAllPageFields = (options) => {
  return (dispatch) => {
    dispatch(fetchStart())

    FontConfigReq.getDetail(options).then((res) => {
      if (res.code != 200) return;
      dispatch(fetchSuccess({ allPageFields: {fieldset: res.data.list} }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//获取页面配置详情
export const getPageDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStart())

    FontConfigReq.getCode(id).then((res) => {
      if (res.code != 200) return;
      dispatch(fetchSuccess({ pageFields: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
//权限编辑机构／角色
export const getPrivilegeOrgs = () => {
  return (dispatch)=>{
    dispatch(fetchStart())

    Req.getPrivilegeOrgs().then((res) => {
      // if (res.code != 200) return;
      dispatch(fetchSuccess({ orgsData: res }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
