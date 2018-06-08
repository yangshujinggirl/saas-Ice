import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Req from '../../../reqs/ProductReq'
import {
      Form, Input, Button, Checkbox, Select, DatePicker, Switch, Radio, Grid, Field, Dialog,
      Table, Transfer, Feedback, Pagination
} from '@icedesign/base';
import IceContainer from '@icedesign/container';
import { Title, PchTable, PchPagination } from 'components';

// import CellEditor from './CellEditor';
// form binder 详细用法请参见官方文档
import {
      FormBinderWrapper as IceFormBinderWrapper,
      FormBinder as IceFormBinder,
      FormError as IceFormError,
} from '@icedesign/form-binder';


import './addThree.scss';
const { Row, Col } = Grid;
const { Option } = Select;

const FormItem = Form.Item;
const formItemLayout = {
      labelCol: { span: 8 }
};
const formItemLayout2 = {
   labelCol: { span: 2 }
};
let arrayRightData = []
export default class addThree extends Component {
      static displayName = 'addThree';

      constructor(props) {
            super(props);
            this.state = {
                  value: {},
                  show: false,
                  processList: [],
                  processDefId: '',//流程名称的Id
                  processData: [],
                  dataSourceRight: [],
                  selectedRowKeys: [],
                  selectedRowOne: [],
                  templateList: {},
                  templateData: []
            };

            this.rowSelection = {
                  onChange: (selectedRowKeys, records) => {
                        arrayRightData = [...records];
                        arrayRightData.push(...this.state.dataSourceRight)
                        this.setState({
                              selectedRowKeys: selectedRowKeys,
                        });
                  },
                  // 全选表格时触发的回调
                  onSelectAll: (selected, records) => {
                  },
            }
      }
      componentWillMount() {
            let { actions, params, formData } = this.props;
            let { product = {} } = formData;
            //产品详情
            if (params.id) {
                  actions.getDetail(params.id)
            }
            //流程名称获取
            Req._processList({ tenantId: product.tenantId }).then((data) => {
                  let temp = this.state.processList;
                  temp = data.data.list;
                  this.setState({ processList: temp }, function () { });
            })
            //合同模板
            Req.getContractTemplateList().then((data) => {
                  this.setState({
                        templateList: data.data
                  })
            })
      }

      //点击分页
      changePage = (currentPage) => {
            Req.getContractTemplateList({ page: currentPage }).then((data) => {
                  this.setState({
                        templateList: data.data
                  })
            })
      }
      //产品类型
      productTypeChange(type) {
            switch (type) {
                  case '新车贷款':
                  case 'NEW_CAR_LOAN':
                        return 'NEW_CAR_LOAN';
                        break;
                  case '新车租赁':
                  case 'NEW_CAR_RENTAL':
                        return 'NEW_CAR_RENTAL';
                        break;
                  case '二手车贷款':
                  case 'SECONDHAND_CAR_LOAN':
                        return 'SECONDHAND_CAR_LOAN';
                        break;
                  case '二手车租赁':
                  case 'SECONDHAND_CAR_RENTAL':
                        return 'SECONDHAND_CAR_RENTAL';
                        break;
                  case '汽车抵押贷款':
                  case 'CAR_MORTGAGE_LOAN':
                        return 'CAR_MORTGAGE_LOAN';
                        break;
                  case '消费贷款':
                  case 'CONSUMER_LOAN':
                        return 'CONSUMER_LOAN';
                        break;
            }
      }
      //合同模板id
      contractTemplateIds(data) {
            let id = [];
            data.map((item, i) => {
                  id.push(item.id)
            })
            return id;
      }
      onsubmit = () => {
            let { actions, params, formData } = this.props;
            let { product = {} } = formData
            let id = params.id;
            this.formRef.validateAll((error, value) => {
                  this.state.processData = [
                        {
                              productId: product.id,
                              productName: product.name,
                              productType: this.productTypeChange(product.productType),
                              productCode: product.productCode,
                              processDefId: value.processName,
                              status: product.status,
                              businessTypeId: 1,
                              businessTypeName: "车贷业务",
                              tenantId: product.tenantId,
                              tenantName: "中行"
                        }
                  ]

                  this.state.templateData = {
                        productCode: product.productCode,
                        productCategory: this.productTypeChange(product.productType),
                        productName: product.name,
                        contractTemplateIds: this.contractTemplateIds(this.state.dataSourceRight)
                  }

                  if (error) {
                        return;
                  }
                  //Req
                  if (product.status == 1) {
                        if (!value.processName) {
                              return Req.tipError('流程名称未选择，产品不能生效')
                        }
                  }
                  //提交当前填写的数据
                  this.props.actions.saveProductAdd(id, this.state.processData, value.processName || 0, this.state.templateData);
                  this.setState({
                        processData: []
                  })
            });
      }

