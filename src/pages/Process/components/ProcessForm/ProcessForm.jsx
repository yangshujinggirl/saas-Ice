import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './ProcessForm.scss';
import { hashHistory } from 'react-router';


import { Form, Icon, Input, Button, Checkbox, Select, Switch, Radio, Grid, Field } from '@icedesign/base';

const { Row, Col } = Grid;

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import Req from '../../reqs/ProcessReq';
import { Title } from 'components';

import ProcessFormModule from './ProcessFormModule';
import ProcessFormItem from './ProcessFormItem';

Array.prototype.remove = function (val) {
  let index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

Array.prototype.removeItem = function (key, val) {
  let data = this;
  for (let i in data) {
    if (data[i][key] === val) {
      this.splice(i, 1);
    }
  }
};

export default class ProcessForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initFlag: true,
      customMenuList: [],
      moduleList: [],
      selectList: [],
      value: {
        lenderName: '',
        rightFromList: [],
      },
    };
  }

  field = new Field(this, { scrollToFirstError: true });

  /**
   * 初始化
   */
  componentDidMount() {
    // let data = this.props.location.state;
    this.fetchData();
  }

  fetchData = () => {
    let { actions } = this.props;
    Req.getCustomMenuList()
      .then((res) => {
        if (res.code == 200) {
          let customMenuList = res.data;
          let resultArray = customMenuList.map((item, index) => {
            item.uid = 'menu_' + index;
            item.realname = item.name
            return item;
          });
          this.state.customMenuList = resultArray;
          // 赋值右侧数据
          if (customMenuList && customMenuList.length) {
            this.state.moduleList.push(customMenuList[0]);
            this.state.moduleList[0].number -= 1;
            let cid = this.state.moduleList[0].uid + '-' + this.state.moduleList[0].count;
            this.state.moduleList[0].cid = cid;
            this.addItem(res.data[0], cid);
          }
          //状态更新
          this.setState({
            customMenuList: this.state.customMenuList,
            moduleList: this.state.moduleList,
          });

        }
      })
      .catch((ex) => {
        console.log(ex);
      });

    // actions.getCustomMenuList();

  };

  /**
   * methods
   */
    //获取数组元素id对应index
  getArrayKey = (data, key, val) => {
    let inde = null;
    for (let i in data) {
      if (data[i][key] === val) {
        inde = i;
      }
    }
    return inde;
  };
  //初始化右侧可选择select
  initSelectList = () => {
    let result = [];
    this.state.value.rightFromList.map((item) => {
      result.push({
        name: item.moduleName,
        value: item.moduleName,
        uid: item.uid,
        cid: item.cid,
      });
    });
    this.setState({
      selectList: result,
    },() => {
      this.watchIoSelect(event);
    });
  };
  getSelectList = (cid, name) => {
    let data = this.state.selectList.filter((item) => {
      return item.cid != cid;
    });
    return data;
  };


  addItem = (data, cid) => {
    let name = data.name || '';
    this.state.value.rightFromList.push({
      moduleName: name,
      targetName: [],
      pageName: undefined,
      type: undefined,
      uid: data.uid,
      cid: cid,
    });
    this.setState({
      value: this.state.value,
      moduleList: this.state.moduleList,
    }, () => {
      this.initSelectList();
    });
  };
  //模块添加删除
  setModule = (data, type, index) => {
    if (type === 'add' && data.number > 0) {
      //添加模块
      data.number--;
      let newsData = Object.assign({}, data);
      if (data.count) newsData.name += data.count;
      let cid = data.uid + '-' + data.count;
      newsData.cid = cid;
      this.state.moduleList.push(newsData);
      this.addItem(newsData, cid);
      data.count++;
    } else {
      let defaultArray = this.state.customMenuList;
      defaultArray[defaultArray, this.getArrayKey('id', data.id)].number++;
      // 删除count可能出现重复，暂未想到其他解决方法
      // defaultArray[defaultArray, this.getArrayKey('id', data.id)].count--;
      this.state.moduleList.remove(data);
      this.state.value.rightFromList.splice(index, 1);
      this.initSelectList();
    }
    //状态更新
    this.setState({
      customMenuList: this.state.customMenuList,
      value: this.state.value,
      moduleList: this.state.moduleList,
    });

  };

  //表单校验change
  formChange = value => {
    this.setState({
      value: value,
    });
  };

  moduleChange = (event) => {
    this.setState({ value: this.state.value }, () => {
      this.initSelectList();
    });
  };

  //尝试监听数据变化清空选择
  watchIoSelect = () => {
    let data = this.state.value.rightFromList;
    let selectList = this.state.selectList;
    let targetList = selectList.map((item) => {
      return item.name;
    });

    const diffArray = (name) => {
      let count = 0;
      targetList.map((item) => {
        if (item === name) {
          count++;
        }
      });
      return count;
    };
    data.map((item, index) => {
      if (item.targetName.length) {
        item.targetName.map((list, i) => {
          if (!diffArray(list)) {
            this.state.value.rightFromList[index].targetName[i] = null
          }
        });
      }
    });
    this.setState({
      value: this.state.value,
    }, () => {
      console.log(this.state.value);
    });
    return false;
  };

  //校验
  handleSubmit = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      return false;
    });
  }

  handleCancel(){
    hashHistory.push('process');
  }

  /**
   * 渲染
   */
  render() {
    const init = this.field.init;
    const locationInfo = this.props.location.state;
    if(locationInfo) this.state.value.lenderName = locationInfo.name;
    return (
        <IceContainer className="pch-container pch-process">
          <Title title="流程新增/修改" />
          <div className="pch-form">
            <IceFormBinderWrapper value={this.state.value} onBlur={this.formChange} ref="form">
            <Form
              size="large"
              labelAlign="left">
            <Row>
              <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                业务类型：
              </Col>
              <Col s="4" l="4">
                {locationInfo && locationInfo.type}
              </Col>
              <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                资方：
              </Col>
              <Col s="4" l="4">
                {locationInfo &&  locationInfo.lenderType}
              </Col>
              <Col xxs="6" s="2" l="2" style={styles.formLabel}>
                流程名称：
              </Col>
              <Col s="4" l="4">
                <IceFormBinder name="name">
                  <Input value={this.state.value.lenderName} style={{ width: '175px' }} placeholder="流程名称"
                         className="custom-input"/>
                </IceFormBinder>
                <IceFormError name="name"/>
              </Col>
            </Row>
            {/*顶部结束*/}
            <div className="container">
              {/*渲染左边  */}
              <ProcessFormModule customMenuList={this.state.customMenuList} setModule={this.setModule} />
              {/*右边*/}
              <div className="container-right">
                  <div className="con">
                    <Row className="container-right-title">
                      <Col xxs="6" s="2" l="2">&nbsp;</Col>
                      <Col xxs="6" s="3" l="3">模块</Col>
                      <Col xxs="6" s="2" l="6" className="pch-target-name"><span>条件</span><span>跳转</span></Col>
                      <Col xxs="6" s="2" l="3">页面</Col>
                      <Col xxs="6" s="2" l="3">材料清单</Col>
                      <Col xxs="6" s="2" l="2">权限</Col>
                      <Col xxs="6" s="3" l="2">必要数据</Col>
                      <Col xxs="6" s="2" l="3">方式</Col>
                    </Row>
                    {/*内容区域*/}
                    {
                      this.state.moduleList && this.state.moduleList.map((item, index) => {
                        return (
                          <ProcessFormItem key={index} index={index} item={item} selectData={this.getSelectList(item.cid)} />
                        );
                      })
                    }
                  </div>
                  <div className="next-btn-box">
                    <Button type="secondary" size="large" onClick={this.handleSubmit}>提交</Button>
                    <Button type="default" size="large" onClick={this.handleCancel} style={{marginLeft: 10}}>取消</Button>
                  </div>
              </div>
            </div>
            </Form>
            </IceFormBinderWrapper>
          </div>
        </IceContainer>
    );
  }
}

const styles = {
  
  formLabel: {
    marginLeft: '85px',
    textAlign: 'right',
  },
};
