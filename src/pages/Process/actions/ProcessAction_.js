import T from '../constants/ProcessConstant'
import Req from '../reqs/ProcessReq'
import { BaseAction } from 'base';
import { Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router'
import FontConfigReq from '../../FontConfig/reqs/FontConfigReq';

class ProcessAction extends BaseAction {

  constructor() {
    super(Req, null, T);

    // 定义通知给reducer的方法名称
    this._actionKeys = [
      'search',
      'getCustomMenuList',
      'save',
      'changeHasProcess',
      'getDetail',
      'remove',
      'copyProcess',
      'getProcessProdList',
      'getProcessProdOldList',
      'saveProcessConfigProduct',
      'getTasksFields',
      'getPageFields',
      'getAllPageFields',
      'getPageDetail',
      'getPrivilegeOrgs',
      'changeFormData'
    ];

    // 初始化一些数据
    this.init();
  }

  // 获取列表
  search(condition) {
    return (dispatch) => {

      dispatch(this.fetchStart({ formData: {} }))

      Req.search(condition).then((res) => {
        if (res.code == 200) {
          dispatch(this.fetchSuccess({ pageData: res.data }))
        }
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }

  // 保存表单
  save(data) {
    return (dispatch) => {

      dispatch(this.fetchStart({ isSubmiting: true }))

      Req.save(data).then((res) => {
        // 提交成功后弹框提示“xxx产品流程已提交成功”，停留2秒后自动消失，在跳转到列表
        Feedback.toast.show({
          type: 'success',
          content: data.processName + '产品流程已' + (data.status == 1 ? '提交' : '保存') + '成功',
          afterClose: () => {
            dispatch(this.fetchSuccess({ formData: {}, isSubmiting: false }))
            hashHistory.push('/process');
          },
          duration: 2000
        });
      }).catch((res) => {
        dispatch(this.fetchFailed({ isSubmiting: false }))
      })
    }
  }

  // 获取详情
  getDetail(id) {
    return (dispatch) => {

      dispatch(this.fetchStart({ formData: {} }))

      Req.getDetail(id).then((res) => {
        dispatch(this.fetchSuccess({ formData: res.data }))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }

  // 获取左侧
  getCustomMenuList(id) {
    return (dispatch) => {
      dispatch(this.fetchStart({ customMenuList: [] }))
      Req.getCustomMenuList(id).then((res) => {
        if (res.code != 200) return;
        dispatch(this.fetchSuccess({ customMenuList: res.data }))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }

  // 删除一条记录
  remove(id) {
    return (dispatch) => {

      dispatch(this.fetchStart())

      Req.delete(id).then((res) => {
        dispatch(this.fetchSuccess({ delete: true }))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }

  // 复制流程
  copyProcess(id) {
    return (dispatch) => {

      dispatch(this.fetchStart())

      Req.copyProcess(id).then((res) => {
        if (res.code != 200) {
          Feedback.toast.show({
            type: 'error',
            content: res.msg,
          });
          return;
        }
        dispatch(this.fetchSuccess({ copy: true }))
        hashHistory.push(`process/edit/${res.data.id}`);
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }

  // 更改标志
  changeHasProcess(hasProcess) {
    return (dispatch) => {
      dispatch(this.change({ hasProcess }))
    }
  }
  //流程配置产品左侧列表
  getProcessProdList(condition) {
    return (dispatch) => {

      Req.getProcessProdList(condition).then((res) => {
        if (res.code == 200) {
          dispatch(this.fetchSuccess({ formData: res.data }))
        }
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }
  //流程配置产品右侧列表 
  getProcessProdOldList(id) {
    return (dispatch) => {

      Req.getProcessProdOldList(id).then((res) => {
        if (res.code == 200) {
          dispatch(this.fetchSuccess({ formLeftData: res.data }))

        }
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }
  //流程配置产品保存
  saveProcessConfigProduct(data, id) {
    return (dispatch) => {

      dispatch(this.fetchStart())

      Req.saveProcessConfigProduct(data, id).then((res) => {
        hashHistory.push('/process')
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }
  //获取必要字段
  getTasksFields(taskTypeId) {
    return (dispatch) => {
      dispatch(this.fetchStart())

      Req.getTasksFields(taskTypeId).then((res) => {
        if (res.code != 200) return;
        dispatch(this.fetchSuccess({ tasksFields: res.data }))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }


  //获取页面配置字段
  getPageFields(options) {
    return (dispatch) => {
      dispatch(this.fetchStart())

      FontConfigReq.getDetail(options).then((res) => {
        if (res.code != 200) return;
        dispatch(this.fetchSuccess({ pageFields: { fieldset: res.data.list } }))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }

  //获取页面所有的配置字段
  getAllPageFields(options) {
    return (dispatch) => {
      dispatch(this.fetchStart())

      FontConfigReq.getDetail(options).then((res) => {
        if (res.code != 200) return;
        dispatch(this.fetchSuccess({ allPageFields: { fieldset: res.data.list } }))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }

  //获取页面配置详情
  getPageDetail(id, step) {
    return (dispatch) => {
      dispatch(this.fetchStart())

      FontConfigReq.getCode(id, step).then((res) => {
        if (res.code != 200) return;
        dispatch(this.fetchSuccess({ pageFields: res.data }))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }
  //权限编辑机构／角色
  getPrivilegeOrgs() {
    return (dispatch) => {
      dispatch(this.fetchStart())

      Req.getPrivilegeOrgs().then((res) => {
        // if (res.code != 200) return;
        dispatch(this.fetchSuccess({ orgsData: res.data }))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }

  changeFormData(data) {
    return (dispatch) => {
      dispatch(change({ formData: data }))
    }
  }
}

export default new ProcessAction().actions;
