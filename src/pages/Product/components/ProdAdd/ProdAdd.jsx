import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Field,
  Table,
} from '@icedesign/base';

import IceContainer from '@icedesign/container';
// import CellEditor from './CellEditor';
// form binder 详细用法请参见官方文档
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import './ProdAdd.scss';
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;



const generatorData = () => {
  return Array.from({ length: 3 }).map((item, index) => {
    return {

    };
  });
};

export default class ProdAdd extends Component {
  static displayName = 'Filter';

  constructor(props) {
    super(props);
    this.state = {
      dataSource: generatorData(),
    };
  }
 
  //列表编辑删除
  renderOperator = (value, index, record) => {
    return (
      <div>
        <button
          style={styles.removeBtn}
        >
          编辑
        </button>
        <button
          style={styles.removeBtn}
          onClick={this.deleteItem.bind(this, record)}
        >
          删除
        </button>
      </div>
    );
  };
  // 删除一列
  deleteItem = (index) => {
    this.state.dataSource.splice(index, 1);
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  // 额度期限设置表格操作内容
  renderOperation = (value, index) => {
    return (
      <button onClick={this.deleteItem.bind(this, index)} shape="text" className="deleteBtn">
        删除
      </button>
    );
  };
  // 利率设置 表格内容
  renderText = () => {
    return (
      <Select
        name="size"
        placeholder="请选择"
        style={styles.filterTool}
      >
        <Option value="option1">集团A/经销商A/展厅A</Option>
        <Option value="option2">集团B/经销商B</Option>
        <Option value="option3">集团A/经销商A</Option>
      </Select>
    )
  };

  changeDataSource = (index, valueKey, value) => {
    this.state.dataSource[index][valueKey] = value;
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  // renderEditor = (valueKey, value, index, record) => {
  //   return (
  //     <CellEditor
  //       valueKey={valueKey}
  //       index={index}
  //       value={record[valueKey]}
  //       onChange={this.changeDataSource}
  //     />
  //   );
  // };

  addNewItem = () => {
    this.state.dataSource.push({
      todo: '暂无',
      memo: '暂无',
      validity: '暂无',
    });
    this.setState({
      dataSource: this.state.dataSource,
    });
  };

  render() {
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <div className="pch-breadcrumb">
            <span className="layui-breadcrumb">
              <a>平常金服</a>
              <span className="lay-separator">/</span>
              <a>产品管理</a>
              <span className="lay-separator">/</span>
              <a>
                <cite>产品新增</cite>
              </a>
            </span>
          </div>
          <IceContainer>
            <legend className="legend">
              <span className="legLine"></span>基本信息
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>产品编号</label>
                  <IceFormBinder
                    name="productCode"
                  >
                    <Input placeholder="产品编号" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>产品名称</label>
                  <IceFormBinder
                    name="prodName"
                  >
                    <Input placeholder="产品编号" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>合同显示名称</label>
                  <IceFormBinder
                    name="pritName"
                  >
                    <Input placeholder="合同显示名称" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>产品类型</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">新车贷款</Option>
                      <Option value="option2">二手车贷款</Option>
                      <Option value="option3">车抵贷贷款</Option>
                      <Option value="option4">附加费贷款</Option>
                      <Option value="option5">保费贷</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>业务表单</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">新车贷款表单</Option>
                      <Option value="option2">二手车贷款表单</Option>
                      <Option value="option3">车抵贷贷款表单</Option>
                      <Option value="option4">通用表单</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>资料收取清单</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">车抵贷</Option>
                      <Option value="option2">新车贷</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><span className="label-required">*</span>生效日期</label>
                  <IceFormBinder
                    valueFormatter={(date, strValue) => {
                      return strValue;
                    }}
                  >
                    <DatePicker name="startTime" style={styles.filterTool} />
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>允许贴息</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">是</Option>
                      <Option value="option2">否</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>状态</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">生效</Option>
                      <Option value="option2">未生效</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>尾款产品</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">是</Option>
                      <Option value="option2">否</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>贷款用途</label>
                  <Checkbox id="buyCar" defaultChecked={true} />
                  <label htmlFor="buyCar" className="next-checkbox-label">
                    自用购车
                    </label>
                  <Checkbox id="Consume" />
                  <label htmlFor="Consume" className="next-checkbox-label">
                    消费性
                    </label>
                  <label>
                    <Checkbox id="Operate" />
                    <span className="next-checkbox-label">经营性</span>
                  </label>
                </Col>
              </Row>
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>担保方式</label>
                  <Checkbox id="Credit" defaultChecked={true} />
                  <label htmlFor="Credit" className="next-checkbox-label">
                    信用
                    </label>
                  <Checkbox id="Mortgage" />
                  <label htmlFor="Mortgage" className="next-checkbox-label">
                    抵押
                    </label>
                  <label>
                    <Checkbox id="Pledge" />
                    <span htmlFor="Pledge" className="next-checkbox-label">质押</span>
                  </label>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>支付方式</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">受托支付</Option>
                      <Option value="option2">自助支付</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <Row wrap>
                <label style={styles.filterTitle}>产品描述</label>
                <textarea rows="4" cols="120"> </textarea>
              </Row>
            </div>
            <legend className="legend">
              <span className="legLine"></span>额度期限设置
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>贷款期限变更</label>
                  <Checkbox id="Allow_Delay" defaultChecked={true} />
                  <label htmlFor="Allow_Delay" className="next-checkbox-label">
                    允许延长
                    </label>
                  <Checkbox id="Allow_Press" />
                  <label htmlFor="Allow_Press" className="next-checkbox-label">
                    允许压缩
                    </label>
                  <label>
                    <Checkbox id="Not_Allow_Change" />
                    <span htmlFor="Not_Allow_Change" className="next-checkbox-label">不允许变更</span>
                  </label>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>申请金额范围(元)</label>
                  <IceFormBinder
                    name="pritName"
                  >
                    <Input style={{ width: '95px' }} />
                  </IceFormBinder>
                  <IceFormError name="name" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="pritName"
                  >
                    <Input style={{ width: '95px' }} />

                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>期限范围(月)</label>
                  <IceFormBinder
                    name="pritName"
                  >
                    <Input style={{ width: '95px' }} />
                  </IceFormBinder>
                  <IceFormError name="name" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="pritName"
                  >
                    <Input style={{ width: '95px' }} />

                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>贷款比率(%)</label>
                  <IceFormBinder
                    name="pritName"
                  >
                    <Input style={{ width: '95px' }} />
                  </IceFormBinder>
                  <IceFormError name="name" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="pritName"
                  >
                    <Input style={{ width: '95px' }} />

                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <div className="table-title">产品成数设置</div>
              <Table
                dataSource={this.state.dataSource}
                hasHeader
                className="table"
              >
                {/* <Table.Column  title="产品成数设置" /> */}
                <Table.Column title="最小期限(月)" />
                <Table.Column title="最大成数(%)" />
                <Table.Column title="最小成数(%)" />
                <Table.Column title="最大期限(月)" />
                <Table.Column title="操作" width={80}  />
              </Table>
              <div style={styles.addNew}>
                <Button onClick={this.addNewItem} style={styles.addNewItem}>新增一行</Button>
              </div>
            </div>

            <legend className="legend">
              <span className="legLine"></span>利率设置
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>贷款利率变更</label>
                  <Checkbox id="Allow_Change_Rate_Adjust" defaultChecked={true} />
                  <label htmlFor="Allow_Change_Rate_Adjust" className="next-checkbox-label">允许变更利率调整方式</label>
                  <Checkbox id="Allow_Change_Rate_float" />
                  <label htmlFor="Allow_Change_Rate_float" className="next-checkbox-label">允许变更利率浮动率 </label>
                  <label>
                    <Checkbox id="Not_Allow_Change_Account" />
                    <span htmlFor="Not_Allow_Change_Account" className="next-checkbox-label">不允许贷款利率变更</span>
                  </label>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>定价利率规则</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">产品定价</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>利率模式</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">固定利率</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>执行年利率范围(%)</label>
                  <IceFormBinder
                    name="pritName"
                  >
                    <Input style={{ width: '95px' }} />
                  </IceFormBinder>
                  <IceFormError name="name" />
                  <div className="lx-mid-line">—</div>
                  <IceFormBinder
                    name="pritName"
                  >
                    <Input style={{ width: '95px' }} />

                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>利率基准日
                  </label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">出账日</Option>
                      <Option value="option2">合同签订日</Option>

                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <div className="table-title">产品利率设置</div>
              <Table
                dataSource={this.state.dataSource}
                hasHeader
                className="table"
              >
                <Table.Column title="渠道" width={280} cell={this.renderText} />
                <Table.Column title="最小执行年利率(%)" />
                <Table.Column title="最大执行年利率(%)" />
                <Table.Column title="操作" width={80} cell={this.renderOperation} />
              </Table>
              <div style={styles.addNew}>
                <Button onClick={this.addNewItem} style={styles.addNewItem}>新增一行</Button>
              </div>
            </div>

            <legend className="legend">
              <span className="legLine"></span>还款设置
            </legend>
            <div className="f-box">
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>还款账户变更</label>
                  <Checkbox id="Allow_Change_Account" defaultChecked={true} />
                  <label htmlFor="Allow_Change_Account" className="next-checkbox-label">允许变更贷款还款账户</label>
                  <Checkbox id="Allow_Change_Rate_float" />
                  <label htmlFor="Allow_Change_Rate_float" className="next-checkbox-label">允许变更授信还款账户 </label>
                  <label>
                    <Checkbox id="Not_Allow_Change_Account" />
                    <span htmlFor="Not_Allow_Change_Account" className="next-checkbox-label">不允许还款账户变更</span>
                  </label>
                </Col>
              </Row>
              <Row wrap>
                <Col style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>还款周期</label>
                  <Checkbox id="Allow_Change_Account" />
                  <label htmlFor="Allow_Change_Account" className="next-checkbox-label">全选</label>
                  <Checkbox id="Month" defaultChecked={true} />
                  <label htmlFor="Month" className="next-checkbox-label">按月</label>
                  <label>
                    <Checkbox id="Season" />
                    <span htmlFor="Season" className="next-checkbox-label">按季</span>
                  </label>
                  <label>
                    <Checkbox id="Year" />
                    <span htmlFor="Year" className="next-checkbox-label">按年</span>
                  </label>
                  <label>
                    <Checkbox id="Once" />
                    <span htmlFor="Once" className="next-checkbox-label">一次</span>
                  </label>
                  <label>
                    <Checkbox id="Double_Week" />
                    <span htmlFor="Double_Week" className="next-checkbox-label">按两周</span>
                  </label>
                  <label>
                    <Checkbox id="Half_Year" />
                    <span htmlFor="Half_Year" className="next-checkbox-label">按半年</span>
                  </label>
                </Col>
              </Row>

              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>还款日变更</label>
                <Col style={styles.filterCol}>
                  <RadioGroup value={this.state.value} onChange={this.onChange} >
                    <Radio id="yes" value="yes">
                      允许
                    </Radio>
                    <Radio id="no" value="no" >
                      不允许
                    </Radio>
                  </RadioGroup>
                </Col>
              </Row>
              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>宽限期变更</label>
                <Col style={styles.filterCol}>
                  <RadioGroup value={this.state.value} onChange={this.onChange} defaultValue={"yes"}>
                    <Radio id="yes" value="yes">
                      允许
                    </Radio>
                    <Radio id="no" value="no" >
                      不允许
                    </Radio>
                  </RadioGroup>
                </Col>
              </Row>
              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>还款方式变更</label>
                <Col style={styles.filterCol}>
                  <RadioGroup value={this.state.value} onChange={this.onChange}>
                    <Radio id="yes" value="yes">
                      允许
                    </Radio>
                    <Radio id="no" value="no" >
                      不允许
                    </Radio>
                  </RadioGroup>
                </Col>
              </Row>
              <div className="table-title">还款方式设置</div>
              <Table
                dataSource={this.state.dataSource}
                hasHeader
                className="table"
              >
                <Table.Column title="还款方式" width={280} />
                <Table.Column title="固定金额(元)" />
                <Table.Column title="宽限期期限(天)" />
                <Table.Column title="宽限期失效后还款方式" />
                <Table.Column title="操作" width={80} cell={this.renderOperation} />
              </Table>
              <div style={styles.addNew}>
                <Button onClick={this.addNewItem} style={styles.addNewItem}>新增一行</Button>
              </div>
              <Row wrap>
                <label style={styles.filterTitle}> <span className="label-required">*</span>提前还款</label>
                <Col style={styles.filterCol}>
                  <RadioGroup value={this.state.value} onChange={this.onChange}>
                    <Radio id="yes" value="yes">
                      允许
                    </Radio>
                    <Radio id="no" value="no" >
                      不允许
                    </Radio>
                  </RadioGroup>
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>最小提前还款金额</label>
                  <IceFormBinder
                    name="prepaymentAmountMin"
                  >
                    <Input placeholder="最小提前还款金额" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}><label className="label-required">*</label>早提前还款期数</label>
                  <IceFormBinder
                    name="prepaymentPeriodsLimit"
                  >
                    <Input placeholder="早提前还款期数" />
                  </IceFormBinder>
                  <IceFormError name="name" />
                </Col>
              </Row>
              <Row wrap>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>违约金计算基础</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">按贷款总额</Option>
                      <Option value="option2">按提前还款金额</Option>
                      <Option value="option3">按照剩余本金</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
                <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                  <label style={styles.filterTitle}> <span className="label-required">*</span>违约金计算方式</label>
                  <IceFormBinder>
                    <Select
                      name="size"
                      placeholder="请选择"
                      style={styles.filterTool}
                    >
                      <Option value="option1">按比例</Option>
                    </Select>
                  </IceFormBinder>
                </Col>
              </Row>
              <div className="table-title">提前还款方式设置</div>
              <Table
                dataSource={this.state.dataSource}
                hasHeader
                className="table"
              >
                <Table.Column title="最小期限" width={280} />
                <Table.Column title="最大期限(元)" />
                <Table.Column title="期限单位" />
                <Table.Column title="违约金比例(%)" />
                <Table.Column title="操作" width={80} cell={this.renderOperation} />
              </Table>
              <div style={styles.addNew}>
                <Button onClick={this.addNewItem} style={styles.addNewItem}>新增一行</Button>
              </div>
              <div className="next-btn-box">
                <div className="next-btn-lx">下一步</div>
              </div>
            </div>
          </IceContainer>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  filterTitle: {
    width: '140px',
    textAlign: 'right',
    marginRight: '12px',
    fontSize: '14px',
  },

  filterTool: {
    width: '200px',
  },
  addNew: {
    marginTop: '10px',
    textAlign: 'right',
  },
  addNewItem: {
    hiegth: '30px',
    borderRadius: 0,
    border: 'none',
    background: '#ec9d00',
    color: '#fff',
  },
  batchBtn: {
    // marginRight: '10px',
    float: 'none',
  },
  removeBtn: {
    marginLeft: 10,
    border: 'none',
    background: '#ec9d00',
    color: '#fff',

  },
  pagination: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
