import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select ,Field,NumberPicker, Balloon, Radio, Checkbox, DatePicker,Table, Upload } from '@icedesign/base';

const { DragUpload } = Upload;
const dataSource = [{id: 1, fileName: '2016',limitSize:'2131'}];
const tableList = [
                    {id: 'id',title:'序号'},
                    {id:'fileName',title: '材料名称'},
                    {id:'limitSize',title:'限制大小'}];

export default class MaterialSubmit extends Component {
  static displayName = 'MaterialSubmit';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      Component :[],
    };
  }
  componentDidMount(){
    if(this.props.data){
      tableList.push(this.props.data)
    }
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
    return (
          <div>
            <DragUpload
              className='upload-picture'
              action="/loanApi/file/upload"
              data={{'path':'path/to/file'}}
              formatter={(res) => {return { code: res.length>0? '0' : '1', imgURL: res[0].downloadUrl} }}
              accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
            />
            <Table dataSource={dataSource} className="basic-table">
              {
                this.tableRender()
              }
            </Table>
          </div>
    );
  }
}
