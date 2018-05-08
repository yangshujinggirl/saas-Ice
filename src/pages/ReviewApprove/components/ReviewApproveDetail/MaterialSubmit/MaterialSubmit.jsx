import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import {  Table } from '@icedesign/base';
// import Req from '../../../../MaterialSubmit/reqs/MaterialSubmitReq';
import Req from '../../../reqs/ReviewApproveReq';
export default class MaterialSubmit extends Component {
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
        {id:'fileSize',title:'限制大小'}],
    };
  }
  componentDidMount(){
    this.getLoanUpload(this.props.params.id);
    console.log(this.props)
  }
  //获取上传资料列表
  getLoanUpload(id) {
    Req.getLoadMaterialDetails({
      loanId: this.props.params.loanId
    })
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
      item[key] =  this.Img(item.downloadUrl);
    });
  }
  Img = (url)=>{
    if(url){
      return (<img  width={"10%"} src={url}/>)
    }
  }
  render() {
    let { fileList, tableList, dataSource } = this.state;
    return (
      <div className='info'  id='材料提交' style={styles.center}>
        <Table dataSource={dataSource} className="basic-table" style={styles.width}>
          {tableList.map((item,index) =>{
            return (
              <Table.Column title={item.title}  dataIndex={item.id} key={index}/>
            )
          })}
        </Table>
      </div>
    );
  }
}
const styles = {
  width:{
    width:'99%'
  },
  center:{
    display:'flex',
    justifyContent:'center'
  }
};
