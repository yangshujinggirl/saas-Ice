import { BaseColumn } from 'base';
import { Upload, Button } from '@icedesign/base';
import { BaseComponent } from 'base';
import Req from '../reqs/InterViewReq';
import Cookie from '../../../base/utils/Cookie';
import BaseConfig from '../../../config/BaseConfig';
import { Feedback } from '@icedesign/base/index';
const Toast = Feedback.toast;
/**
 * 定义列表的表头
 */
class InterViewColumn extends BaseColumn {

  constructor() {
    super();
    this.state = {
      idList: [
        { key: '1', value: '身份证' },
        { key: '2', value: '港澳通行证' },
        { key: '3', value: '军官证' },
        { key: '4', value: '护照' },
        { key: '5', value: '台湾通行证' },
        { key: '6', value: '其他' },
      ],
    };
    // 配置信息
    this._config = BaseConfig;
    //
    this.UPLOAD_CONFIG = {
      action: this._config.CONTRACT_HOST + '/contract/signed-paper-file/picture',
      headers: {
        'Authorization': `PCTOKEN ${Cookie.get('PCTOKEN')}`,
      },
      data: {
        'path': 'path/to/file',
      },
      formatter: (res) => {
        let isArray = Object.prototype.toString.call(res) === '[object Array]';
        if (isArray) {
          return {
            code: res.length > 0 ? '0' : '1',
            imgURL: res[0].downloadUrl,
          };
        } else {
          if (!res.data) {
            return;
          }
          return {
            code: res.code == 200 ? '0' : '1',
            imgURL: res.data.fileUrl,
            fileName: res.data.filename,
            fileURL: res.data.fileUrl,
            type: res.data.fileType,
          };
        }
      },
    };


    this._columns = [{
      title: 'ID',
      dataIndex: 'id',
      cell: (value, index, record) => {
        return (
          <div>
            {
              record.type ?
                (<div className="pch-table-operation">
                    <a href="javascript:;"
                       onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER1)}>
                      {record.id}
                    </a>
                  </div>
                )
                : (<span></span>)
            }
          </div>
        );
      },
      width: 80,
    }, {
      title: '姓名',
      dataIndex: 'userName',
      width: 100,
    }, {
      title: '证件类型',
      dataIndex: 'icType',
      width: 100,
      cell: (value, index, record) => {
        var statusText = '';
        this.state.idList.map((item, index) => {
          if (item.key == record.icType) {
            statusText = item.value;
          }
        });
        return statusText;
      },
    }, {
      title: '证件号码',
      dataIndex: 'icNo',
      width: 170,
    }, {
      title: '录制日期',
      dataIndex: 'videoUploadDate',
      width: 160,
      cell: (value, index, record) => {
        if(value){
          return this.formatDate(value, 'yyyy-MM-dd hh:mm:ss');
        }
        return;
      }
    }, {
      title: '进件编码',
      dataIndex: 'loanCode',
      width: 220,
    }, {
      title: '操作',
      dataIndex: 'visible',
      lock: 'right',
      width: 210,
      cell: (value, index, record) => {
        return (
          <div className="pch-table-operation">
            {
              record.videoDownloadUrl && record.videoDownloadUrl != null ? (

                <a href="javascript:;"
                   onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.OTHER2)}>
                  下载视频
                </a>
              ) : (<span></span>)
            }
            {  0 && record.type && record.type == 'loan'? (
                    <span>
                      <a href="javascript:;"
                         onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.DOWN)}>
                        查看报告
                      </a>
                      <Upload
                        {...this.UPLOAD_CONFIG}
                        listType='text'
                        showUploadList={false}
                        onChange={this.handleFileChange.bind(this, record)}
                      >
                        < a href='javascript:;'
                            onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.UP)}>
                          上传报告
                        </a>
                      </Upload>
                      <a href="javascript:;"
                         onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.SIGN)}>
                        查看签名报告
                      </a>
                    </span>
                  ) :
                  (<span></span>)
            }
          </div>
        );
      },
    }];
  }

  handleFileChange(record, info) {
    console.log(info);
    console.log(record);
    if (info.file && info.file.status == 'done') {
      console.log(22222);
      console.log(record);
      Req.getUpReport({
        id: record.id,
        url: info.file.response.fileURL,
        fileName: info.file.response.fileName,
        contentType: info.file.response.type,
      })
        .then(res => {
          Toast.show({
            type: 'success',
            content: '提交成功～',
          });
        });
    }
  }
}

export default new InterViewColumn().getColumns();
