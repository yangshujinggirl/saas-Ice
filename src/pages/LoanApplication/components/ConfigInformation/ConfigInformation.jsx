import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Grid,
  Form,
  Field,
  Button,
  Select,
  Upload,
  NumberPicker,
  CascaderSelect,
  Radio,
  DatePicker,
  Table,
  Balloon
 } from '@icedesign/base';

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';


import Req from '../../reqs/LoanApplicationReq';
import addressDataSource from '../addressDataSource';

import  './configInfo.scss'

const { Row, Col } = Grid;
const FormItem = Form.Item;
const { DragUpload } = Upload;
const { Group: RadioGroup } = Radio;


const labels =(name)=> (
  <span>
    <Balloon
      type="primary"
      trigger={<span>{name}</span>}
      closable={false}
      triggerType="hover">
      {name}
    </Balloon>
  </span>
);

export default class ConfigInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upLoadList:[],
      loadDetail:[],
      dataSource:[]
    };
    this.field = new Field(this)
  }
  componentWillMount() {
    this.getLoanDetail(this.props.params.id);
    this.getLoanUpload(this.props.params.id);
  }
  //获取进件详情
  getLoanDetail(id) {
    Req.getLoanDetailApi(id)
    .then((res) => {
      const { data } = res;
      const { list } = data;
      this.setState({ loadDetail: list})
    },(error) => {
      console.log(error)
    })
  }
  //获取上传资料列表
  getLoanUpload(id) {
    Req.getLoanUploadApi(id)
    .then((res) => {
      const { data } = res;
      const { list } = data;
      let upLoadList;
      list.map((el)=> upLoadList = el.collectionDetails)
      this.setState({
        upLoadList
      })
    },(error) => {
      console.log(error)
    })
  }

  onChange(file) {
    console.log("onChange callback : ", file);
    console.log("onChange callback : ", file.fileList);
  }

  //提交表单
  handleSubmit(e) {
    e.preventDefault();
    this.field.validate((errors, values) => {
      let parmas = this.field.getValues();
      if (errors) {
        return;
      }
      // this.addLoanApi(parmas)
    });
  }
  render() {
    const { upLoadList, loadDetail } = this.state;
    const { init } = this.field;
    let InputMod = (ele) => {
      switch(ele.type) {
        case 'SELECT':
          return <Select
                    style={styles.select}
                    dataSource={this.state.dataSource}
                    disabled={ele.isFixed? true: false}
                    {...init(ele.name,
                      {'initValue':ele.isFixed? ele.value: ''},
                      { rules:[{ required: true, message: `${ele.label}不能为空` }] }
                    )}>
                    {
                      ele.options && ele.options.map((opt,ide) => (
                        <div value={opt.value} key={ide}>{opt.label}</div>
                      ))
                    }
                  </Select>
        case 'STRING':
          return <Input
                  trim
                  style={styles.select}
                  placeholder={ele.type}
                  htmlType='text'
                  disabled={ele.isFixed? true: false}
                  {...init(ele.name,
                    {'initValue':ele.isFixed? ele.value: ''},
                    { rules:[{ required: true, message:`${ele.label}不能为空` }]}
                  )}
                />
        case 'DECIMAL':
          return <Input
                  trim
                  style={styles.select}
                  hasLimitHint={true}
                  placeholder={ele.type}
                  disabled={ele.isFixed? true: false}
                  htmlType='number'
                  {...init(ele.name,
                    {'initValue':ele.isFixed? ele.value: ''},
                    {
                      rules:[
                        { required: true, message:`${ele.label}不能为空` ,min:2},
                        { validator: this.checkNum }
                      ]
                    }
                  )}
                />
        case 'INT':
          return <NumberPicker
                  disabled={ele.isFixed? true: false}
                  type="inline"
                  step={2}
                  min={1}
                  max={12}
                  {...init(ele.name,
                    {'initValue':ele.isFixed? ele.value: 0},
                    { rules:[{ required: true, message: `${ele.label}不能为空` }] }
                  )}
                />
        case 'ADDRESS':
          return <CascaderSelect
                    expandTrigger={this.state.trigger}
                    dataSource={addressDataSource}
                    onChange={this.handleChange}
                  />
        case 'RADIO':
          return <RadioGroup dataSource={ele.options} value={1}/>
        case 'DATE':
          return <DatePicker onChange={(val, str) => console.log(val, str)} />
      }
    }
    return (
      <div className="loan-config-content">
          <IceContainer title="车贷申请" className='subtitle'>
            <Row  className='config-page' align="stretch">
              <Col span="2">
                <div className="subMenu-wrap">
                  <p className='title'>客户申请信息</p>
                  <ul className="menu-list">
                    {
                      loadDetail.length>0 && loadDetail.map((e,index) => (
                        <li key={index}>{e.name}</li>
                      ))
                    }
                  </ul>
                </div>
              </Col>
              <Col span="22" className='main-form'>
                <Form
                  labelAlign="left"
                  style={styles.form}
                  field={this.field}>
                  {
                    loadDetail.length>0 && loadDetail.map((e,index) =>  (
                      <div className='part-same' key={index}>
                        <h4 className="action-name">{e.name}</h4>
                        <Row  align="top" wrap>
                          {
                            e.fields && e.fields.map((ele,index) => (
                              <Col span={ele.type == 'RADIO'?24:6} key={index}>
                                <FormItem labelCol={{span:ele.type == 'RADIO'?2:8}} label={labels(ele.label)}>
                                  {
                                    InputMod(ele)
                                  }
                                </FormItem>
                              </Col>
                              ))
                            }
                        </Row>
                      </div>
                    ))
                  }
                  <div className='part-same'>
                    <h4 className="action-name">材料提交</h4>
                    <DragUpload
                      className='upload'
                      action="/loanApi/file/upload"
                      data={{'path':'path/to/file'}}
                      formatter={(res) => {return { code: res.length>0? '0' : '1', imgURL: res[0].downloadUrl} }}
                      accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                      onChange ={this.onChange}
                    />
                  </div>

                  <Table dataSource={upLoadList} className="upload-list">
                    <Table.Column title="序号" dataIndex="id" />
                    <Table.Column title="资料名称" dataIndex="name" />
                    <Table.Column title="上传大小" dataIndex="fileType" />
                    <Table.Column title="上传大小" dataIndex='fileType' />
                  </Table>
                  <Row style={{ marginTop: 24 }} >
                    <Col offset="10" className ='botton-col'>
                      <Button
                        type="primary" onClick={this.handleSubmit.bind(this)}>
                        下一步
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>

          </IceContainer>
      </div>
    );
  }
}

const styles = {
  form: {
    marginTop: 30,
    paddingBottom:20
  },
  cats: {
    width: '100%',
  },
  select:{
    width:'200px'
  }
};
