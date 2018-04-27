import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './ProcessForm.scss';
import { hashHistory } from 'react-router';


import { Icon, Input, Button, Checkbox, Select, Switch, Radio, Grid, Field } from '@icedesign/base';

const { Row, Col } = Grid;

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';
import Req from '../../reqs/ProcessReq';
import { Title } from 'components';

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

  //select生成
  renderSelect = (data) => {
    return (
      data && data.map((item, index) => {
        return (
          <Select.Option key={index} value={`${item.value}`}>{item.name}</Select.Option>
        );
      })
    );
  };

  //校验
  validateAllFormField = () => {
    this.refs.form.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      return false;
    });
  };

  /**
   * 渲染
   */
  render() {
    const init = this.field.init;
    const locationInfo = this.props.location.state;
    if(locationInfo) this.state.value.lenderName = locationInfo.name;
    return (
      <div className="pch-process">
        <IceContainer className="pch-container pch-process">
          <Title title="流程新增/修改" />
          <IceFormBinderWrapper>
            <div>
              <div style={styles.fieldBox}>
                <Row style={styles.formItem}>
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
              </div>
            </div>
          </IceFormBinderWrapper>
          {/*顶部结束*/}
          <div className="container">
            {/*渲染左边  */}
            <div className="container-left">
              <div className="con">
                <ul className='container-left-uls'>
                  {
                    this.state.customMenuList && this.state.customMenuList.map((item, index) => {
                      return (
                        <li key={index}>
                          <span className="texts">{item.number}-{item.name}</span>
                          <span className="icons">{item.number > 0 && <i onClick={() => this.setModule(item, 'add')} className="icon">&#xe61c;</i>}</span>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
            </div>
            {/*右边*/}
            <div className="container-right">
              <IceFormBinderWrapper value={this.state.value} onBlur={this.formChange} ref="form">
                <div className="con">
                  <Row className="container-right-title">
                    <Col xxs="6" s="2" l="2">1</Col>
                    <Col xxs="6" s="3" l="3">模块</Col>
                    <Col xxs="6" s="2" l="6" className="pch-target-name"><span>条件</span><span>跳转</span></Col>
                    <Col xxs="6" s="2" l="4">页面</Col>
                    <Col xxs="6" s="2" l="2">权限</Col>
                    <Col xxs="6" s="3" l="3">必要数据</Col>
                    <Col xxs="6" s="2" l="4">方式</Col>
                  </Row>
                  {/*内容区域*/}
                  {
                    this.state.moduleList && this.state.moduleList.map((item, index) => {
                      return (
                        <Row align="top" key={index} className={`container-right-tabRow ${index%2===0 ? '' : 'even'}`}>
                          <Col xxs="6" s="2" l="2" className="pch-icon-setting">
                            {index != 0 && <i onClick={() => this.setModule(item, 'minus', index)} className="icon">&#xe68e;</i>}
                          </Col>
                          <Col xxs="6" s="3" l="3" className="pch-moduleName">
                            <div className="pch-realname">{item.realname}</div>
                            <IceFormBinder name={`rightFromList[${index}].moduleName`} required max={10} message="模块名称">
                              <Input onChange={this.moduleChange}/>
                            </IceFormBinder>
                          </Col>
                          <Col xxs="6" s="2" l="6">
                            {item.config && item.config.map((list, ind) => {
                              return (
                                <div className="pch-target-name" key={ind}>
                                  <Select disabled defaultValue={list}>{this.renderSelect([{
                                    name: list,
                                    value: list,
                                  }])}</Select>
                                  <IceFormBinder name={`rightFromList[${index}].targetName[${ind}]`}>
                                    <Select>{this.renderSelect(this.getSelectList(item.cid))}</Select>
                                  </IceFormBinder>
                                </div>
                              );
                            })}
                          </Col>
                          <Col xxs="6" s="2" l="4">
                            {item.page ? <IceFormBinder
                              name={`rightFromList[${index}].pageName`}><Select className="pch-page-name">{this.renderSelect(item.page)}</Select></IceFormBinder> : '--'}
                            {item.page && <a className='pch-target'>新增页面</a>}
                          </Col>
                          <Col xxs="6" s="2" l="2">
                            {item.private && <a className="pch-target">编辑</a>}
                          </Col>
                          <Col xxs="6" s="3" l="3">
                            {item.source && <a className="pch-target">查看</a>}
                          </Col>
                          <Col xxs="6" s="2" l="4">
                            {item.type ? <IceFormBinder
                              name={`rightFromList[${index}].type`}><Select className="pch-type-name">{this.renderSelect(item.type)}</Select></IceFormBinder> : '--'}
                          </Col>
                        </Row>
                      );
                    })
                  }
                  <Button style={{ marginLeft: 10 }} onClick={this.validateAllFormField}>
                    校验整个表单
                  </Button>
                </div>

              </IceFormBinderWrapper>
            </div>
          </div>
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  legend: {
    marginLeft: 0,
    paddingLeft: '15px',
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: '#fff',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '25px',
  },
  legLine: {
    display: 'inline-block',
    zoom: 1,
    verticalAlign: 'top',
    marginRight: '12px',
    width: '4px',
    height: '25px',
    backgroundColor: '#ec9d00',
  },
  fieldBox: {
    margin: '0 15px',
    padding: '25px 0 0 0',
    borderTop: '1px solid #d8d8d8',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    marginLeft: '85px',
    textAlign: 'right',
  },
  btns: {
    width: '90px',
    height: '32px',
    lineHeight: '32px',
    border: 'none',
    fontSize: '16px',
    borderRadius: 'none !important',
    color: '#fff',
    backgroundColor: '#ec9d00',
  },
  searchTable: {
    width: '1400px',
    margin: '25px',
  },
  pagination: {
    textAlign: 'left',
    paddingTop: '26px',
  },
};
