import T from '../constants/ProcessConstant'
import Req from '../reqs/ProcessReq'
import { Feedback } from "@icedesign/base";
import { hashHistory } from 'react-router'
import FontConfigReq from '../../FontConfig/reqs/FontConfigReq';
import { BaseAction } from 'base';

/*******以下定义需要通知到reduucer的全局方法，约定返回数据包括类型＋其余参数*******/

class ProcessAction extends BaseAction {

  constructor() {
    super(Req, null, T);

    // 定义通知给reducer的方法
    this.actions = {
      // search: this.search.bind(this)
    };

    this.defineAction('search', (condition) => {
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
    });
  }

  defineAction(key, func) {
    this.actions[key] = func;
  }


  // 获取列表
  search1(condition) {
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
}

export default new ProcessAction().actions;
