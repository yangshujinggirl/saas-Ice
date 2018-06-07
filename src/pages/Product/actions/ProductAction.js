import T from '../constants/ProductConstant'
import Req from '../reqs/ProductReq'
import { hashHistory } from 'react-router';
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

//产品初始
export const prodActions = (condition) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.prodActions(condition).then((res) => {
      let data = res.data;
      if (!res || res.code != 200) {
        data = {};
      }

      // 添加一个默认全部选项
      data.repaymentPeriodFrequency && data.repaymentPeriodFrequency.splice(0, 0, {
        value: 'ALL_CHOICE',
        desc: '全部'
      });

      dispatch(fetchSuccess({ prodActions: data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
// 获取列表
export const search = (condition) => {
  return (dispatch) => {

    dispatch(fetchStart())

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
      hashHistory.push(`/product/addtwo/${res.data.id}`)
    }).catch((ex) => {
      Req.tipError(ex.msg,1000)
      dispatch(fetchFailed(ex))
    })
  }
}
//产品提交第二步保存
export const productsave = (data, id) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.productsave(data, id).then((res) => {
      if (!res || res.code != 200) return;
      hashHistory.push(`/product/process/${id}`)
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
//产品权限编辑
export const saveProductAuth = (data,id) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.saveProductAuth(data, id).then((res) => {
      if (!res || res.code != 200) return;
      hashHistory.push(`/product/addthree/${id}`)
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }

}
//产品提交第三步保存
export const saveProductAdd = (id, data,processDefId,tempData) => {
  return (dispatch) => {
    dispatch(fetchStart())
    Req.saveProductAdd(id, data,processDefId).then((res) => {

      if (!res || res.code != 200){
        return;
      }else{
        Req.getProductStatus(id).then((res)=>{
          dispatch(fetchSuccess({ status: true }))
        }).catch((ex)=>{
            dispatch(fetchFailed(ex))

        })


        Req.saveContractTemplate(tempData).then((res)=>{
          if (!res || res.code != 200) return;

          hashHistory.push('/product/search');

        }).catch((ex)=>{
            dispatch(fetchFailed(ex))

        })


      }
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

// 获取产品详情
export const getDetail = (id) => {
  return (dispatch) => {
    dispatch(fetchStart())
    Req.getDetail(id).then((res) => {
      if(res.code==200){
        dispatch(fetchSuccess({ formData: res.data }))
      }
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
//产品编辑页的记录展示
export const edit = (id) => {
  return (dispatch) => {
    dispatch(fetchStart())
    Req.prodedit(id).then((res) => {
      dispatch(fetchSuccess({ prodInfo: res }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//产品修改后保存
export const prodrevise = (condition) => {
  return (dispatch) => {
    dispatch(fetchStart({isSubmiting: true}))
    Req.prodrevise(condition).then((res) => {
      Req.tipSuccess('编辑成功！',500,() => {
          dispatch(fetchSuccess({isSubmiting: false}))
          hashHistory.push('/product/search');
      });
    }).catch((ex) => {
      dispatch(fetchStart({isSubmiting: false}))
      // dispatch(fetchFailed(ex))
    })
  }
}
  //材料清单查询
export const filesearch = (condition) => {
  return (dispatch) => {
    dispatch(fetchStart())
    Req.filesearch(condition).then((res) => {
      dispatch(fetchSuccess({ fileData: res }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}


//材料清单明细
export const fileDetail = (id) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.fileDetail(id).then((res) => {
      if (!res || res.code != 200) dispatch(fetchFailed(res));
      dispatch(fetchSuccess({ editData: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

export const changeFileDetail = (data) => {
  return (dispatch) => {
    dispatch(change({ editData: data }))
  }
}

//保存资料清单信息
export const fileSave = (value) => {
  return (dispatch) => {
    dispatch(fetchStart())
    Req.fileSave(value).then((res) => {
      if (!res || res.code != 200) return;
      dispatch(change({ editData: {} }))
      hashHistory.push('/product/filelist')
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//删除材料资料清单
export const fileremove = (id) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.fileremove(id).then((res) => {
      filesearch()(dispatch);
      //dispatch(fetchSuccess({delete: true}))
    }).catch((ex) => {
        Req.tipError('该材料清单明细已关联进件数据，不能删除！',3000)
        filesearch()(dispatch);
      // dispatch(fetchFailed(ex))
    })
  }
}
// 删除材料明细一条记录
export const fileRemoveDes = (id) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.fileRemoveDes(id).then((res) => {
      Req.fileDetail(id).then((res) => {
        dispatch(fetchSuccess({ editData: res }))
      }).catch((ex) => {
        dispatch(fetchFailed(ex))
      })
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
//材料 编辑后确定
export const fileEditSave = (value, id) => {
  return (dispatch) => {
    dispatch(fetchStart())
    Req.fileEditSave(value, id).then((res) => {
      if (!res || res.code != 200) return;
      dispatch(change({ editData: {} }))
      hashHistory.push('/product/filelist')
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//品牌、车型、车系
export const addTwoList = (data, formData, page) => {
  return (dispatch) => {
    dispatch(fetchStart())
    Req.addTwoList(data, formData, page).then((res) => {
      dispatch(fetchSuccess({ addTwoData: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//集团、渠道、厅店
export const getGroupList = (data, formData, page) =>{
  return (dispatch) => {
    dispatch(fetchStart())
    Req.getGroupList(data, formData, page).then((res) => {
      dispatch(fetchSuccess({ groupData: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//产品名称不重复
export const productNameRepeat = (condition) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.productNameRepeat(condition).then((res) => {
      if (res.code == 200) {
        dispatch(fetchSuccess({ productAllName: res }))
      }
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//材料名称不重复
export const fileNameRepeat = (condition) => {
  return (dispatch) => {

    dispatch(fetchStart())

    Req.fileNameRepeat(condition).then((res) => {
      if (res.code == 200) {
        dispatch(fetchSuccess({ fileAllName: res }))
      }
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//合同模板列表
export const getContractTemplateList = (condition)=>{
  return (dispatch) => {

    dispatch(fetchStart())

    Req.getContractTemplateList(condition).then((res) => {
      if (res.code == 200) {
        dispatch(fetchSuccess({ templateList: res.data }))
      }
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}

//渠道
export const getProdeuctAgency=(condition)=>{
  return (dispatch) => {

    dispatch(fetchStart())

    Req.getProdeuctAgency(condition).then((res) => {
      if (!res || res.code != 200) return;
      dispatch(fetchSuccess({ AgencyData: res.data }))

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
      dispatch(fetchSuccess({ orgsData: res.data }))
    }).catch((ex) => {
      dispatch(fetchFailed(ex))
    })
  }
}