      onFormChange = (value) => {
            this.setState({
                  value
            })
      }
      //流程名称的id值
      onChangeProcess(value) {
            this.setState({
                  processDefId: value,
                  show: true
            })
      }
      //新增流程
      handleSubmitAddnew() {
            hashHistory.push('/process/add');
      }
      //流程详情
      handleSubmitDetail() {
            let id = this.state.processDefId;
            if (id) {
                  hashHistory.push(`/process/detail/${id}`)
            }

      }

      //左侧 名称
      renderName(value, index, record) {
            return record.templateName
      }
      //删除
      deleteEvent(index) {
            const { dataSourceRight } = this.state;
            dataSourceRight.splice(index, 1)
            this.setState({
                  dataSourceRight
            })
      }
      //右侧增加数据
      addItem() {
            let { params } = this.props;
            let { dataSourceRight } = this.state;

            for (var i = 0; i < arrayRightData.length - 1; i++) {
                  for (var j = i + 1; j < arrayRightData.length; j++) {
                        if (arrayRightData[i].id == arrayRightData[j].id) {
                              arrayRightData.splice(j, 1)
                        }
                  }
            }
            this.setState({
                  dataSourceRight: arrayRightData
            })
      }
      renderOperation(value, index, record) {
            return (
                  <Button type='normal' shape="text" onClick={() => this.deleteEvent(index)}>
                        删除
        </Button>
            );
      }
      render() {
            let { formData } = this.props;
            let { product = {} } = formData;
            let { templateList, dataSourceRight } = this.state
            return (
                  <IceFormBinderWrapper
                        ref={(formRef) => {
                              this.formRef = formRef;
                        }}
                        value={this.state.value}
                        onChange={this.onFormChange}
                  >
                        <div>
                              <IceContainer>
                                    <div className="pch-condition form ">
                                          <Form
                                                size="large" direction="hoz">
                                                <Title title="流程配置" />
                                                <div className="pch-form">
                                                      <Row wrap >
                                                            <Col xxs={24} xs={12} l={8} xl={6}>
                                                                  <FormItem {...formItemLayout} label="业务类型：">
                                                                        <label className="process-lable">车贷业务</label>
                                                                  </FormItem>
                                                            </Col>
                                                            <Col xxs={24} xs={12} l={8} xl={6}>
                                                                  <FormItem {...formItemLayout} label="资方：">
                                                                        <IceFormBinder name="tenantId">
                                                                              <label className="process-lable">中国银行</label>
                                                                        </IceFormBinder>
                                                                  </FormItem>
                                                            </Col>
                                                            <Col xxs={24} xs={12} l={8} xl={6}>
                                                                  <FormItem {...formItemLayout} label="产品类型：">
                                                                        <IceFormBinder name="prodType" >
                                                                              <label className="process-lable">{product.productType}</label>
                                                                        </IceFormBinder>
                                                                  </FormItem>
                                                            </Col>

                                                      </Row>
                                                      <Row wrap>
                                                            
                                                                  <FormItem {...formItemLayout2} label="产品名称：">
                                                                        <IceFormBinder name="prodName" >
                                                                              <label className="process-lable process-labe-width">{product.name}</label>
                                                                        </IceFormBinder>
                                                                  </FormItem>
                                                      </Row>
                                                      <div className="pc-form-line">
                                                            <Row wrap>
                                                                  <Col xxs={24} xs={12} l={8} xl={6}>
                                                                        <FormItem {...formItemLayout} label="流程名称：">
                                                                              <IceFormBinder name="processName">
                                                                                    <Select
                                                                                          size="large"
                                                                                          placeholder="请选择"
                                                                                          className="select"
                                                                                          onChange={this.onChangeProcess.bind(this)}
                                                                                    >
                                                                                          {
                                                                                                this.state.processList.map((item, i) => {
                                                                                                      return (
                                                                                                            <Option value={item.id.toString()} key={i}>{item.processName}</Option>
                                                                                                      )
                                                                                                })
                                                                                          }
                                                                                    </Select>
                                                                              </IceFormBinder>
                                                                        </FormItem>
                                                                  </Col>
                                                                  <Col xxs={24} xs={12} l={8} xl={6}>
                                                                        <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate">
                                                                              <Button onClick={this.handleSubmitAddnew.bind(this)} type="secondary" style={{ 'background': '#1AA8F0' }}>
                                                                                    新增流程
                                    </Button>
                                                                        </FormItem>
                                                                  </Col>
                                                                  <Col xxs={24} xs={12} l={8} xl={6} style={{ display: this.state.show == true ? '' : 'none' }}>
                                                                        <FormItem {...formItemLayout} label="&nbsp;" className="pch-condition-operate" >
                                                                              <a onClick={this.handleSubmitDetail.bind(this)} type="secondary" className="addThree-detail-btn">
                                                                                    查看流程详情
                                    </a>
                                                                        </FormItem>
                                                                  </Col>
                                                            </Row>

                                                      </div>
                                                </div>
                                                <Title title="合同模板" />
                                                <div className="pch-form edit-permission-dialog-contents">
                                                      <div className="table-list">
                                                            <div className="part-l">
                                                                  <p>
                                                                        查询结果
                            </p>
                                                                  <Table dataSource={templateList.list} style={{ width: '100%', marginBottom: '20px' }}
                                                                        isTree rowSelection={{
                                                                              ...this.rowSelection,
                                                                              selectedRowKeys: this.state.selectedRowKeys
                                                                        }}>
                                                                        <Table.Column title="合同模板名称" cell={this.renderName} />
                                                                  </Table>
                                                                  <Pagination
                                                                        current={templateList.page}
                                                                        pageSize={templateList.limit}
                                                                        total={templateList.total}
                                                                        onChange={this.changePage}
                                                                        shape="arrow-only"
                                                                  />
                                                            </div>
                                                            <div className="btn-wrap">
                                                                  <Button className="add-btn" onClick={() => this.addItem()}>
                                                                        >>
                            </Button>
                                                            </div>
                                                            <div className="part-r">
                                                                  <p>
                                                                        已选产品
                            </p>
                                                                  <Table dataSource={dataSourceRight} style={{ width: '100%' }}
                                                                        maxBodyHeight={370}>
                                                                        <Table.Column title="合同模板名称" dataIndex="templateName" />
                                                                        <Table.Column title="操作" cell={this.renderOperation.bind(this)} />
                                                                  </Table>
                                                            </div>
                                                      </div>
                                                </div>

                                                <div className="next-btn-box">
                                                      <Button type="secondary" size="large" onClick={this.onsubmit}>保存</Button>
                                                </div>
                                          </Form>
                                    </div>
                              </IceContainer>
                        </div>
                  </IceFormBinderWrapper>
            );
      }
}
