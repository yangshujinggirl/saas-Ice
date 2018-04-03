import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select ,Field,NumberPicker, Balloon, Radio, Checkbox, DatePicker,Table, Upload } from '@icedesign/base';
import Req from '../../../../LoanApplication/reqs/LoanApplicationReq';

const { DragUpload } = Upload;
const dataSource = [{id: 1, fileName: '2016',limitSize:'2131'}];
let   tableList = [
                    {id: 'id',title:'序号'},
                    {id:'name',title: '材料名称'},
                    {id:'fileSize',title:'限制大小'}];

export default class MaterialSubmit extends Component {
  static displayName = 'MaterialSubmit';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      Component :[],
      upLoadList:[]
    };
  }
  componentDidMount(){
    if(this.props.data){
      tableList = [...tableList,...this.props.data]
    }
    this.getLoanUpload(this.props.params.id);
    console.log(this.props)
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
  //tableRender
  tableRender = ()=>{
    let arr = [];
    tableList.map((item,index)=>{
      arr.push(
        <Table.Column title={item.title} dataIndex={item.id} key={index}/>
      )
    })
    return arr;
  }
  render() {
    const { upLoadList } = this.state;
    console.log(upLoadList)
    console.log(tableList)
    return (
          <div>
            <DragUpload
              className='upload-picture'
              action="/loanApi/file/upload"
              data={{'path':'path/to/file'}}
              formatter={(res) => {return { code: res.length>0? '0' : '1', imgURL: res[0].downloadUrl} }}
              accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
            />
            <Table dataSource={upLoadList} className="basic-table">
              {
                this.tableRender()
              }
            </Table>
          </div>
    );
  }
}
