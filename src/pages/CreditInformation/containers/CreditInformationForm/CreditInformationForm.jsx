import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';

import { Form, Icon, Input, Button, Checkbox, Select, Switch, Radio, Grid, Field, Dialog, Upload } from '@icedesign/base';

const {Row, Col} = Grid;
const { DragUpload } = Upload;
const FormItem = Form.Item;

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';
import  './CreditInformationForm.scss'

const formItemLayout = {
  labelCol: {
    span: 6
  },
  wrapperCol: {
    span: 14
  }
};

export default class CreditInformationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          value :{}
        };
        this.field = new Field(this);
    }

    /**
     * 初始化
     */
    componentDidMount() {
        let {actions, params} = this.props;

        if (params.id) {
            //actions.getDetail(params.id);
        }
    }

    //表单校验change
    formChange = value => {
        this.props.formData = value;
    }

    //保存
    handleSave = () => {

    }

    //提交
    handleSubmit = () => {
        this.refs.form.validateAll((errors, values) => {
            console.log('errors', errors, 'values', values);
            return false;
        });
    }

    // 取消
    handleCancel() {}

    /**
     * 渲染
     */
    render() {
        let {formData = {}} = this.props;
        const { init, getError, getState } = this.field;

        return (
            <IceContainer className="pch-container report">
                    <Title title="人行报告" />
                    <div >
                      <DragUpload
                      className='upload-picture'
                      listType="picture-card"
                      action="/loanApi/file/upload"
                      data={{'path':'path/to/file'}}
                      defaultFileList={[
                        {
                          name: "IMG.png",
                          status: "done",
                          size: 1024,
                          downloadURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                          fileURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                          imgURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
                        },
                        {
                          name: "IMG.png",
                          status: "done",
                          size: 1024,
                          downloadURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                          fileURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
                          imgURL:
                            "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
                        }
                      ]}
                      // onDragOver={onDragOver}
                      // onDrop={onDrop}
                    />
                      <Form>
                        <Row>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>最小提前还款金额:</span>}>
                              <IceFormBinder
                                name="prepaymentAmountMin"
                                required
                                validator={this.prepaymentAmountMinChange}

                              >
                                <Input size="large" placeholder="最小提前还款金额" className="custom-input" />
                              </IceFormBinder>
                              {/*<div> <IceFormError name="prepaymentAmountMin" /></div>*/}
                            </FormItem>
                          </Col>
                          <Col xxs={24} xs={12} l={8} >
                            <FormItem {...formItemLayout} label={<span> <span className="label-required">*</span>最早提前还款期数:</span>}>
                              <IceFormBinder
                                name="prepaymentPeriodsLimit"
                                required
                                validator={this.prepaymentPeriodsLimitChange}
                              >

                                <Input size="large" placeholder="最早提前还款期数" className="custom-input" />
                              </IceFormBinder>
                              {/*<div><IceFormError name="prepaymentPeriodsLimit" /></div>*/}
                            </FormItem>
                          </Col>
                        </Row>

                      </Form>
                    <IceFormBinderWrapper value={formData} onBlur={this.formChange} ref="form">
                        <Form size="large" labelAlign="left">
                            <div className="next-btn-box pch-form-buttons">
                                <Button type="normal" size="large" onClick={this.handleCancel}>
                                    返回
                                </Button>
                                <Button type="primary" size="large" onClick={this.handleSave}>
                                    保存
                                </Button>
                                <Button type="secondary" size="large" onClick={this.handleSubmit}>
                                    提交
                                </Button>
                            </div>
                        </Form>
                    </IceFormBinderWrapper>
                </div>
            </IceContainer>
            );
    }
}
