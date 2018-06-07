import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './ProcessForm.scss';
import { hashHistory } from 'react-router';

import { Form, Icon, Input, Button, Checkbox, Select, Radio, Grid, Field, Dialog, Feedback } from '@icedesign/base';

const { Row, Col } = Grid;

import {
  FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';
import { Tools, SpDataSource } from 'utils';

import ProcessFormName from '../../components/ProcessFormName';
import ProcessFormModule from '../../components/ProcessFormModule';
import ProcessFormItemList from '../../components/ProcessFormItemList';
import ProcessFields from '../../components/ProcessFields';
import ProcessAuthEdit from '../../components/ProcessAuth/ProcessAuthEdit';
import { PROCESS_VIEW } from '../../constants/ProcessViewConstant';
import SetFont_ from '../../../FontConfig/components/SetFont/SetFont_';
import SetFontView_ from '../../../FontConfig/components/SetFontView/SetFontView_';
import { COMPANY_TYPE } from '../../constants/CompanyTypeConstant';
import Req from '../../reqs/ProcessReq';

export default class ProcessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: PROCESS_VIEW.EDITFORM,
      currentTaskOrder: 1,
    };

    this.currentTaskOrder = 1;
  }

  /**
   * 初始化
   */
  componentDidMount() {
    let { actions, params } = this.props;

    if (params.id) {
      if (params.copy) {
        actions.copyProcess(params.id);
      } else {
        actions.getDetail(params.id);
      }
    }
    actions.getCustomMenuList();
  }

  componentWillUnmount() {
    this.props.actions.changeHasProcess(false);
  }

  componentWillReceiveProps(nextProps) {
    let { customMenuList, formData = {}, params, hasProcess } = nextProps;

    if (!hasProcess) {
      this.assignTaskItems(params, customMenuList, formData);
    }
  }

  /**
   * 处理流程数据
   * 1. 该方法仅在初始化且获取完数据之后执行一次
   * 2. 新增时默认选择第一个进件模块
   * 3. 编辑时获取详情数据关联模块数据并计算模块的使用数量
   * 4. 初始化新增时的默认流程名称和列表页传递的数据
   * @return {[type]} [description]
   */
  assignTaskItems(params, customMenuList, formData) {
    console.log('ProcessForm assignTaskItems');
    if (params.id) {
      if (!formData || !formData.taskItems || formData.taskItems.length == 0 || !customMenuList || customMenuList.length == 0) {
        return;
      }

      formData.taskItems.map((item, i) => {
        customMenuList.map((citem, j) => {
          if (item.taskTypeId == citem.id) {
            citem.limitedAddTimes--;
            // 编辑是需要模块的数据，只更新需要的数据，有些值是已经编辑过的，如果全部更新会替换已编辑过的数据
            item = Object.assign(item, {
              canPrivilegeEditable: citem.canPrivilegeEditable,
              haveConfigPage: citem.haveConfigPage,
              haveRequiredField: citem.haveRequiredField,
              haveCollection: citem.haveCollection,
            });
          }
        });
        this.currentTaskOrder++;
        // item.cid = i;
      });

      // 只处理一次
      this.props.actions.changeHasProcess(true);
    } else {
      this.currentTaskOrder = 1;

      // 新增时使用传递的数据设置
      // 默认名称为"新流程-MMddhhmmss"
      // 若不从列表页过来则初始默认的值
      const locationInfo = this.props.location.state || {};
      if (!locationInfo.processName) {
        locationInfo.processName = '新流程-' + Tools.formatDate(new Date().getTime(), 'MMddhhmmss');
      }
      if (!locationInfo.businessTypeId) {
        locationInfo.businessTypeId = COMPANY_TYPE[0].value;
        locationInfo.businessTypeName = COMPANY_TYPE[0].label;
      }
      if (!locationInfo.tenantId) {
        locationInfo.tenantId = SpDataSource.defaultValue;
        locationInfo.tenantName = SpDataSource.defaultLabel;
      }
      formData = Object.assign(formData, locationInfo);

      if (!customMenuList || customMenuList.length == 0) {
        return;
      }

      customMenuList[0].limitedAddTimes--;
      formData.taskItems = [];

      formData.taskItems.push({
        ...customMenuList[0],
        transitionItems: this.deepCopyArr(customMenuList[0].transitionItems),
        taskOrder: this.currentTaskOrder,
        taskAlias: customMenuList[0].taskTypeName,
        taskTypeId: customMenuList[0].id,
      });
      this.currentTaskOrder++;


      // 只处理一次
      this.props.actions.changeHasProcess(true);
    }
  }

  //模块添加删除
  setModule = (data, type, index) => {
    console.log('setModule', data);
    let taskItems = this.props.formData.taskItems;

    if (type === 'add') {
      //添加模块
      data.limitedAddTimes--;

      taskItems.push({
        ...data,
        transitionItems: this.setRejectDefaultEnd(this.deepCopyArr(data.transitionItems)),
        taskOrder: this.currentTaskOrder,
        // 默认别名同模块名称，多次使用模块被多次使用后，默认别名后加数字区分，模块别名不可重复
        taskAlias: data.taskTypeName + taskItems.length,
        taskTypeId: data.id,
      });
      this.currentTaskOrder++;

    } else {
      let customMenuList = this.props.customMenuList;
      let deleteTaskOrder = data.taskOrder;
      customMenuList.map((item, i) => {
        if (item.id == data.taskTypeId) {
          item.limitedAddTimes++;
        }
      });
      taskItems.splice(index, 1);

      //重置已选择当前模块的值
      taskItems.map((item) => {
        item.transitionItems.map((titem, j) => {
          if (titem.transToTaskOrder == deleteTaskOrder) {
            titem.transToTaskOrder = null;
          }
        });
      });
      this.currentTaskOrder--;
      // 移除进件
      if (data.taskTypeId == 1 && taskItems[0].pageId) {
        let step = this.getStepFromData(taskItems, index);
        this.props.actions.removePageStep(taskItems[0].pageId, step);
      }

    }

    //状态更新
    this.setState({
      value: this.state.value,
    });

  };

  // 深拷贝对象数组
  deepCopyArr(arr) {
    let result = [];

    arr.map((item) => {
      result.push({ ...item });
    });

    return result;
  }

  //设置拒绝流程默认结束
  setRejectDefaultEnd(items){

    items.map((item) => {
      if(item.conditionType == 'REJECT'){
        item.transToTaskOrder = -1;
      }
    })

    return items;
  }

  //表单校验change
  formChange = value => {
    // this.props.actions.changeFormData(value);
    // this.props.formData = value;
  };

  //保存
  handleSave = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }
      // "status": 0, 状态:0=未保存（保存）;1=当前(提交)
      values.status = 0;
      values.processType = 'LOAN';
      if (this.props.params.id) {
        values.id = this.props.params.id;
      }
      if(this.props.params.copy){
        //复制流程的id改为0
        values.id = 0;
      }
      this.props.actions.save(values);
    });
  };

  //提交
  handleSubmit = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }

      // 添加校验流程至少需要两个模块组成
      if (values.taskItems.length < 2) {
        Feedback.toast.error('流程需要由两个或两个以上系统模块组成');
        return;
      }

      for (var i = 0; i < this.props.formData.taskItems.length; i++) {
        let item = this.props.formData.taskItems[i];
        // 进件需要保存页面
        if (item.taskTypeId == 1 && !item.pageId) {
          Feedback.toast.error('模块 ' + item.taskAlias + ' 页面未保存!');
          return;
        }
        if (item.canPrivilegeEditable && (!item.privilegeItems || !item.privilegeItems.length)) {
          Feedback.toast.error('模块 ' + item.taskAlias + ' 权限未配置!');
          return;
        }
      }

      // "status": 0, 状态:0=未保存（保存）;1=当前(提交)
      values.status = 1;
      values.processType = 'LOAN';
      if (this.props.params.id) {
          values.id = this.props.params.id;
      }
      if(this.props.params.copy){
        //复制流程的id改为0
        values.id = 0;
      }
      console.log(values)

      this.props.actions.save(values);
    //   Req.save(values)
    //     .then((res) => {
    //       // 提交成功后弹框提示“xxx产品流程已提交成功”，停留2秒后自动消失，在跳转到列表
    //       Feedback.toast.show({
    //         type: 'success',
    //         content: values.processName + '产品流程已' + (values.status == 1 ? '提交' : '保存') + '成功',
    //         afterClose: () => {
    //           hashHistory.push('/process');
    //         },
    //         duration: 2000,
    //       });
    //     })
    //     .catch((error) => {
    //       Feedback.toast.show({
    //         type: 'error',
    //         content: error.msg,
    //       });
    //     });
    });
  };

  // 取消
  handleCancel() {
    // 取消后本次操作将不被保存，您确定吗？
    Dialog.confirm({
      content: '取消后本次操作将不被保存，您确定吗？',
      locale: {
        ok: '确认',
        cancel: '取消',
      },
      onOk() {
        hashHistory.push('process');
      },
    });
  }

  /**
   * 切换显示的view
   * @param  {[type]} view [description]
   * @return {[type]}      [description]
   */
  changeView(view, item) {
    console.log('changeView', view);
    let { actions, formData = {} } = this.props;

    if (!view || typeof view != 'string') {
      // 默认返回当前编辑页，约定返回不传参数
      view = PROCESS_VIEW.EDITFORM;
    }
    let idx = formData.taskItems.indexOf(item);
    let step = this.getStepFromData(formData.taskItems, idx);//当前的进件属于第几步

    switch (view) {
      case PROCESS_VIEW.VIEWFIELD : {
        // 查看必要字段
        actions.getTasksFields(item.taskTypeId);
        break;
      }
      case PROCESS_VIEW.EDITAUTH : {
        // TODO 获取权限编辑的列表
        // 编辑权限传入当前已选的权限
        actions.getPrivilegeOrgs();
        this.setState({
          privilegeItems: item.privilegeItems || [],
          order: idx,
        });
        break;
      }
      case PROCESS_VIEW.EDITPAGE : {
        // 编辑页面
        // 当流程上定义多个进件的时候，如果其中一个已经编辑了页面，在编辑其他进件需要使用第一个的页面ID
        // 也就是一个流程的进件只会有一个页面ID
        // 同时对应哪一步保存的字段上都要追加step=几的值
        let pageId2;
        formData.taskItems.map((i) => {
          if (i.pageId) {
            pageId2 = i.pageId;
            return;
          }
        });

        // 1. 有页面ID的直接获取页面详情（编辑）
        // 2. 当前进件没有页面ID但该流程已有别的进件有页面ID
        // 3. 该流程的进件都没有ID的获取页面字段（新增）
        if (item.pageId) {
          actions.getPageDetail(item.pageId, step);
          actions.getAllPageFields({
            excludeScreens: this.getExcludeScreens(formData.taskItems, idx)
          });
          this.setState({
            pageId: item.pageId,
            pageId2: undefined,
            order: idx,
            step
          });
        } else if (pageId2) {
          actions.getPageFields({
            step: step
          });
          actions.getAllPageFields({
            excludeScreens: pageId2
          });
          this.setState({
            pageId: undefined,
            pageId2: pageId2,
            order: idx,
            step
          });
        } else {
          actions.getPageFields({
            step: step
          });
          actions.getAllPageFields({
            excludeStep: step
          });
          this.setState({
            // pageId: item.pageId,
            pageId: undefined,
            pageId2: undefined,
            order: idx,
            step
          });
        }

        break;
      }
      case PROCESS_VIEW.PREVIEWPAGE : {
        if (!item.pageId) {
          return;
        }

        actions.getPageDetail(item.pageId, step);
        this.setState({
          pageId: item.pageId,
        });
        break;
      }
    }

    this.setState({
      view,
    });
  }

  //保存权限编辑之后，返回编辑页面
  authSave(privilegeItems) {
    console.log(privilegeItems);
    let order = this.state.order;
    let formData = this.props.formData;

    formData.taskItems[order].privilegeItems = privilegeItems;
    this.setState({
      view: PROCESS_VIEW.EDITFORM,
    });
  }

  /**
   * 保存页面之后，设置页面id，跳转回编辑页
   * @param  {[type]} pageId [description]
   * @return {[type]}        [description]
   */
  handleSavePage(pageId) {
    let order = this.state.order;
    let formData = this.props.formData;

    formData.taskItems[order].pageId = pageId;
    this.setState({
      view: PROCESS_VIEW.EDITFORM,
    });
  }

  /**
   * 获取进件页面配置的step参数
   * 1. 默认从1开始
   * 2. 当前编辑页面在列表的位置
   * @param  {[type]} taskItems 整个模块列表
   * @param  {[type]} order 当前点击编辑页面的模块序号、从0开始
   * @return {[type]}           [description]
   */
  getStepFromData(taskItems, order) {
    if (order == 0) {
      return 1;
    }

    let count = 1;
    taskItems.map((item, i) => {
      if (i < order && item.haveConfigPage) {
        count++;
      }
    });

    return count;
  }

  /**
   * 获取排除的页面IDS
   * 例: 已有页面配置id为1, 里面包含10个字段, 需要查询除了已配置的这10个字段之外的其它字段时,
   * 设置此参数, 多个id以逗号分隔
   * @param  {[type]} taskItems [description]
   * @param  {[type]} order [description]
   * @return {[type]}           [description]
   */
  getExcludeScreens(taskItems, order) {
    let result = [];
    taskItems.map((item, i) => {
      if (item.haveConfigPage && item.pageId && result.indexOf(item.pageId) == -1) {
        result.push(item.pageId);
      }

    });

    return result.join(',');
  }

  validateForm(){
    this.refs.form.validateAll();
  }

  /**
   * 渲染
   */
  render() {
    const locationInfo = this.props.location.state;
    let { customMenuList, formData = {}, params, tasksFields = {}, pageFields, allPageFields, orgsData = {} } = this.props;
    let { privilegeItems } = this.state;

    return (
      <div className="all-in-one-for-you">
        <IceContainer className="pch-container pch-process" style={{
          display: this.state.view == PROCESS_VIEW.EDITFORM ? '' : 'none',
        }}>
          <Title title="流程新增/修改"/>
          <div className="pch-form">
            <IceFormBinderWrapper value={formData} onChange={this.formChange} ref="form">
              <Form size="large" labelAlign="left">
                <ProcessFormName info={formData}/>
                {/*顶部结束*/}
                <div className="container">
                  {/*渲染左边  */}
                  <ProcessFormModule customMenuList={customMenuList} setModule={this.setModule.bind(this)}/>
                  {/*右边*/}
                  <div className="container-right">
                    <ProcessFormItemList taskItems={formData.taskItems} setModule={this.setModule.bind(this)}
                                         changeView={this.changeView.bind(this)} validateForm={this.validateForm.bind(this)} />
                    <div className="next-btn-box pch-form-buttons">
                      <Button type="normal" size="large" onClick={this.handleCancel.bind(this)}>
                        取消
                      </Button>
                      <Button type="primary" size="large" onClick={this.handleSave} disabled={this.props.isSubmiting}>
                        保存
                      </Button>
                      <Button type="secondary" size="large" onClick={this.handleSubmit}
                              disabled={this.props.isSubmiting}>
                        提交
                      </Button>
                    </div>
                  </div>
                </div>
              </Form>
            </IceFormBinderWrapper>
          </div>
        </IceContainer>
        <ProcessFields formData={formData} data={tasksFields.requiredFields}
                       visible={this.state.view == PROCESS_VIEW.VIEWFIELD} changeView={this.changeView.bind(this)}/>
        <SetFont_ id={this.state.pageId} id2={this.state.pageId2} step={this.state.step} resData={pageFields}
                  allPageFields={allPageFields} visible={this.state.view == PROCESS_VIEW.EDITPAGE}
                  changeView={this.changeView.bind(this)} onSave={this.handleSavePage.bind(this)}/>
        <ProcessAuthEdit formData={formData} orgsData={orgsData} data={privilegeItems}
                         visible={this.state.view == PROCESS_VIEW.EDITAUTH} changeView={this.changeView.bind(this)}
                         onSave={this.authSave.bind(this)}/>
        <SetFontView_ id={this.state.pageId} resData={pageFields} visible={this.state.view == PROCESS_VIEW.PREVIEWPAGE}
                      changeView={this.changeView.bind(this)}/>
      </div>
    );
  }
}
