import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select } from '@icedesign/base';
import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';


// import RichEditor from './RichEditor';
import  './basicInfo.scss'

const { Row, Col } = Grid;
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};
export default class BasicInformation extends Component {
  static displayName = 'BasicInformation';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
    };
  }
  toggleComponent(){
    this.props.toggleComponent('ConfigInformation');
  }

  formChange = (value) => {
    console.log('value', value);
    this.setState({
      value,
    });
  };


  //下一步
  next = (event) =>{
    event.preventDefault()
  }

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }

      // ajax values
    });
  };

  render() {
    return (
      <div className="content-editor">
        <IceFormBinderWrapper
          ref={(refInstance) => {
            this.postForm = refInstance;
          }}
          value={this.state.value}
          onChange={this.formChange}
        >
          <IceContainer title="车贷申请" className='subtitle'>
            <Form labelAlign="left" style={styles.form}>
              <Row  align="center" >
                <Col sxxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'展厅名称'} required>
                    <Select style={styles.select}>
                      <div value="small">small</div>
                      <div value="medium">medium</div>
                      <div value="large">large</div>
                    </Select>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'展厅级别'} required>
                    <Select style={styles.select}>
                      <div value="small">small</div>
                      <div value="medium">medium</div>
                      <div value="large">large</div>
                    </Select>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'展厅层级'} required>
                    <Select style={styles.select}>
                      <div value="small">small</div>
                      <div value="medium">medium</div>
                      <div value="large">large</div>
                    </Select>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'展厅类型'} required>
                    <Select style={styles.select}>
                      <div value="small">small</div>
                      <div value="medium">medium</div>
                      <div value="large">large</div>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row  align="center" >
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'开户银行'} required>
                    <Select style={styles.select}>
                      <div value="small">small</div>
                      <div value="medium">medium</div>
                      <div value="large">large</div>
                    </Select>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'所属支行'} required>
                    <Select style={styles.select}>
                      <div value="身份证">身份证</div>
                      <div value="户口簿">户口簿</div>
                      <div value="中国护照">中国护照</div>
                      <div value="士兵证">士兵证</div>
                      <div value="港澳居民往来内地通行证">港澳居民往来内地通行证</div>
                      <div value="台湾同胞往来内地通行证">台湾同胞往来内地通行证</div>
                      <div value="临时身份证">临时身份证</div>
                      <div value="外国人居留证">外国人居留证</div>
                      <div value="警官证">警官证</div>
                      <div value="军人文职干部证">军人文职干部证</div>
                      <div value="武警士兵证">武警士兵证</div>
                      <div value="武警文职干部证">武警文职干部证</div>
                      <div value="外国护照">外国护照</div>
                      <div value="营业执照">营业执照</div>
                      <div value="组织机构代码证">组织机构代码证</div>
                      <div value="其他个人证件">其他个人证件</div>
                    </Select>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'户名'} required>
                    <Select style={styles.select}>
                      <div value="身份证">身份证</div>
                      <div value="户口簿">户口簿</div>
                      <div value="中国护照">中国护照</div>
                      <div value="士兵证">士兵证</div>
                      <div value="港澳居民往来内地通行证">港澳居民往来内地通行证</div>
                      <div value="台湾同胞往来内地通行证">台湾同胞往来内地通行证</div>
                      <div value="临时身份证">临时身份证</div>
                      <div value="外国人居留证">外国人居留证</div>
                      <div value="警官证">警官证</div>
                      <div value="军人文职干部证">军人文职干部证</div>
                      <div value="武警士兵证">武警士兵证</div>
                      <div value="武警文职干部证">武警文职干部证</div>
                      <div value="外国护照">外国护照</div>
                      <div value="营业执照">营业执照</div>
                      <div value="组织机构代码证">组织机构代码证</div>
                      <div value="其他个人证件">其他个人证件</div>
                    </Select>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'收款账号'} required>
                    <Select style={styles.select}>
                      <div value="身份证">身份证</div>
                      <div value="户口簿">户口簿</div>
                      <div value="中国护照">中国护照</div>
                      <div value="士兵证">士兵证</div>
                      <div value="港澳居民往来内地通行证">港澳居民往来内地通行证</div>
                      <div value="台湾同胞往来内地通行证">台湾同胞往来内地通行证</div>
                      <div value="临时身份证">临时身份证</div>
                      <div value="外国人居留证">外国人居留证</div>
                      <div value="警官证">警官证</div>
                      <div value="军人文职干部证">军人文职干部证</div>
                      <div value="武警士兵证">武警士兵证</div>
                      <div value="武警文职干部证">武警文职干部证</div>
                      <div value="外国护照">外国护照</div>
                      <div value="营业执照">营业执照</div>
                      <div value="组织机构代码证">组织机构代码证</div>
                      <div value="其他个人证件">其他个人证件</div>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row  align="center" >
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'主贷人姓名'} required>
                    <Input placeholder="请输入主贷人姓名" style={styles.select}/>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'证件类型'} required>
                    <Select style={styles.select}>
                      <div value="身份证">身份证</div>
                      <div value="户口簿">户口簿</div>
                      <div value="中国护照">中国护照</div>
                      <div value="士兵证">士兵证</div>
                      <div value="港澳居民往来内地通行证">港澳居民往来内地通行证</div>
                      <div value="台湾同胞往来内地通行证">台湾同胞往来内地通行证</div>
                      <div value="临时身份证">临时身份证</div>
                      <div value="外国人居留证">外国人居留证</div>
                      <div value="警官证">警官证</div>
                      <div value="军人文职干部证">军人文职干部证</div>
                      <div value="武警士兵证">武警士兵证</div>
                      <div value="武警文职干部证">武警文职干部证</div>
                      <div value="外国护照">外国护照</div>
                      <div value="营业执照">营业执照</div>
                      <div value="组织机构代码证">组织机构代码证</div>
                      <div value="其他个人证件">其他个人证件</div>
                    </Select>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'证件号码'} required>
                    <Input placeholder="请输入证件号码" style={styles.select}/>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'手机号码'} required>
                    <Input placeholder="请输入手机号码" style={styles.select}/>
                  </FormItem>
                </Col>
              </Row>
              <Row  align="center" >
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'申请金额'} required>
                    <Input placeholder="请输入申请金额" style={styles.select}/>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'申请期限'} required>
                    <Input placeholder="请输入申请期限（月）" style={styles.select}/>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'产品类型'} required>
                    <Select style={styles.select}>
                      <div value="身份证">身份证</div>
                      <div value="户口簿">户口簿</div>
                      <div value="中国护照">中国护照</div>
                      <div value="士兵证">士兵证</div>
                      <div value="港澳居民往来内地通行证">港澳居民往来内地通行证</div>
                      <div value="台湾同胞往来内地通行证">台湾同胞往来内地通行证</div>
                      <div value="临时身份证">临时身份证</div>
                      <div value="外国人居留证">外国人居留证</div>
                      <div value="警官证">警官证</div>
                      <div value="军人文职干部证">军人文职干部证</div>
                      <div value="武警士兵证">武警士兵证</div>
                      <div value="武警文职干部证">武警文职干部证</div>
                      <div value="外国护照">外国护照</div>
                      <div value="营业执照">营业执照</div>
                      <div value="组织机构代码证">组织机构代码证</div>
                      <div value="其他个人证件">其他个人证件</div>
                    </Select>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'产品名称'} required>
                    <Select style={styles.select}>
                      <div value="身份证">身份证</div>
                      <div value="户口簿">户口簿</div>
                      <div value="中国护照">中国护照</div>
                      <div value="士兵证">士兵证</div>
                      <div value="港澳居民往来内地通行证">港澳居民往来内地通行证</div>
                      <div value="台湾同胞往来内地通行证">台湾同胞往来内地通行证</div>
                      <div value="临时身份证">临时身份证</div>
                      <div value="外国人居留证">外国人居留证</div>
                      <div value="警官证">警官证</div>
                      <div value="军人文职干部证">军人文职干部证</div>
                      <div value="武警士兵证">武警士兵证</div>
                      <div value="武警文职干部证">武警文职干部证</div>
                      <div value="外国护照">外国护照</div>
                      <div value="营业执照">营业执照</div>
                      <div value="组织机构代码证">组织机构代码证</div>
                      <div value="其他个人证件">其他个人证件</div>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row  align="center" >
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'还款周期'} required>
                    <Select style={styles.select}>
                      <div value="身份证">身份证</div>
                      <div value="户口簿">户口簿</div>
                      <div value="中国护照">中国护照</div>
                      <div value="士兵证">士兵证</div>
                      <div value="港澳居民往来内地通行证">港澳居民往来内地通行证</div>
                      <div value="台湾同胞往来内地通行证">台湾同胞往来内地通行证</div>
                      <div value="临时身份证">临时身份证</div>
                      <div value="外国人居留证">外国人居留证</div>
                      <div value="警官证">警官证</div>
                      <div value="军人文职干部证">军人文职干部证</div>
                      <div value="武警士兵证">武警士兵证</div>
                      <div value="武警文职干部证">武警文职干部证</div>
                      <div value="外国护照">外国护照</div>
                      <div value="营业执照">营业执照</div>
                      <div value="组织机构代码证">组织机构代码证</div>
                      <div value="其他个人证件">其他个人证件</div>
                    </Select>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'支付方式'} required>
                    <Select style={styles.select}>
                      <div value="身份证">身份证</div>
                      <div value="户口簿">户口簿</div>
                      <div value="中国护照">中国护照</div>
                      <div value="士兵证">士兵证</div>
                      <div value="港澳居民往来内地通行证">港澳居民往来内地通行证</div>
                      <div value="台湾同胞往来内地通行证">台湾同胞往来内地通行证</div>
                      <div value="临时身份证">临时身份证</div>
                      <div value="外国人居留证">外国人居留证</div>
                      <div value="警官证">警官证</div>
                      <div value="军人文职干部证">军人文职干部证</div>
                      <div value="武警士兵证">武警士兵证</div>
                      <div value="武警文职干部证">武警文职干部证</div>
                      <div value="外国护照">外国护照</div>
                      <div value="营业执照">营业执照</div>
                      <div value="组织机构代码证">组织机构代码证</div>
                      <div value="其他个人证件">其他个人证件</div>
                    </Select>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'执行利率'} required>
                    <Input placeholder='请输入执行利率' style={styles.select}/>
                  </FormItem>
                </Col>
                <Col xxs={24} xs={12} l={6}>
                  <FormItem {...formItemLayout} label={'还款方式'} required>
                    <Select style={styles.select}>
                      <div value="身份证">身份证</div>
                      <div value="户口簿">户口簿</div>
                      <div value="中国护照">中国护照</div>
                      <div value="士兵证">士兵证</div>
                      <div value="港澳居民往来内地通行证">港澳居民往来内地通行证</div>
                      <div value="台湾同胞往来内地通行证">台湾同胞往来内地通行证</div>
                      <div value="临时身份证">临时身份证</div>
                      <div value="外国人居留证">外国人居留证</div>
                      <div value="警官证">警官证</div>
                      <div value="军人文职干部证">军人文职干部证</div>
                      <div value="武警士兵证">武警士兵证</div>
                      <div value="武警文职干部证">武警文职干部证</div>
                      <div value="外国护照">外国护照</div>
                      <div value="营业执照">营业执照</div>
                      <div value="组织机构代码证">组织机构代码证</div>
                      <div value="其他个人证件">其他个人证件</div>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row style={{ marginTop: 24 }} >
                <Col offset="10" className ='botton-col'>
                  <Button
                    type="primary" onClick={this.toggleComponent.bind(this)}>
                    下一步
                  </Button>
                </Col>
              </Row>
            </Form>
          </IceContainer>
        </IceFormBinderWrapper>
      </div>
    );
  }
}

const styles = {
  form: {
    marginTop: 30,
  },
  cats: {
    width: '100%',
  },
  botton:{
    backgroundColor :'#FC9E25'
  },
  select:{
    width:'200px'
  }
};
