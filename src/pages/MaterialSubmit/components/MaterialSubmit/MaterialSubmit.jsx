import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Input,
  Grid,
  Form,
  Button,
  Select,
  Field,
  NumberPicker,
  Balloon,
  Radio,
  Checkbox,
  DatePicker,
  Table,
  Upload,
} from '@icedesign/base';
import { DragDropContext, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DragFile from './DragFile';
import DropCell from './DropCell';
import Req from '../../reqs/MaterialSubmitReq';
import { hashHistory } from 'react-router';

const { DragUpload, ImageUpload } = Upload;
require('./index.scss');
import { Feedback } from '@icedesign/base';
import { BaseComponent } from 'base';
import { Title } from 'components';

const Toast = Feedback.toast;
const cardTarget = {
  drop() {
  },
};

class MaterialSubmit extends BaseComponent {
  static displayName = 'MaterialSubmit';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
      queryCache: {},
      value: {},
      dataSource: [],
      tableList: [
        {
          id: 'id',
          title: '序号',
        },
        {
          id: 'fileName',
          title: '材料名称',
        },
        {
          id: 'fileSize',
          title: '限制大小',
        }],
      fileList: [
      ],
      upLoadList: [],
    };

    this.currentId = 1;
  }

  componentDidMount() {
    this.getLoanUpload(this.props.params.id);
    console.log(this.props);
  }

  //获取上传资料列表
  getLoanUpload(id) {
    Req.getLoanUploadApi(id)
      .then((res) => {
        if (!res || res.code != 200) {
          return;
        }

        const { data } = res;
        const { list } = data;

        let dataSource = [];
        if (list && list.length > 0 && list[0].collectionDetails) {
          dataSource = list[0].collectionDetails;
        }

        list.map((el) => {
          var _josn = {};
          if (el.type == '主贷人') {
            _josn = {
              id: 'principalLender',
              title: el.name,
              draggable: true,
            };
            this.state.tableList.push(_josn);
            this.processDataSource(dataSource, 'principalLender');
          } else if (el.type == '共借人') {
            _josn = {
              id: 'coBorrower',
              title: el.name,
              draggable: true,
            };
            this.state.tableList.push(_josn);
            this.processDataSource(dataSource, 'coBorrower');
          }
          if (el.type == '担保人') {
            _josn = {
              id: 'guarantor',
              title: el.name,
              draggable: true,
            };
            this.state.tableList.push(_josn);
            this.processDataSource(dataSource, 'guarantor');
          }
        });
        this.setState({
          dataSource: dataSource,
          originData: list,
        });
      }, (error) => {
        console.log(error);
      });
  }

  processDataSource(dataSource, key) {
    dataSource.map((item, i) => {
      item[key] = item.downloadUrl;
    });
  }

  isImg(url){
    return /(\.gif|\.png|\.jpg|\.jpeg)+$/i.test(url);
  }

  handleFileChange(info) {
    console.log(info);
    info.fileList.map((item, i) => {
      if (item.status == 'done') {
        if(!item.id){
          item.id = this.currentId;
          this.currentId++;
        }
        if (this.isImg(item.imgURL)) {
          item.size = item.originFileObj.size;
          item.downloadURL = item.imgURL;
          item.fileURL = item.imgURL;
        } else {
          item.size = item.originFileObj.size;
          item.downloadURL = item.imgURL;
          item.fileURL = item.imgURL;
          item.imgURL = '/public/images/creditInformation/filed.png';
        }
      }
    });

    this.setState({
      fileList: info.fileList,
    });
  }

  handleFileError(err, res, file) {
  console.log("onError callback : ", err, res, file);
  }

  renderCell(key, value, index, record) {
    return (
      <DropCell
        key={record.id}
        index={index}
        data={record}
        type={key}
        moveCard={this.moveCard.bind(this)}
        onRemoveClick={this.handleRemoveClick.bind(this)}/>
    );
  }

  findFileById(id) {
    const { fileList } = this.state;
    const file = fileList.filter(c => c.id === id)[0];
    return {
      file,
      index: fileList.indexOf(file),
    };
  }

  moveCard(targetIndex, sourceId, lastTargetIndex, type) {
    // console.log('moveCard', arguments);
    let { dataSource, fileList } = this.state;
    let dragFile = this.findFileById(sourceId);
    let d = dataSource[targetIndex];

      if (typeof lastTargetIndex != 'undefined') {
        dataSource[lastTargetIndex][type] = undefined;
      }
      if (typeof d.sourceId != 'undefined') {
        // let lastdragFile = this.findFileById(d.sourceId);
        // lastdragFile.file.isUsed = false;
      }
      dragFile.file.isUsed = true;
      d[type] = dragFile.file.imgURL;
      d.sourceIndex = dragFile.index;
      d.sourceId = sourceId;

    this.setState({
      dataSource,
      fileList,
    });
  }

  handleRemoveClick(index, type, data) {
    let { dataSource, fileList } = this.state;
    let dragFile = this.findFileById(data.sourceId);
    let d = dataSource[index];

    if (!data.sourceId) {
      // sourceId标明当前数据是从哪个源拖动过来的
      fileList.push({
        id: this.currentId,
        imgURL: data[type],
        status: 'done',
        type
      });
      this.currentId++;
    } else {
      dragFile.file.isUsed = false;
    }
    d[type] = undefined;
    this.setState({
      dataSource,
      fileList,
    });
  }

  //cancel 提交
  cancel = (e) => {
    e.preventDefault();
    hashHistory.push('/entryQuery');
  };
  //提交
  submit = () => {
    this.state.queryCache.id = this.props.params.id;
    this.state.queryCache.status = 'SUBMIT';

    let { originData, tableList, dataSource } = this.state;
    let data = [];
    originData.map((item) => {
      let key = '';
      if (item.type == '主贷人') {
        key = 'principalLender';
      } else if (item.type == '共借人') {
        key = 'coBorrower';
      } else {
        key = 'guarantor';
      }
      item.collectionDetails.map((citem, j) => {
        citem.downloadUrl = dataSource[j][key];
      });
    });

    console.log(originData);
    for (var i = 0; i < originData.length; i++) {
      for (var j = 0; j < originData[i].collectionDetails.length; j++) {
        var el = originData[i].collectionDetails[j];
        // console.log(el);
        if (!el.downloadUrl) {
          Toast.show({
            type: 'help',
            content: `${originData[i].type}${originData[i].name}的${el.fileName}材料必须上传~`,
          });
          return;
        }
      }
    }

    Req.saveMaterial(this.props.params.id, originData)
      .then((res) => {
        if (res && res.code == 200) {

          Req.saveFrom(this.state.queryCache)
            .then((res) => {
              console.log(res);
              if (res && res.code == 200) {
                Toast.success('提交成功');
                hashHistory.push('/entryQuery');
              }
            })
            .catch((errors) => {
              console.log(errors);
            });
        }
      });
  };
  //保存
  save = () => {
    let { originData, tableList, dataSource } = this.state;
    let data = [];
    originData.map((item) => {
      let key = '';
      if (item.type == '主贷人') {
        key = 'principalLender';
      } else if (item.type == '共借人') {
        key = 'coBorrower';
      } else {
        key = 'guarantor';
      }
      item.collectionDetails.map((citem, j) => {
        citem.downloadUrl = dataSource[j][key];
      });
    });
    // Req.saveMaterial(this.props.params.id, originData)
    //   .then((res) => {
    //     if (res && res.code == 200) {
    //       Toast.success('保存成功，请提交～')
    //     }
    //   });
  };

  render() {
    const { connectDropTarget } = this.props;
    let { fileList, tableList, dataSource } = this.state;
    return (
      <IceContainer className="pch-container">
        <Title title="材料提交"/>
        <div className="pch-form material-files-form">
          <div className="material-files-upload">
            <Upload
              {...this.UPLOAD_CONFIG}
              className='material-files-upload-upload'
              fileList={fileList}
              showUploadList={false}
              onChange={this.handleFileChange.bind(this)}
              onError={this.handleFileError.bind(this)}>
              <div className="material-files-upload-button">
                <div className="icon material-files-upload-button-icon">
                  
                </div>
                <p className="material-files-upload-button-text">
                  将文件拖到此处，或<em>点击上传</em>
                </p>
              </div>
            </Upload>
          </div>
          <div className="material-files">
            {fileList.map((item, idx) => {
              return (
                <DragFile
                  key={idx}
                  id={item.id}
                  index={idx}
                  data={item}
                  moveCard={this.moveCard.bind(this)}/>
              );
            })}
          </div>
          <Table dataSource={dataSource}>
            {tableList.map((item, index) => {
              let myCell;
              if (item.draggable) {
                myCell = this.renderCell.bind(this, item.id);
              }
              return (
                <Table.Column title={item.title} cell={myCell} dataIndex={item.id} key={index}/>
              );
            })}
          </Table>
          <div className="pch-form-buttons">
            <Button size="large" type="secondary" onClick={this.submit}>
              提交
            </Button>
            <Button size="large" type="primary" onClick={this.save}>
              保存
            </Button>
            <Button size="large" type="normal" onClick={this.cancel}>
              取消
            </Button>
          </div>
        </div>
      </IceContainer>
    );
  }
}

export default DragDropContext(HTML5Backend)(MaterialSubmit);
