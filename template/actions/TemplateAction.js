

import { BaseAction } from 'base';
import T from '../constants/[MODULE]Constant'
import Req from '../reqs/[MODULE]Req'
import { hashHistory } from 'react-router'

class [MODULE]Action extends BaseAction {

  constructor() {
    super(Req, null, T);

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

      dispatch(this.fetchStart())

      Req.save(data).then((res) => {
        dispatch(this.fetchSuccess({ formData: {} }))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }

  // 获取详情
  getDetail(id){
    return (dispatch) => {

      dispatch(this.fetchStart())

      Req.getDetail(id).then((res) => {
        dispatch(this.fetchSuccess({ formData: res.data}))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }

  // 删除一条记录
  remove(id){
    return (dispatch) => {

      dispatch(this.fetchStart())

      Req.delete(id).then((res) => {
        dispatch(this.fetchSuccess({delete: true}))
      }).catch((ex) => {
        dispatch(this.fetchFailed(ex))
      })
    }
  }
}

export default new [MODULE]Action().actions;

