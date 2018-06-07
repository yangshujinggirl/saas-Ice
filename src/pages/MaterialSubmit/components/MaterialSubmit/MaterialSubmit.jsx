import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {
  Grid,
  Form,
  Button,
  Upload,
} from '@icedesign/base';
import {
  DragDropContext,
  DragDropContextProvider,
  DragSourceMonitor,
  DropTargetMonitor,
} from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import DragContext from './DragContext';
import PchDragUpload from './DragUpload';
import Req from '../../reqs/MaterialSubmitReq';
import { hashHistory } from 'react-router';
import { BaseComponent } from 'base';
import { Title } from 'components';

require('./index.scss');
const { Core, DragUpload, ImageUpload } = Upload;

class MaterialSubmit extends BaseComponent {
  static displayName = 'MaterialSubmit';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
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
      fileList: [],
      disabled: false,
    };

    this.currentId = 1;
  }

  componentDidMount() {
    this.getLoanUpload(this.props.params.id);
  }

  //获取上传资料列表
  getLoanUpload(id) {
    Req.getLoanUploadApi(id)
      .then((res) => {
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

  handleFileChange(info) {
    // console.log(info);
    info.fileList.map((item, i) => {
      if (item.status == 'done') {
        if (!item.id) {
          item.id = this.currentId;
          this.currentId++;
        }
        item.size = item.originFileObj.size;
        item.downloadURL = item.imgURL;
        item.fileURL = item.imgURL;
      }
    });

    this.setState({
      fileList: info.fileList,
    });
  }

  handleSuccessChange(data, file) {
    data = data.data[0];
    let fileList = this.state.fileList;
    fileList.push({
      id: this.currentId,
      size: data.size,
      fileName: data.name,
      imgURL: data.downloadUrl,
      downloadURL: data.downloadUrl,
      fileURL: data.downloadUrl,
      status: 'done',
    });

    this.setState({
      fileList: fileList,
    });
  }

  //cancel 提交
  cancel = (e) => {
    e.preventDefault();
    hashHistory.push('/entryQuery');
  };

  //提交
  submit = () => {

    let id = this.props.params.id;
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
          Req.tipError(`${originData[i].type}${originData[i].name}的${el.fileName}材料必须上传~`);
          return;
        }
      }
    }
    this.setState({
      disabled: true,
    });
    Req.saveMaterial(id, originData)
      .then((res) => {
        let d = {
          id: id,
          status: 'SUBMIT',
        };

        Req.saveFrom(d)
          .then((res) => {
            this.setState({
              disabled: false,
            });
            Req.tipSuccess('提交成功');
            hashHistory.push('/entryQuery');
          })
          .catch((errors) => {
            console.log(errors);
            this.setState({
              disabled: false,
            });
            Req.tipError(errors.msg);
          });
      })
      .catch(error => {
        Req.tipError(errors.msg);
      });
  };

  //保存
  save = () => {
    let { originData, tableList, dataSource } = this.state;

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
    this.setState({
      disabled: true,
    });
    Req.saveMaterial(this.props.params.id, originData)
      .then((res) => {
        this.setState({
          disabled: false,
        });
        Req.tipSuccess('保存成功，请提交～');
      })
      .catch(error => {
        this.setState({
          disabled: false,
        });
        Req.tipError(errors.msg);
      });
  };

  handleChangeData(data) {
    this.setState(data);
  }

  handleTestDrop() {
    console.log(arguments);
  }

  render() {
    const { connectDropTarget } = this.props;
    let { fileList, tableList, dataSource } = this.state;
    return (
      <DragDropContextProvider backend={HTML5Backend}>
        <IceContainer className="pch-container">
          <Title title="材料提交"/>
          <div className="pch-form material-files-form">
            {/*<div className="material-files-upload">
            <PchDragUpload />
            </div>*/}
            {/*<div className="material-files-upload">
              <DragUpload
                {...this.UPLOAD_CONFIG}
                showUploadList={false}
                accept="image/png, image/jpg, image/jpeg, image/gif, image/bmp"
              />
            </div>
            <br/>*/}
            <div className="material-files-upload" onDrop={this.handleTestDrop}>
              <Upload
                {...this.UPLOAD_CONFIG}
                className="material-files-upload-upload"
                fileList={fileList}
                showUploadList={false}
                draggable={true}
                onChange={this.handleFileChange.bind(this)}>
                <div className="material-files-upload-button">
                  <div className="icon material-files-upload-button-icon">&#xe628;</div>
                  <p className="material-files-upload-button-text">
                    {/*将文件拖到此处，或 */}
                    <em>点击上传</em>
                  </p>
                </div>
              </Upload>
            </div>
            <DragContext
              fileList={fileList}
              tableList={tableList}
              dataSource={dataSource}
              onChangeData={this.handleChangeData.bind(this)}
            />

            <div className="pch-form-buttons">
              <Button size="large" type="secondary" disabled={this.state.disabled} onClick={this.submit}>
                提交
              </Button>
              <Button size="large" type="primary" disabled={this.state.disabled} onClick={this.save}>
                保存
              </Button>
              <Button size="large" type="normal" onClick={this.cancel}>
                取消
              </Button>
            </div>
          </div>
        </IceContainer>
      </DragDropContextProvider>
    );
  }
}

export default (MaterialSubmit);
