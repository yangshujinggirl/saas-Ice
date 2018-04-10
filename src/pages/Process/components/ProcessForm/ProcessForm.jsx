import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './ProcessForm.scss';
import {hashHistory} from 'react-router';


import {
  Icon,
  Input,
  Button,
  Checkbox,
  Select,
  Switch,
  Radio,
  Grid,
  Field
} from '@icedesign/base';

const { Row, Col } = Grid;

import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

Array.prototype.remove = function(val) {
	var index = this.indexOf(val);
	if (index > -1) {
		this.splice(index, 1);
	}
};


export default class ProcessForm extends Component {
	constructor(props) {
    	super(props);
    	 this.state = {
    	 	customMenuList:[],
        moduleList2:[{
          "id": 1,
          "taskTypeName": "进件",
          "activitiTaskType": "USERTASK",
          "canPrivilegeEditable": 1,
          "limitedAddTimes": 1,
          "execMode": 1,
          "orderId": 0,
          "createdAt": "2018-04-04 14:21:46",
          "createdBy": 10000
        }],
    	 	moduleList:[{
          "id": 1,
          "name": "进件",
          "number": 1,
          "count":0,
          "type": [{
            "name": "页面",
            "value": "10"
          }, {
            "name": "系统",
            "value": "20"
          }],
          "source": true,
          "private": true,
          "page": [{
              "name": "页面1",
              "value": "10",
            },
            {
              "name": "页面2",
              "value": "20",
            },
            {
              "name": "页面3",
              "value": "30",
            }
          ],
          "authority": "public",
          "config": ["通过"],
        }],
        selectList:[],
   			value:{}
    	 }
    }
    field = new Field(this, { scrollToFirstError: true });

    // 
    /**
     * 初始化
     */
    componentDidMount() {
    	var data = this.props.location.state;
    	this.fetchData()
      this.initSelectList()
  	}
  	fetchData = () => {
    	let {actions} = this.props;
    	this.props.actions.getCustomMenuList()
    	// this.props.actions.search();
  	}
  	/**
  	 * methods
  	 */
    //初始化右侧可选择select
    initSelectList = () => {
      let result = []
      this.state.moduleList.map((item,index) => {
          result.push({
            name:item.name,
            value:item.name
          })
      })
      this.setState({
        selectList:result
      })
    }

    getSelectList = (name) => {
        let data = this.state.selectList.filter((item) => {
          return item.name!=name
        })
        return data
    }

    //模块名称变动时
    moduleNameChange = (event,data) => {
      event.name = data
      this.setState({
        moduleList:this.state.moduleList
      })
      this.initSelectList()
    }

  	//模块添加删除
  	setModule = (data,type) => {
      //data数据为customMenuList
  		if(type === 'add' && data.number>0){
  			//添加模块
  			data.number --
        data.count ++
        let newsData = Object.assign({},data);
        if(data.count) newsData.name += data.count
  			this.state.moduleList.push(newsData)

  		}else{
  			data.number ++
        console.log(data)
  			this.state.moduleList.remove(data)
  		}
      this.initSelectList()
  		//状态更新？
  		this.setState({
  			customMenuList:this.state.customMenuList,
  			moduleList:this.state.moduleList,
  		})
  	}

