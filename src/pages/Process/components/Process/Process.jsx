import React, { Component } from 'react';
import DataBinder from '@icedesign/data-binder';
import IceContainer from '@icedesign/container';
import './Process.scss';
import {hashHistory} from 'react-router';

import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Table,
  Pagination,
} from '@icedesign/base';

const { Row, Col } = Grid;

import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

//获取下拉
import {company_type} from '../../config'

export default class Process extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		value:{
      			type	:'10',
        		lenderType:'10',
        		name	:'',
		    }
		}        
    }
    /**
     * 初始化
     */
    componentDidMount() {
    	this.fetchData();
  	}
  	fetchData = () => {
    	let {actions} = this.props;
    	this.props.actions.search();
  	}
    /**
     * Methods
     */
    //查询
  	submit = () =>{
  		let {actions,pageData} = this.props;
  		this.formRef.validateAll((error, value) => {
		if (error) {
		  // 处理表单报错
		  return;
		}
		// 提交当前填写的数据
		this.props.actions.search(value);//返回符合条件的数据
    });
  	}
  	//新增
  	add = () =>{
  		// let data = JSON.stringify(this.state.value),
  		//     path = `process/add/${data}`
  		let path = {
  			pathname:'process/add',
  			state:this.state.value
  		}
  		hashHistory.push(path)
  	}
  	//点击分页
  	  //分页
    changePage = (currentPage) => {
      this.props.actions.search({page:currentPage});
    };
    //查看
	searchItem = (record) => {
		hashHistory.push(`process/detail/${record.id}`)
	};
	//编辑
	editItem = (record) => {
		hashHistory.push(`process/edit/${record.id}`)
	}
    //选择时搜索
    onFormChange = () => {}
    //操作按钮
  	renderOperator = (value, index, record) => {
    return (
      <div>
        <button
          className="editbtn"
          onClick = {() => this.editItem(record)}>
          编辑</button>
        <button
          className="searchbtn"
          onClick={ () =>this.searchItem(record)}>
          查看
        </button>
      </div>
     );
  	};
  	/**
  	 * 渲染
  	 */
    render() {
    	const { list=[], total, limit, page} =this.props.pageData;
    	return (
    		<div className="create-activity-form" style={styles.container}>
    			 <IceContainer title="" >
    			 	<IceFormBinderWrapper ref={(formRef) => {this.formRef = formRef;}} value={this.state.value} onChange={this.onFormChange}>
    			 		<div>
			               <legend style={styles.legend}  className="legend" >
			                 <span style={styles.legLine}></span>查询
			               </legend>
			               <div style={styles.fieldBox}>
			               		<Row style={styles.formItem}>
			               			<Col xxs="6" s="2" l="2" style={styles.formLabel}>
						                    业务类型：
						            </Col>
						            <Col s="4" l="4">
						                   <IceFormBinder
						                        name="type"
						                      >
						                       <Select
						                          placeholder="请选择"
						                          style={{ width: '175px' }}
						                          className="custom-select"
						                          dataSource={company_type}
						                        >
						                        </Select>
						                      </IceFormBinder>
						                    <IceFormError name="type" />                

						            </Col>

					                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
						                    资方：
						                  </Col>
						                  <Col s="4" l="4">
						                    <IceFormBinder
						                        name="lenderType"
						                      >
						                       <Select
						                          placeholder="请选择"
						                          style={{ width: '175px' }}
						                          className="custom-select"
						                          hasClear={true}
						                          dataSource={company_type}
						                        >
						                        </Select>
						                      </IceFormBinder>
						                    <IceFormError name="lenderType" />

						                  </Col>

						                  <Col xxs="6" s="2" l="2" style={styles.formLabel}>
	                       					流程名称：
	                				      </Col>
	                				      <Col s="4" l="4">
						                  	  <IceFormBinder name="name">
						                        <Input style={{ width: '175px' }} placeholder="流程名称"  className="custom-input"/>
						                      </IceFormBinder>
						                      <IceFormError name="name" />
						                  </Col>
						                  
			               		</Row>
			               		<Row style={styles.formItem}>
				               		<Col xxs="6" s="2" l="2" style={styles.formLabel}>
	                    				<button style={styles.btns} type='submit' onClick={this.submit}>查询</button>
	                 				 </Col>
	                 				 <Col xxs="6" s="2" l="2" style={styles.formLabel}>
	                    				<button style={styles.btns} type='add' onClick={this.add}>新增</button>
	                 				 </Col>
			               		</Row>
			               </div>
		                </div>
    			 	</IceFormBinderWrapper>
    			 	<Table
              dataSource={list}
              isZebra={true}
              onSort={this.Order}
            >
              <Table.Column title="业务类型" dataIndex="productCode" width={160} />
              <Table.Column title="流程名称" dataIndex="name" width={200} />
              <Table.Column title="资方" dataIndex="contractDisplayName" width={160} />
              <Table.Column title="产品类型" dataIndex="productType" width={160} />
              <Table.Column title="产品名称" cell={this.timeRange} width={250} />
              <Table.Column title="最后修改时间" cell={this.isRetainage} width={120} />
              <Table.Column
                title="操作"
                cell={this.renderOperator}
                lock="right"
                width={140}
              />
            </Table>
            {
              list.length>0 && <div style={styles.pagination}>
                                <Pagination
                                  shape="arrow-only"
                                  current={page}
                                  pageSize={limit}
                                  total={total}
                                  onChange={this.changePage}
                                />
                              </div>
            }
    			 </IceContainer>
    		</div>
    	)
    }
}

const styles = {
  container: {
    paddingBottom: 0,
  },
  legend: {
    marginLeft: 0,
    paddingLeft: '15px',
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: '#fff',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '25px',
  },
  legLine: {
    display: 'inline-block',
    zoom: 1,
    verticalAlign: 'top',
    marginRight: '12px',
    width: '4px',
    height: '25px',
    backgroundColor: '#ec9d00',
  },
  fieldBox: {
    margin: '0 15px',
    padding: '25px 0 0 0',
    borderTop: '1px solid #d8d8d8',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    marginLeft: '85px',
    textAlign: 'right',
  },
  btns: {
    width: '90px',
    height: '32px',
    lineHeight: '32px',
    border: 'none',
    fontSize: '16px',
    borderRadius: 'none !important',
    color: '#fff',
    backgroundColor:'#ec9d00'
  },
  searchTable: {
    width: '1400px',
    margin: '25px',
  },
  pagination: {
    textAlign: 'left',
    paddingTop: '26px',
  },
};