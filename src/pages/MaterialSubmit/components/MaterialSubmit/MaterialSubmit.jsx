import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Input, Grid, Form, Button, Select ,Field,NumberPicker, Balloon, Radio, Checkbox, DatePicker,Table, Upload } from '@icedesign/base';
import { DragDropContext, DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import DragFile from './DragFile';
import DropCell from './DropCell';
import  Req from '../../reqs/MaterialSubmitReq'
import { hashHistory } from 'react-router';
const { DragUpload, ImageUpload } = Upload;
require('./index.scss')

const cardTarget = {
  drop() {},
}

class MaterialSubmit extends Component {
  static displayName = 'MaterialSubmit';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      value: {},
      Component :[],
      dataSource: [],
      tableList: [
                    {id: 'id',title:'序号'},
                    {id:'fileName',title: '材料名称'},
                    {id:'fileSize',title:'限制大小'},
                    {id:'f',title:'文件' ,draggable:true}],
      fileList: [{
        id: 1,
        fileName: "IMG.png",
        status: "done",
        size: 1024,
        downloadURL:
          "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
        fileURL:
          "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
        imgURL:
          "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
      },{
        id: 2,
        fileName: "tessd.png",
        status: "done",
        size: 12,
        downloadURL:
          "http://lx-file.cn-bj.ufileos.com/ft1/path/to/file/93bcbae1ef95de70113cf5dc44b8c8b8.jpg",
        fileURL:
          "http://lx-file.cn-bj.ufileos.com/ft1/path/to/file/93bcbae1ef95de70113cf5dc44b8c8b8.jpg",
        imgURL:
          "http://lx-file.cn-bj.ufileos.com/ft1/path/to/file/93bcbae1ef95de70113cf5dc44b8c8b8.jpg"
      },{
        id: 3,
        fileName: "f703738da9773912b571474cf3198618367ae24c.jpg",
        status: "done",
        size: 12,
        downloadURL:
          "http://lx-file.cn-bj.ufileos.com/ft1/path/to/file/c5e98176055a3510a3714b6d8c7423c3.jpg",
        fileURL:
          "http://lx-file.cn-bj.ufileos.com/ft1/path/to/file/c5e98176055a3510a3714b6d8c7423c3.jpg",
        imgURL:
          "http://lx-file.cn-bj.ufileos.com/ft1/path/to/file/c5e98176055a3510a3714b6d8c7423c3.jpg"
      }
    ],
      upLoadList:[]
    };
  }
  componentDidMount(){
    this.getLoanUpload(this.props.params.id);
    console.log(this.props)
  }
  //获取上传资料列表
  getLoanUpload(id) {
    Req.getLoanUploadApi(id)
      .then((res) => {
        const { data } = res;
        const { list } = data;
        var dataSource;
        list.map((el)=> {
          dataSource = el.collectionDetails
          var _josn = {}
          if(el.type == '主贷人'){
             _josn = {id:'principalLender',title:el.name ,draggable:true}
            this.state.tableList.push(_josn)
          }
          else if(el.type == '共借人'){
            _josn = {id:'coBorrower',title:el.name ,draggable:true}
            this.state.tableList.push(_josn)
          }
          if(el.type == '担保人'){
            _josn = {id:'guarantor',title:el.name ,draggable:true}
            this.state.tableList.push(_josn)
          }
        })
        this.setState({
          dataSource:dataSource
        })
      },(error) => {
        console.log(error)
      })
  }
  handleFileChange(info){
    console.log(info)
    this.setState({fileList: info.fileList})

  }
  renderCell(value, index, record){
    return(
      <DropCell
        key={record.id}
        index={index}
        data={record}
        moveCard={this.moveCard.bind(this)}
        onRemoveClick={this.handleRemoveClick.bind(this)}
      />
    )
  }
  findFile(id){
    const { fileList } = this.state
    const file = fileList.filter(c => c.id === id)[0]

    return {
      file,
      index: fileList.indexOf(file),
    }
  }
  moveCard(targetIndex, sourceId, isCancel, lastTargetIndex) {
    // console.log('moveCard', arguments);
    let { dataSource, fileList} = this.state
    let dragCard = this.findFile(sourceId);
    let d = dataSource[targetIndex];

    if(isCancel){
      d.value = undefined;
      dragCard.file.isUsed = false;
    }else{
      if(typeof lastTargetIndex != 'undefined'){
        dataSource[lastTargetIndex].value = undefined;
      }
       if(typeof d.sourceId != 'undefined'){
        let lastDragCard = this.findFile(d.sourceId);
        // lastDragCard.file.isUsed = false;
      }
      dragCard.file.isUsed = true;
      d.value = dragCard.file.imgURL;
      d.sourceIndex = dragCard.index;
      d.sourceId = sourceId;
    }
    this.setState({dataSource,fileList})
  }
  handleRemoveClick(index, sourceId){
    let { dataSource, fileList} = this.state;
    let dragCard = this.findFile(sourceId);
    let d = dataSource[index];
    dragCard.file.isUsed = false;
    d.value = undefined;
    this.setState({dataSource,fileList})
  }
  //cancel 提交
  cancel = (e)=>{
    e.preventDefault();
    hashHistory.push('/entryQuery');
  }
  //提交
  submit = ()=>{

  }
  //保存
  save =  () =>{

  }
  render() {
    const { connectDropTarget  } = this.props
    let { fileList, tableList, dataSource } = this.state;
    return connectDropTarget(
          <div>
            <IceContainer title="材料提交" className='subtitle'>
              <ImageUpload
                className='upload-picture'
                listType="picture-card"
                action="/loanApi/file/upload"
                data={{'path':'path/to/file'}}
                formatter={(res) => {return { code: res.length>0? '0' : '1', imgURL: res[0].downloadUrl} }}
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
                fileList={this.state.fileList}
                showUploadList={false}
                onChange={this.handleFileChange.bind(this)}
              />
              <div
                className="material-files"
                >
                {fileList.map((item, idx) => {
                  return(
                    <DragFile
                      key={idx}
                      id={item.id}
                      index={idx}
                      data={item}
                      moveCard={this.moveCard.bind(this)}
                    />
                  )
                })}
              </div>
              <Table dataSource={dataSource} className="basic-table">
                {tableList.map((item,index) =>{
                  let myCell;
                  if(item.draggable){
                    myCell = this.renderCell.bind(this);
                  }
                  return (
                    <Table.Column title={item.title} cell={myCell} dataIndex={item.id} key={index}/>
                  )
                })}
              </Table>
              <div className='button-box'>
                <Button onClick={this.submit}>提交</Button>
                <Button onClick={this.save}>保存</Button>
                <Button onClick={this.cancel}>取消</Button>
              </div>
            </IceContainer>
          </div>
    );
  }
}

MaterialSubmit = DropTarget('CARD', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(MaterialSubmit)
export default DragDropContext(HTML5Backend)(MaterialSubmit);