  	//表单校验change
  	formChange = () => {

  	}
  	//校验
  	validateAllFormField = () => {
  		this.refs.form.validateAll((errors, values) => {
  			console.log('errors', errors, 'values', values);
  		});
  	};
  	//渲染select
  	renderSelect = (data,val) => {
      let obj = {}
      if(typeof val !== "undefined"){
        obj.defaultValue = data[val].value
      }
  		return (
  			<Select {...obj}>
  				{
  					data&&data.map((item,index) => {
    						return (
    							<Select.Option key={index}   value={`${item.value}`}>{item.name}</Select.Option>
    						)
  					})
  				}
			</Select>
  		)
  	}
    /**
  	 * 渲染
  	 */
    render() {
    	const init = this.field.init;
    	let { customMenuList } = this.props
      this.state.customMenuList =  customMenuList 
      
    	return (
    		<div className="create-activity-form">
	    		 <IceContainer title="" >
	    			 	<IceFormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
	    			 		<div>
				               <legend style={styles.legend}  className="legend" >
				                 <span style={styles.legLine}></span>流程新增/修改
				               </legend>
				               <div style={styles.fieldBox}>
				               		<Row style={styles.formItem}>
			               			<Col xxs="6" s="2" l="2" style={styles.formLabel}>
						                    业务类型：
						            </Col>
						            <Col s="4" l="4">
						            	{this.props.location.state.type}
						            </Col>
									<Col xxs="6" s="2" l="2" style={styles.formLabel}>
										资方：
									</Col>
									<Col s="4" l="4">
										{this.props.location.state.lenderType}
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
				               </div>
				            </div>
				        </IceFormBinderWrapper>
				        <div className="container">
                    	{/*渲染左边  */}
                    		<div className="container-left">
                     
                        		<div className="con">
	                        		<ul className='container-left-uls'>
	                        			{
	                        				this.state.customMenuList && this.state.customMenuList.map((item, index) => {
	                        					return (
	                        						<li key={index}>
	                        							<span className="texts">{item.number}-{item.name}</span>
	                        							{/*{ item.number > 0 &&  <Icon onClick = {() =>{item.number --}} type = "add" /> }*/}
	                        							<span className="icons">{ item.number > 0 &&  <Icon onClick = {() => this.setModule(item,'add') } type = "add" /> }</span>
	                        						</li>	
	                        					)
	                        				})
	                        			}
	                        		</ul>
                        		</div>
                    		</div>
                    		{/*右边*/}
                    		<div className="container-right">
                           <IceFormBinderWrapper value={this.state.value} onChange={this.formChange} ref="form">
                        			<div className="con">
                        				<Row  className="container-right-title">
                        					<Col xxs="6" s="2" l="2" >操作</Col>
                        					<Col xxs="6" s="2" l="4" >模块</Col>
                          				<Col xxs="6" s="2" l="6" ><span>条件</span>------<span>跳转</span></Col>
                          				<Col xxs="6" s="2" l="4" >页面</Col>
                          				<Col xxs="6" s="2" l="4" >权限</Col>
                          				<Col xxs="6" s="2" l="4" >必要数据</Col>
                          				<Col xxs="6" s="2" l="4" >方式</Col>
                            		</Row>
                        			{/*<ul className="container-right-title">
                        				<li>模块</li>
                        				<li>条件</li>
                        				<li>跳转</li>
                        				<li>页面</li>
                        				<li>权限</li>
                        				<li>必要数据</li>
                        				<li>方式</li>
                        			</ul>*/}
                              <h2>{this.state.moduleList[0].name}</h2>
                        			{
                        				 this.state.moduleList.map((item, index) => {
    		                    			return (
    		                    				<Row  align="top" key={index} className="container-right-tabRow" className={`container-right-tabRow ${1 ? 'even' : ''}`}>
      		                    					<Col xxs="6" s="2" l="2" >{ index!=0 && <Icon onClick = {() => this.setModule(item,'minus') } type = "minus" /> }</Col>
      										              <Col xxs="6" s="2" l="4" >
                                            <IceFormBinder required triggerType="onBlur" max={10} message="模块名称" >
                                               <Input name={"module"+index} placeholder="" onChange = {this.moduleNameChange.bind(this,item)}  value={item.name}   />
                                            </IceFormBinder>
      							          			    </Col>
          							          			<Col xxs="6" s="2" l="6" >
          							          				{item.config && item.config.map((list,ind) => {
          							          					return (
          							          						<div key={ind}>
          							          							{this.renderSelect([{name:list,value:list}],0)}
          							          							{this.renderSelect(this.getSelectList(item.name),undefined,"targetName"+index)}
          							          						</div>
          							          					)
          							          				})}												        
          							          			</Col>
          							          			<Col xxs="6" s="2" l="4" >
          							          				{item.page?this.renderSelect(item.page,undefined,"page"+index):'--'}
          							          				{item.page&&<a>新增页面</a>}
          							          			</Col>
          							          			<Col xxs="6" s="2" l="4" >
          							          				{item.private&&<a>编辑</a>}
          							          			</Col>
          							          			<Col xxs="6" s="2" l="4" >
          							          				{item.source&&<a>查看</a>}
          							          			</Col>
          							          			<Col xxs="6" s="2" l="4" >
          									            	{item.type?this.renderSelect(item.type):'--'}
          							          			</Col>
    					          				    </Row>
    		                    			)
    			          				    })
                        			}
                        			</div>
                         </IceFormBinderWrapper>
                    		</div>
                  		</div>  
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