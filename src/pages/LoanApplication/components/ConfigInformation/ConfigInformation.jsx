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



const formItemLayout = {
  labelCol: { span: 10 },
};

const InputModss = (ele) => {
  switch(ele.type) {
    case 'SELECT':
      return <Select
                style={styles.select}
                dataSource={this.state.dataSource}
                {...init(ele.name,
                  {
                    rules:[{ required: true, message: `${ele.label}不能为空` }],
                    props:{
                      onOpen:()=> {
                        this.getOptions(ele.id)
                      }
                    }
                  }
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
              {...init(ele.name,
                { rules:[{ required: true, message:`${ele.label}不能为空` }]}
              )}
            />
    case 'DECIMAL':
      return <Input
              trim
              style={styles.select}
              hasLimitHint={true}
              placeholder={ele.type}
              htmlType='number'
              {...init(ele.name,
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
              value={this.state.month}
              type="inline"
              step={2}
              min={1}
              max={12}
              {...init(ele.name,
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
      return <RadioGroup dataSource={ele.options} defaultValue={"apple"}/>
    case 'DATE':
      return <DatePicker onChange={(val, str) => console.log(val, str)} />
  }
}

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
  //请求options接口
  getOptions(id) {
    this.setState({
      dataSource: [
        {label:'UT00000001', value:'UT00000001'},
        {label:'option2', value:'option2'}
      ]
    })
  }

  onChange(file) {
    console.log("onChange callback : ", file);
    console.log("onChange callback : ", file.fileList);
  }

  handleSubmit = () => {
    this.postForm.validateAll((errors, values) => {
      console.log('errors', errors, 'values', values);
      if (errors) {
        return false;
      }

    });
  };

  labels =(name)=> (
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
                      {
                        rules:[{ required: true, message: `${ele.label}不能为空` }],
                        props:{
                          onOpen:()=> {
                            this.getOptions(ele.id)
                          }
                        }
                      }
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
          return <RadioGroup dataSource={ele.options} defaultValue={"apple"}/>
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
                              <Col span={6} key={index}>
                                <FormItem {...formItemLayout} label={this.labels(ele.label)}>
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
                    <Table.Column title="资料名称" dataIndex="fileName" />
                    <Table.Column title="上传大小" dataIndex="fileType" />
                    <Table.Column title="上传大小" dataIndex='fileType' />
                  </Table>
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
