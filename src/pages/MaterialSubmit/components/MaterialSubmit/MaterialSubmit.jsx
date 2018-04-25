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
import { Feedback } from "@icedesign/base";

const Toast = Feedback.toast;
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
      queryCache:{},
      value: {},
      Component :[],
      dataSource: [],
      tableList: [
        {id: 'id',title:'序号'},
        {id:'fileName',title: '材料名称'},
        {id:'fileSize',title:'限制大小'}],
      fileList: [
      // {
      //   id: 1,
      //   fileName: "IMG.png",
      //   status: "done",
      //   size: 1024,
      //   downloadURL:
      //     "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
      //   fileURL:
      //     "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg",
      //   imgURL:
      //     "https://img.alicdn.com/tps/TB19O79MVXXXXcZXVXXXXXXXXXX-1024-1024.jpg"
      // }
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
        if(!res || res.code != 200){
          return;
        }

        const { data } = res;
        const { list } = data;

        let dataSource = [];
        if(list && list.length > 0 && list[0].collectionDetails){
          dataSource = list[0].collectionDetails;
        }

        list.map((el) => {
          var _josn = {}
          if(el.type == '主贷人'){
             _josn = {id:'principalLender',title:el.name ,draggable:true}
            this.state.tableList.push(_josn)
            this.processDataSource(dataSource, 'principalLender');
          }
          else if(el.type == '共借人'){
            _josn = {id:'coBorrower',title:el.name ,draggable:true}
            this.state.tableList.push(_josn)
            this.processDataSource(dataSource, 'coBorrower');
          }
          if(el.type == '担保人'){
            _josn = {id:'guarantor',title:el.name ,draggable:true}
            this.state.tableList.push(_josn)
            this.processDataSource(dataSource, 'guarantor');
          }
        })
        this.setState({
          dataSource:dataSource,
          originData: list
        })
      },(error) => {
        console.log(error)
      })
  }
  processDataSource(dataSource, key){
    dataSource.map((item, i) => {
      item[key] = item.downloadUrl;
    });
  }
  handleFileChange(info){
    console.log(info)
    this.setState({fileList: info.fileList})
  }
  renderCell(key, value, index, record){
    return(
      <DropCell
        key={record.id}
        index={index}
        data={record}
        type={key}
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
  moveCard(targetIndex, sourceId, isCancel, lastTargetIndex, type) {
    // console.log('moveCard', arguments);
    let { dataSource, fileList} = this.state
    let dragCard = this.findFile(sourceId);
    let d = dataSource[targetIndex];

    if(isCancel){
      d[type] = undefined;
      dragCard.file.isUsed = false;
    }else{
      if(typeof lastTargetIndex != 'undefined'){
        dataSource[lastTargetIndex][type] = undefined;
      }
      if(typeof d.sourceId != 'undefined'){
        let lastDragCard = this.findFile(d.sourceId);
        lastDragCard.file.isUsed = false;
      }
      dragCard.file.isUsed = true;
      d[type] = dragCard.file.imgURL;
      d.sourceIndex = dragCard.index;
      d.sourceId = sourceId;
    }
    this.setState({dataSource,fileList})
  }
  handleRemoveClick(index, sourceId, type, imgURL){
    let { dataSource, fileList} = this.state;
    let dragCard = this.findFile(sourceId);
    let d = dataSource[index];

    if(!sourceId){
      fileList.push({
        id: fileList.length + 1,
        imgURL: imgURL,
        status: 'done'
      })
    }else{
      dragCard.file.isUsed = false;
    }
    d[type] = undefined;
    this.setState({dataSource,fileList})
  }
  //cancel 提交
  cancel = (e) => {
    e.preventDefault();
    hashHistory.push('/entryQuery');
  }
  //提交
  submit = () => {
    this.state.queryCache.id = this.props.params.id;
    this.state.queryCache.status = 1;

    let { originData, tableList, dataSource } = this.state;
    let data = [];
    originData.map((item) =>{
      let key = '';
      if(item.type == '主贷人'){
        key = 'principalLender';
      }else if(item.type == '共借人'){
        key = 'coBorrower';
      }else{
        key = 'guarantor';
      }
      item.collectionDetails.map((citem, j) => {
        citem.downloadUrl = dataSource[j][key]
      })
    })

    console.log(originData);
    Req.saveMaterial(this.props.params.id, originData).then((res) => {
      if(res && res.code == 200){

        Req.saveFrom(this.state.queryCache).then((res) =>{
          console.log(res)
          if(res && res.code == 200){
            Toast.success('提交成功');
            hashHistory.push('/entryQuery');
          }
        }).catch((errors) =>{
          console.log(errors);
        });
      }
    })
  }
  //保存
  save =  () =>{
    Toast.success('保存成功，请提交～');
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
                myCell = this.renderCell.bind(this, item.id);
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
