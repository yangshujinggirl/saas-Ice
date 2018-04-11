import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import Req from '../../../reqs/ProductReq'
import {
  Form, Input, Button, Checkbox, Select, DatePicker, Switch, Radio, Grid, Field, Dialog,
  Table, Transfer,
} from '@icedesign/base';

import IceContainer from '@icedesign/container';
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
export default class addThree extends Component {
  static displayName = 'addThree';

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      list: []

    };
  }
  componentDidMount() {
    let { actions, htmlData } = this.props
    Req.htmlName({ limit: 999 }).then((data) => {
      let html = this.state.list
      html = data.data.list
      this.setState({ list: html }, function () {
      })
    });


  }

  onsubmit = () => {
    let { actions, params } = this.props;
    let id = params.id;
    this.formRef.validateAll((error, value) => {
      console.log('error', error, 'value', value);
      if (error) {
        return;
      }


      // 提交当前填写的数据
      this.props.actions.prodHtmlSave(value, id);
    });
  }

  onFormChange = (value) => {
    this.setState({
      value
    })
  }

  render() {
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
            <legend className="pch-legend">
              <span className="pch-legend-legline"></span>页面名称
            </legend>
            <div className="pch-form">
              <Form
                size="large"
                labelAlign="left">
                <div className="pch-form">
                  <Row wrap>
                    <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                      <FormItem {...formItemLayout} label={<span><span className="label-required">*</span>页面名称:</span>}>
                        <IceFormBinder
                          name="id"
                        >
                          <Select
                            size="large"
                            style={styles.filterTool}
                            className="custom-select"
                            placeholder="请选择"
                            message="页面名称必填"
                            required
                          >
                            {
                              this.state.list.map((item, i) => {
                                return (
                                  <Option value={item.id} key={i}>{item.name}</Option>
                                )
                              })
                            }

                          </Select>
                        </IceFormBinder>
                        <div><IceFormError name="id" /></div>
                      </FormItem>
                    </Col>
                  </Row>
                </div>
                <div style={{ height: '500px' }}></div>
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
const styles = {
  filterTool: {
    width: '200px',
  },
  filterCol: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },

  btns: {
    width: '90px',
    height: '30px',
    lineHeight: '30px',
    border: 'none',
    fontSize: '16px',
    borderRadius: 'none !important',
    background: '#ec9d00',
    color: '#fff',
    marginLeft: '20px'

  },
};
